/**
 * useQuery 훅 구현 문제
 *
 * 이 문제는 React Query와 유사한 useQuery 훅을 직접 구현하는 것입니다.
 *
 * 요구사항:
 * 1. 데이터 페칭을 위한 비동기 쿼리 함수 실행
 * 2. 로딩, 성공, 에러 상태 관리
 * 3. 데이터 캐싱 시스템 (staleTime 기반)
 * 4. 에러 발생 시 재시도 로직
 * 5. 성공/에러 콜백 지원
 * 6. refetch 기능으로 수동 재요청
 * 7. enabled 옵션으로 쿼리 비활성화
 * 8. 배열 형태의 쿼리 키 지원
 * 9. 컴포넌트 언마운트 시 정리 작업
 *
 * 구현해야 할 기능들:
 * - QueryResult<T> 인터페이스에 맞는 상태 반환
 * - QueryOptions<T> 인터페이스의 모든 옵션 지원
 * - 메모리 누수 방지를 위한 cleanup 로직
 * - 캐시 무효화 및 stale 데이터 처리
 * - 재시도 지연 시간 커스터마이징
 *
 * 테스트 케이스:
 * - 초기 로딩 상태 확인
 * - 성공적인 데이터 페칭
 * - 에러 처리 및 재시도
 * - 캐싱 동작 검증
 * - 콜백 함수 호출 확인
 * - refetch 기능 테스트
 * - enabled 옵션 동작 확인
 */

import { useState, useEffect, useCallback, useRef } from "react";

export interface QueryOptions<T> {
  enabled?: boolean;
  staleTime?: number;
  retry?: number | boolean;
  retryDelay?: number | ((retryCount: number) => number);
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export interface QueryResult<T> {
  data: T | undefined;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => void;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  staleTime: number;
}

class QueryCache {
  private cache = new Map<string, CacheEntry<any>>();

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.staleTime) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  set<T>(key: string, data: T, staleTime: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      staleTime,
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

const queryCache = new QueryCache();

export function useQuery<T>(
  queryKey: string | string[],
  queryFn: () => Promise<T>,
  options: QueryOptions<T> = {}
): QueryResult<T> {
  const {
    enabled = true,
    staleTime = 5 * 60 * 1000, // 5 minutes
    retry = 3,
    retryDelay = 1000,
    onSuccess,
    onError,
  } = options;

  return {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    refetch,
  };
}
