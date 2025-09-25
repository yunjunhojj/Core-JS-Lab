# React Hook Form 구현 문제

이 폴더는 React Hook Form과 유사한 `useForm` 훅을 직접 구현하는 연습 문제입니다.

## 문제 개요

React Hook Form은 React에서 폼을 다루는 가장 인기 있는 라이브러리 중 하나입니다. 이 문제에서는 React Hook Form의 핵심 기능들을 직접 구현해보면서 React 훅과 폼 관리에 대한 깊은 이해를 얻을 수 있습니다.

## 파일 구조

```
src/react-hook-form/
├── useForm.ts          # 구현해야 할 useForm 훅
├── useForm.test.tsx    # 테스트 케이스들
├── FormExample.tsx     # 사용 예제 컴포넌트
└── README.md          # 이 파일
```

## 구현해야 할 기능들

### 1. 기본 폼 상태 관리

- `values`: 폼의 현재 값들
- `errors`: 필드별 에러 상태
- `touched`: 필드별 터치 상태
- `isDirty`: 폼이 변경되었는지 여부
- `isValid`: 폼이 유효한지 여부
- `isSubmitting`: 제출 중인지 여부
- `isSubmitted`: 제출되었는지 여부

### 2. 필드 관리

- `register`: 필드 등록 및 이벤트 핸들러 반환
- `getValues`: 특정 필드 또는 모든 필드 값 가져오기
- `setValue`: 필드 값 설정
- `watch`: 필드 값 감시
- `getFieldState`: 특정 필드의 상태 정보 가져오기

### 3. 유효성 검사

- **동기 검증**: required, min, max, minLength, maxLength, pattern
- **비동기 검증**: validate 함수에서 Promise 반환
- **커스텀 검증**: 사용자 정의 검증 함수
- **조건부 검증**: 다른 필드 값에 따른 검증

### 4. 에러 관리

- `setError`: 특정 필드에 에러 설정
- `clearErrors`: 에러 제거
- 에러 타입 및 메시지 관리

### 5. 폼 제출

- `handleSubmit`: 폼 제출 핸들러
- 유효성 검사 후 제출
- preventDefault 처리

### 6. 폼 리셋

- `reset`: 폼을 초기 상태로 리셋
- 기본값으로 리셋 또는 새로운 값으로 리셋

### 7. 고급 기능

- `valueAsNumber`: 숫자로 변환
- `valueAsDate`: 날짜로 변환
- `setValueAs`: 커스텀 변환 함수
- `shouldUnregister`: 컴포넌트 언마운트 시 필드 제거 여부

## 테스트 케이스

총 20개의 테스트 케이스가 준비되어 있습니다:

1. **기본 초기화**: 기본값으로 폼 초기화
2. **필드 등록**: 필드 등록 및 값 변경
3. **필수 필드 검증**: required 검증
4. **길이 검증**: minLength, maxLength 검증
5. **패턴 검증**: 정규식 패턴 검증
6. **커스텀 검증**: 사용자 정의 검증 함수
7. **비동기 검증**: Promise를 반환하는 검증
8. **더티 상태**: 폼 변경 상태 추적
9. **터치 상태**: 필드 터치 상태 추적
10. **폼 제출**: 유효한 폼 제출
11. **무효한 제출**: 유효하지 않은 폼 제출 방지
12. **에러 제거**: clearErrors 기능
13. **폼 리셋**: reset 기능
14. **새 값으로 리셋**: 새로운 값으로 리셋
15. **필드 감시**: watch 기능
16. **필드 상태**: getFieldState 기능
17. **다중 필드**: 여러 필드 동시 관리
18. **숫자 변환**: valueAsNumber 옵션
19. **날짜 변환**: valueAsDate 옵션

## 시작하기

1. `useForm.ts` 파일을 열고 TODO 주석을 찾으세요
2. 각 기능을 하나씩 구현해보세요
3. `pnpm test src/react-hook-form/useForm.test.tsx`로 테스트를 실행하세요
4. 모든 테스트가 통과할 때까지 구현을 완성하세요

## 힌트

- `useState`와 `useCallback`을 적극 활용하세요
- 메모리 누수를 방지하기 위해 cleanup 로직을 구현하세요
- 비동기 검증을 위해 `Promise.all`을 사용할 수 있습니다
- 필드 상태를 효율적으로 관리하기 위해 객체를 사용하세요

## 추가 도전 과제

기본 구현을 완료한 후 다음 기능들도 구현해보세요:

1. **필드 배열 지원**: 동적 필드 추가/제거
2. **폼 컨텍스트**: 여러 컴포넌트에서 폼 상태 공유
3. **성능 최적화**: 불필요한 리렌더링 방지
4. **타입 안전성**: 더 엄격한 TypeScript 타입 정의

## 참고 자료

- [React Hook Form 공식 문서](https://react-hook-form.com/)
- [React Hooks 공식 문서](https://reactjs.org/docs/hooks-intro.html)
- [폼 유효성 검사 모범 사례](https://web.dev/sign-up-form-best-practices/)

행운을 빕니다! 🚀
