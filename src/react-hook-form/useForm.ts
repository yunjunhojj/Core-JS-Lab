/**
 * React Hook Form 구현 문제
 *
 * 이 문제는 React Hook Form과 유사한 useForm 훅을 직접 구현하는 것입니다.
 *
 * 요구사항:
 * 1. 폼 상태 관리 (values, errors, touched, isSubmitting, isValid)
 * 2. 필드 값 변경 핸들링 (register, setValue, getValue)
 * 3. 폼 유효성 검사 (validation rules, async validation)
 * 4. 폼 제출 처리 (onSubmit, preventDefault)
 * 5. 필드 에러 상태 관리 (setError, clearErrors)
 * 6. 폼 리셋 기능 (reset)
 * 7. 필드 포커스 관리 (focus, blur)
 * 8. 폼 더티 상태 추적 (isDirty)
 * 9. 필드별 touched 상태 관리
 * 10. 커스텀 validation 함수 지원
 *
 * 구현해야 할 기능들:
 * - FormState<T> 인터페이스에 맞는 상태 반환
 * - FieldValues 타입 지원
 * - RegisterOptions의 모든 validation 옵션 지원
 * - 메모리 누수 방지를 위한 cleanup 로직
 * - 비동기 validation 지원
 * - 필드 배열 지원 (선택사항)
 *
 * 테스트 케이스:
 * - 폼 초기화 및 기본 상태 확인
 * - 필드 등록 및 값 변경
 * - 동기/비동기 유효성 검사
 * - 에러 상태 관리
 * - 폼 제출 처리
 * - 폼 리셋 기능
 * - 필드 포커스 관리
 * - 더티 상태 추적
 * - touched 상태 관리
 * - 커스텀 validation 함수
 */

import { useState, useCallback, useRef, useEffect } from "react";

export type FieldValue = any;
export type FieldValues = Record<string, FieldValue>;

export interface ValidationRule {
  required?: boolean | string;
  min?: number | { value: number; message: string };
  max?: number | { value: number; message: string };
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  validate?: (
    value: FieldValue
  ) => boolean | string | Promise<boolean | string>;
}

export interface RegisterOptions extends ValidationRule {
  valueAsNumber?: boolean;
  valueAsDate?: boolean;
  setValueAs?: (value: FieldValue) => any;
  disabled?: boolean;
  shouldUnregister?: boolean;
  onChange?: (event: any) => void;
  onBlur?: (event: any) => void;
  shouldFocus?: boolean;
}

export interface FieldError {
  type: string;
  message?: string;
  ref?: any;
}

export interface FormState<T extends FieldValues = FieldValues> {
  isDirty: boolean;
  isValid: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
  touchedFields: Partial<Record<keyof T, boolean>>;
  dirtyFields: Partial<Record<keyof T, boolean>>;
  errors: Partial<Record<keyof T, FieldError>>;
}

export interface UseFormReturn<T extends FieldValues = FieldValues> {
  register: (
    name: keyof T,
    options?: RegisterOptions
  ) => {
    name: keyof T;
    onChange: (event: any) => void;
    onBlur: (event: any) => void;
    ref: (element: any) => void;
  };
  handleSubmit: (
    onSubmit: (data: T) => void | Promise<void>
  ) => (event?: any) => void;
  formState: FormState<T>;
  getValues: (name?: keyof T) => any;
  setValue: (
    name: keyof T,
    value: any,
    options?: { shouldValidate?: boolean; shouldDirty?: boolean }
  ) => void;
  setError: (name: keyof T, error: FieldError) => void;
  clearErrors: (name?: keyof T) => void;
  reset: (values?: Partial<T>) => void;
  watch: (name?: keyof T) => any;
  getFieldState: (name: keyof T) => {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    error?: FieldError;
  };
}

export function useForm<T extends FieldValues = FieldValues>(
  defaultValues?: Partial<T>
): UseFormReturn<T> {
  // TODO: 여기에 useForm 훅을 구현하세요

  return {
    register: () => ({
      name: "",
      onChange: () => {},
      onBlur: () => {},
      ref: () => {},
    }),
    handleSubmit: () => () => {},
    formState: {
      isDirty: false,
      isValid: true,
      isSubmitting: false,
      isSubmitted: false,
      touchedFields: {},
      dirtyFields: {},
      errors: {},
    },
    getValues: () => undefined,
    setValue: () => {},
    setError: () => {},
    clearErrors: () => {},
    reset: () => {},
    watch: () => undefined,
    getFieldState: () => ({
      invalid: false,
      isDirty: false,
      isTouched: false,
    }),
  };
}
