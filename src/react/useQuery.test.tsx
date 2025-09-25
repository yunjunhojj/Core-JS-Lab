import { renderHook, act, waitFor } from "@testing-library/react";
import { useQuery } from "./useQuery";
import { vi, describe, it, expect, beforeEach } from "vitest";

describe("useQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return initial loading state", () => {
    const queryFn = vi.fn().mockResolvedValue("test data");

    const { result } = renderHook(() => useQuery("test-key-1", queryFn));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
    expect(result.current.isError).toBe(false);
    expect(result.current.isSuccess).toBe(false);
  });

  it("should fetch data successfully", async () => {
    const mockData = { id: 1, name: "Test" };
    const queryFn = vi.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useQuery("test-key-2", queryFn));

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.isError).toBe(false);
    expect(queryFn).toHaveBeenCalledTimes(1);
  });

  it("should handle query errors", async () => {
    const error = new Error("Query failed");
    const queryFn = vi.fn().mockRejectedValue(error);

    const { result } = renderHook(() => useQuery("test-key-3", queryFn));

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(error);
    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
  });

  it("should not execute query when enabled is false", () => {
    const queryFn = vi.fn().mockResolvedValue("data");

    const { result } = renderHook(() =>
      useQuery("test-key-4", queryFn, { enabled: false })
    );

    expect(result.current.isLoading).toBe(false);
    expect(queryFn).not.toHaveBeenCalled();
  });

  it("should call onSuccess callback when query succeeds", async () => {
    const mockData = { id: 1, name: "Test" };
    const queryFn = vi.fn().mockResolvedValue(mockData);
    const onSuccess = vi.fn();

    renderHook(() => useQuery("test-key-5", queryFn, { onSuccess }));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(mockData);
    });
  });

  it("should call onError callback when query fails", async () => {
    const error = new Error("Query failed");
    const queryFn = vi.fn().mockRejectedValue(error);
    const onError = vi.fn();

    renderHook(() => useQuery("test-key-6", queryFn, { onError }));

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(error);
    });
  });

  it("should refetch data when refetch is called", async () => {
    const mockData = { id: 1, name: "Test" };
    const queryFn = vi.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useQuery("test-key-7", queryFn));

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(queryFn).toHaveBeenCalledTimes(1);

    // Call refetch
    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(queryFn).toHaveBeenCalledTimes(2);
    });
  });

  it("should handle array query keys", async () => {
    const mockData = { id: 1, name: "Test" };
    const queryFn = vi.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() =>
      useQuery(["users", "profile", 1], queryFn)
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
  });

  it("should not retry when retry is false", async () => {
    const error = new Error("Query failed");
    const queryFn = vi.fn().mockRejectedValue(error);

    const { result } = renderHook(() =>
      useQuery("test-key-8", queryFn, { retry: false })
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(queryFn).toHaveBeenCalledTimes(1);
  });
});
