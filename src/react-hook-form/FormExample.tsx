/**
 * useForm 훅 사용 예제
 *
 * 이 컴포넌트는 구현한 useForm 훅을 실제로 사용하는 예제입니다.
 * 문제를 푸는 사람들이 참고할 수 있도록 작성되었습니다.
 */

import React from "react";
import { useForm } from "./useForm";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export function FormExample() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    getValues,
    setValue,
    reset,
    watch,
  } = useForm<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted with data:", data);
    // 실제 폼 제출 로직을 여기에 구현
    await new Promise((resolve) => setTimeout(resolve, 1000)); // API 호출 시뮬레이션
  };

  const handleReset = () => {
    reset();
  };

  const handleSetValue = () => {
    setValue("firstName", "John");
    setValue("lastName", "Doe");
    setValue("email", "john.doe@example.com");
  };

  // 특정 필드 값 감시
  const watchedEmail = watch("email");

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>React Hook Form 구현 예제</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="firstName">First Name:</label>
          <input
            {...register("firstName", {
              required: "First name is required",
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters",
              },
            })}
            type="text"
            id="firstName"
          />
          {errors.firstName && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="lastName">Last Name:</label>
          <input
            {...register("lastName", {
              required: "Last name is required",
              minLength: {
                value: 2,
                message: "Last name must be at least 2 characters",
              },
            })}
            type="text"
            id="lastName"
          />
          {errors.lastName && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.lastName.message}
            </span>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email">Email:</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            type="email"
            id="email"
          />
          {errors.email && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.email.message}
            </span>
          )}
          {watchedEmail && (
            <div style={{ fontSize: "12px", color: "gray" }}>
              Watching email: {watchedEmail}
            </div>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="age">Age:</label>
          <input
            {...register("age", {
              required: "Age is required",
              min: { value: 18, message: "Must be at least 18 years old" },
              max: { value: 120, message: "Must be less than 120 years old" },
              valueAsNumber: true,
            })}
            type="number"
            id="age"
          />
          {errors.age && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.age.message}
            </span>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password">Password:</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, and one number",
              },
            })}
            type="password"
            id="password"
          />
          {errors.password && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.password.message}
            </span>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => {
                const password = getValues("password");
                return value === password || "Passwords do not match";
              },
            })}
            type="password"
            id="confirmPassword"
          />
          {errors.confirmPassword && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>
            <input
              {...register("terms", {
                required: "You must accept the terms and conditions",
              })}
              type="checkbox"
            />
            I agree to the terms and conditions
          </label>
          {errors.terms && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.terms.message}
            </span>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              backgroundColor: isValid ? "#007bff" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isValid ? "pointer" : "not-allowed",
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>

          <button
            type="button"
            onClick={handleSetValue}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Set Sample Data
          </button>
        </div>
      </form>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "4px",
        }}
      >
        <h3>Form State:</h3>
        <p>
          <strong>Is Dirty:</strong> {isDirty ? "Yes" : "No"}
        </p>
        <p>
          <strong>Is Valid:</strong> {isValid ? "Yes" : "No"}
        </p>
        <p>
          <strong>Is Submitting:</strong> {isSubmitting ? "Yes" : "No"}
        </p>
        <p>
          <strong>Current Values:</strong>
        </p>
        <pre
          style={{
            fontSize: "12px",
            backgroundColor: "#e9ecef",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          {JSON.stringify(
            {
              firstName: getValues("firstName"),
              lastName: getValues("lastName"),
              email: getValues("email"),
              age: getValues("age"),
              password: getValues("password") ? "***" : "",
              confirmPassword: getValues("confirmPassword") ? "***" : "",
              terms: getValues("terms"),
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}
