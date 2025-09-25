# React Hooks 구현 문제

이 폴더는 React에서 자주 사용되는 커스텀 훅들을 직접 구현하는 연습 문제들입니다.

## 📁 문제 목록

### 1. useQuery 훅 구현

- **파일**: `useQuery.ts`, `useQuery.test.tsx`
- **설명**: React Query와 유사한 데이터 페칭 훅 구현
- **난이도**: ⭐⭐⭐⭐

### 2. useForm 훅 구현 (추가 예정)

- **파일**: `useForm.ts`, `useForm.test.tsx`
- **설명**: React Hook Form과 유사한 폼 관리 훅 구현
- **난이도**: ⭐⭐⭐⭐⭐

## 🚀 시작하기

각 문제는 독립적으로 풀 수 있습니다. 문제를 풀기 전에 다음 단계를 따르세요:

1. **문제 파일 읽기**: 각 훅의 `.ts` 파일을 열어 요구사항을 확인하세요
2. **테스트 실행**: `pnpm test src/react/[훅이름].test.tsx`로 현재 상태를 확인하세요
3. **구현 시작**: TODO 주석이 있는 부분부터 차근차근 구현하세요
4. **테스트 통과**: 모든 테스트가 통과할 때까지 구현을 완성하세요

## 🛠️ 사용 가능한 도구들

- **TypeScript**: 타입 안전성을 위한 정적 타입 검사
- **Vitest**: 빠르고 현대적인 테스트 프레임워크
- **React Testing Library**: React 컴포넌트 테스트를 위한 유틸리티
- **jsdom**: 브라우저 환경 시뮬레이션

## 📚 학습 목표

이 문제들을 통해 다음을 학습할 수 있습니다:

- **React Hooks 패턴**: useState, useEffect, useCallback, useRef 등의 활용
- **비동기 처리**: Promise, async/await, 에러 핸들링
- **상태 관리**: 복잡한 상태의 효율적인 관리
- **메모리 관리**: 메모리 누수 방지 및 cleanup 로직
- **타입스크립트**: 제네릭, 유니온 타입, 인터페이스 활용
- **테스트 작성**: 단위 테스트 및 통합 테스트 작성법

## 🎯 문제별 상세 정보

### useQuery 훅

**핵심 기능:**

- 데이터 페칭 및 상태 관리
- 캐싱 시스템 (staleTime 기반)
- 에러 처리 및 재시도 로직
- 성공/에러 콜백 지원
- refetch 기능
- enabled 옵션으로 쿼리 비활성화

**구현해야 할 인터페이스:**

```typescript
interface QueryResult<T> {
  data: T | undefined;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => void;
}

interface QueryOptions<T> {
  enabled?: boolean;
  staleTime?: number;
  retry?: number | boolean;
  retryDelay?: number | ((retryCount: number) => number);
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}
```

**테스트 케이스:** 9개

- 초기 로딩 상태 확인
- 성공적인 데이터 페칭
- 에러 처리 및 재시도
- 캐싱 동작 검증
- 콜백 함수 호출 확인
- refetch 기능 테스트
- enabled 옵션 동작 확인

## 💡 힌트

### useQuery 구현 시 주의사항

1. **메모리 누수 방지**: 컴포넌트 언마운트 시 진행 중인 요청 취소
2. **캐시 관리**: staleTime을 고려한 캐시 무효화
3. **재시도 로직**: 지수 백오프를 사용한 재시도 간격 조정
4. **상태 동기화**: 여러 컴포넌트에서 같은 쿼리 키 사용 시 상태 공유

### 일반적인 구현 패턴

```typescript
// 1. 상태 정의
const [data, setData] = useState<T | undefined>(undefined);
const [error, setError] = useState<Error | null>(null);
const [isLoading, setIsLoading] = useState(false);

// 2. 비동기 로직
const executeQuery = useCallback(async () => {
  // 캐시 확인
  // 로딩 상태 설정
  // API 호출
  // 결과 처리
}, [dependencies]);

// 3. Effect로 실행
useEffect(() => {
  executeQuery();
}, [executeQuery]);

// 4. Cleanup
useEffect(() => {
  return () => {
    // 정리 작업
  };
}, []);
```

## 🔍 디버깅 팁

1. **테스트 실패 시**: 에러 메시지를 자세히 읽고 어떤 조건이 실패했는지 확인
2. **비동기 테스트**: `waitFor`를 사용하여 비동기 작업 완료 대기
3. **상태 확인**: `console.log`로 중간 상태를 확인하되, 테스트에서는 제거
4. **타입 에러**: TypeScript 에러 메시지를 따라 타입 정의 수정

## 🎉 완료 후

모든 테스트가 통과하면:

1. **코드 리뷰**: 구현한 코드를 다시 한번 검토
2. **성능 최적화**: 불필요한 리렌더링이나 메모리 사용량 확인
3. **에지 케이스**: 예외 상황에 대한 처리 확인
4. **문서화**: 코드에 주석 추가 및 README 업데이트

## 📖 추가 학습 자료

- [React Hooks 공식 문서](https://reactjs.org/docs/hooks-intro.html)
- [React Query 공식 문서](https://tanstack.com/query/latest)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [Testing Library 문서](https://testing-library.com/docs/)

행운을 빕니다! 🚀
