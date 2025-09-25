import { renderHook, act, waitFor } from "@testing-library/react";
import { useForm } from "./useForm";
import { vi, describe, it, expect, beforeEach } from "vitest";

describe("useForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const defaultValues = { name: "John", email: "john@example.com" };
    const { result } = renderHook(() => useForm(defaultValues));

    expect(result.current.getValues("name")).toBe("John");
    expect(result.current.getValues("email")).toBe("john@example.com");
  });

  it("should register field and handle value changes", () => {
    const { result } = renderHook(() => useForm());

    const register = result.current.register("name", { required: true });

    // Simulate input change
    act(() => {
      register.onChange({ target: { value: "Jane" } });
    });

    expect(result.current.getValues("name")).toBe("Jane");
  });

  it("should validate required fields", async () => {
    const { result } = renderHook(() => useForm());

    result.current.register("name", { required: "Name is required" });

    // Try to submit without value
    const handleSubmit = result.current.handleSubmit(() => {});
    act(() => {
      handleSubmit();
    });

    await waitFor(() => {
      expect(result.current.formState.errors.name).toBeDefined();
      expect(result.current.formState.errors.name?.message).toBe(
        "Name is required"
      );
    });
  });

  it("should validate minLength", async () => {
    const { result } = renderHook(() => useForm());

    result.current.register("password", {
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
    });

    act(() => {
      result.current.setValue("password", "123");
    });

    const handleSubmit = result.current.handleSubmit(() => {});
    act(() => {
      handleSubmit();
    });

    await waitFor(() => {
      expect(result.current.formState.errors.password?.message).toBe(
        "Password must be at least 8 characters"
      );
    });
  });

  it("should validate pattern", async () => {
    const { result } = renderHook(() => useForm());

    result.current.register("email", {
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format",
      },
    });

    act(() => {
      result.current.setValue("email", "invalid-email");
    });

    const handleSubmit = result.current.handleSubmit(() => {});
    act(() => {
      handleSubmit();
    });

    await waitFor(() => {
      expect(result.current.formState.errors.email?.message).toBe(
        "Invalid email format"
      );
    });
  });

  it("should handle custom validation function", async () => {
    const { result } = renderHook(() => useForm());

    result.current.register("age", {
      validate: (value) => value >= 18 || "Must be at least 18 years old",
    });

    act(() => {
      result.current.setValue("age", 16);
    });

    const handleSubmit = result.current.handleSubmit(() => {});
    act(() => {
      handleSubmit();
    });

    await waitFor(() => {
      expect(result.current.formState.errors.age?.message).toBe(
        "Must be at least 18 years old"
      );
    });
  });

  it("should handle async validation", async () => {
    const { result } = renderHook(() => useForm());

    result.current.register("username", {
      validate: async (value) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 100));
        return value === "admin" ? "Username already taken" : true;
      },
    });

    act(() => {
      result.current.setValue("username", "admin");
    });

    const handleSubmit = result.current.handleSubmit(() => {});
    act(() => {
      handleSubmit();
    });

    await waitFor(() => {
      expect(result.current.formState.errors.username?.message).toBe(
        "Username already taken"
      );
    });
  });

  it("should track dirty state", () => {
    const { result } = renderHook(() => useForm({ name: "John" }));

    expect(result.current.formState.isDirty).toBe(false);

    act(() => {
      result.current.setValue("name", "Jane");
    });

    expect(result.current.formState.isDirty).toBe(true);
    expect(result.current.formState.dirtyFields.name).toBe(true);
  });

  it("should track touched state", () => {
    const { result } = renderHook(() => useForm());

    const register = result.current.register("name");

    act(() => {
      register.onBlur({ target: { name: "name" } });
    });

    expect(result.current.formState.touchedFields.name).toBe(true);
  });

  it("should handle form submission", async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() => useForm());

    result.current.register("name", { required: true });

    act(() => {
      result.current.setValue("name", "John");
    });

    const handleSubmit = result.current.handleSubmit(onSubmit);
    act(() => {
      handleSubmit();
    });

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ name: "John" });
      expect(result.current.formState.isSubmitted).toBe(true);
    });
  });

  it("should prevent submission when form is invalid", async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() => useForm());

    result.current.register("name", { required: "Name is required" });

    const handleSubmit = result.current.handleSubmit(onSubmit);
    act(() => {
      handleSubmit();
    });

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
      expect(result.current.formState.isValid).toBe(false);
    });
  });

  it("should clear errors", () => {
    const { result } = renderHook(() => useForm());

    result.current.register("name", { required: "Name is required" });

    act(() => {
      result.current.setError("name", {
        type: "required",
        message: "Name is required",
      });
    });

    expect(result.current.formState.errors.name).toBeDefined();

    act(() => {
      result.current.clearErrors("name");
    });

    expect(result.current.formState.errors.name).toBeUndefined();
  });

  it("should reset form", () => {
    const { result } = renderHook(() => useForm({ name: "John" }));

    act(() => {
      result.current.setValue("name", "Jane");
    });

    expect(result.current.getValues("name")).toBe("Jane");
    expect(result.current.formState.isDirty).toBe(true);

    act(() => {
      result.current.reset();
    });

    expect(result.current.getValues("name")).toBe("John");
    expect(result.current.formState.isDirty).toBe(false);
  });

  it("should reset form with new values", () => {
    const { result } = renderHook(() => useForm({ name: "John" }));

    act(() => {
      result.current.reset({ name: "Jane", email: "jane@example.com" });
    });

    expect(result.current.getValues("name")).toBe("Jane");
    expect(result.current.getValues("email")).toBe("jane@example.com");
  });

  it("should watch field values", () => {
    const { result } = renderHook(() => useForm());

    result.current.register("name");

    act(() => {
      result.current.setValue("name", "John");
    });

    expect(result.current.watch("name")).toBe("John");
  });

  it("should get field state", () => {
    const { result } = renderHook(() => useForm({ name: "John" }));

    result.current.register("name", { required: true });

    const fieldState = result.current.getFieldState("name");
    expect(fieldState.isDirty).toBe(false);
    expect(fieldState.isTouched).toBe(false);
    expect(fieldState.invalid).toBe(false);

    act(() => {
      result.current.setValue("name", "Jane");
    });

    const updatedFieldState = result.current.getFieldState("name");
    expect(updatedFieldState.isDirty).toBe(true);
  });

  it("should handle multiple fields", () => {
    const { result } = renderHook(() => useForm());

    result.current.register("firstName", { required: true });
    result.current.register("lastName", { required: true });
    result.current.register("email", {
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email",
      },
    });

    act(() => {
      result.current.setValue("firstName", "John");
      result.current.setValue("lastName", "Doe");
      result.current.setValue("email", "john@example.com");
    });

    expect(result.current.getValues("firstName")).toBe("John");
    expect(result.current.getValues("lastName")).toBe("Doe");
    expect(result.current.getValues("email")).toBe("john@example.com");
  });

  it("should handle valueAsNumber option", () => {
    const { result } = renderHook(() => useForm());

    result.current.register("age", { valueAsNumber: true });

    const register = result.current.register("age", { valueAsNumber: true });

    act(() => {
      register.onChange({ target: { value: "25" } });
    });

    expect(result.current.getValues("age")).toBe(25);
    expect(typeof result.current.getValues("age")).toBe("number");
  });

  it("should handle valueAsDate option", () => {
    const { result } = renderHook(() => useForm());

    const register = result.current.register("birthDate", {
      valueAsDate: true,
    });

    act(() => {
      register.onChange({ target: { value: "2023-01-01" } });
    });

    const value = result.current.getValues("birthDate");
    expect(value).toBeInstanceOf(Date);
  });
});
