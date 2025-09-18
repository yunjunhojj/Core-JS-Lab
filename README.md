# My Utils - 배열 유틸리티 함수 구현 프로젝트

## 📋 프로젝트 개요

이 프로젝트는 JavaScript/TypeScript의 기본 배열 메서드들을 직접 구현하여 학습하고 테스트하는 교육용 프로젝트입니다. Vite, TypeScript, Vitest를 사용하여 현대적인 개발 환경을 구축했습니다.

## 🚀 주요 기능

### 배열 유틸리티 함수들

- **`map<T, U>`** - 배열의 각 요소를 변환하여 새로운 배열 반환
- **`filter<T>`** - 조건을 만족하는 요소만 필터링하여 새로운 배열 반환
- **`reduce<T, U>`** - 배열을 순회하며 누적값을 계산
- **`every<T>`** - 모든 요소가 조건을 만족하는지 검사 (단락 평가)
- **`some<T>`** - 하나라도 조건을 만족하는 요소가 있는지 검사 (단락 평가)

### 특징

- **TypeScript 지원**: 완전한 타입 안전성 보장
- **표준 준수**: ECMAScript 표준 스펙에 맞는 동작
- **Sparse Array 처리**: 배열의 구멍(hole)을 올바르게 처리
- **thisArg 지원**: 콜백 함수의 this 컨텍스트 설정 가능
- **단락 평가**: `every`, `some`에서 성능 최적화

## 🛠️ 기술 스택

- **언어**: TypeScript 5.8+
- **빌드 도구**: Vite 7.1+
- **테스트 프레임워크**: Vitest 3.2+
- **린터**: ESLint 9.33+
- **코드 포맷터**: Prettier 3.6+
- **패키지 매니저**: pnpm

## 📁 프로젝트 구조

```
my-utils/
├── src/
│   ├── array/           # 배열 유틸리티 함수들
│   │   ├── map.ts       # map 함수 구현
│   │   ├── filter.ts    # filter 함수 구현
│   │   ├── reduce.ts    # reduce 함수 구현
│   │   ├── every.ts     # every 함수 구현
│   │   ├── some.ts      # some 함수 구현
│   │   └── *.test.ts    # 각 함수별 테스트 파일
│   ├── counter.ts       # 카운터 컴포넌트
│   ├── main.ts          # 메인 애플리케이션 진입점
│   └── style.css        # 스타일시트
├── public/              # 정적 파일들
├── package.json         # 프로젝트 설정 및 의존성
├── tsconfig.json        # TypeScript 설정
├── vitest.config.ts     # Vitest 설정
└── README.md            # 프로젝트 문서
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0+ 
- pnpm (권장)

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 테스트 실행
pnpm test

# 테스트 감시 모드
pnpm test:watch

# 빌드
pnpm build

# 타입 체크
pnpm typecheck

# 린트 검사
pnpm lint
```

## 🧪 테스트

각 배열 함수는 포괄적인 테스트 케이스를 포함합니다:

- **기본 동작**: 일반적인 사용 사례
- **Edge Cases**: 빈 배열, sparse array 등 특수한 상황
- **thisArg 처리**: 콜백 함수의 컨텍스트 설정
- **에러 처리**: 잘못된 입력에 대한 예외 발생
- **성능 최적화**: 단락 평가 동작 검증

### 테스트 실행 예시

```bash
# 전체 테스트 실행
pnpm test

# 특정 테스트 파일만 실행
pnpm test src/array/map.test.ts

# 커버리지 리포트 생성
pnpm test --coverage
```

## 🔧 개발 가이드

### 새로운 배열 함수 추가하기

1. `src/array/` 디렉토리에 함수 구현 파일 생성
2. TypeScript 타입 정의 작성
3. 테스트 파일 생성 및 테스트 케이스 작성
4. 함수 구현 완성
5. 모든 테스트 통과 확인

### 코드 품질

- **TypeScript**: 엄격한 타입 체크 적용
- **ESLint**: 코드 품질 및 일관성 유지
- **Prettier**: 코드 포맷팅 자동화
- **테스트 커버리지**: 모든 함수에 대한 포괄적인 테스트

## 📚 학습 목표

이 프로젝트를 통해 다음과 같은 내용을 학습할 수 있습니다:

- **함수형 프로그래밍**: 고차 함수와 콜백 패턴
- **타입 시스템**: 제네릭과 타입 안전성
- **테스트 주도 개발**: TDD 방법론과 테스트 작성법
- **모던 JavaScript**: ES6+ 문법과 배열 메서드 동작 원리
- **개발 도구**: Vite, TypeScript, Vitest 등 현대적 도구 활용

## 🤝 기여하기

1. 이슈 생성 또는 기존 이슈 확인
2. 새로운 브랜치 생성
3. 코드 작성 및 테스트 통과 확인
4. Pull Request 생성

## 📄 라이선스

이 프로젝트는 교육 목적으로 제작되었습니다.

## 🔗 관련 링크

- [Vite 공식 문서](https://vitejs.dev/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)
- [Vitest 공식 문서](https://vitest.dev/)
- [ECMAScript 표준](https://tc39.es/ecma262/) 

## ⚙️ 비동기 유틸리티 (Async Utilities)

### promiseAll(iterable)
- 여러 `Promise`(또는 값)를 받아 입력 순서를 보존하며 모두 완료되면 결과 배열을 반환합니다.
- 하나라도 reject되면 즉시 같은 이유로 reject됩니다.

```ts
import { promiseAll } from "./src/async/promiseAll";

const sleep = <T>(v: T, ms: number) => new Promise<T>(r => setTimeout(() => r(v), ms));

const result = await promiseAll([sleep(1, 30), sleep(2, 10), 3]);
// result === [1, 2, 3]
```

### promiseAllSettled(iterable)
- 모든 입력이 settled될 때까지 기다린 뒤 각 항목의 상태와 값을 반환합니다.
- 항상 입력 순서대로 결과를 반환합니다.

```ts
import { promiseAllSettled } from "./src/async/promiseAllSettled";

const res = await promiseAllSettled([1, Promise.resolve(2), Promise.reject("e")]);
// res === [
//   { status: "fulfilled", value: 1 },
//   { status: "fulfilled", value: 2 },
//   { status: "rejected", reason: "e" },
// ]
```

### retry(fn, options)
- 실패 가능한 비동기 작업을 지정된 횟수만큼 재시도합니다.
- 옵션
  - `retries`(number): 최대 재시도 횟수
  - `delayMs`(number): 각 시도 사이의 고정 대기 시간(ms)
  - `backoff`(attempt => ms): 시도 번호 기반 동적 대기 시간(지수 백오프 등)
  - `shouldRetry`(error => boolean): 특정 에러는 즉시 중단하고 reject

```ts
import { retry } from "./src/async/retry";

let n = 0;
const flaky = async () => {
  if (n++ < 2) throw new Error("fail");
  return "ok";
};

const value = await retry(flaky, { retries: 3, delayMs: 0 });
// value === "ok" (최대 3번 시도 내 성공)
```

### asyncPool(limit, items, mapper)
- 주어진 `items`를 `limit` 동시성으로 처리하면서, `mapper`의 결과를 입력 순서에 맞춰 반환합니다.

```ts
import { asyncPool } from "./src/async/asyncPool";

const items = [1, 2, 3, 4, 5];
const sleep = <T>(v: T, ms: number) => new Promise<T>(r => setTimeout(() => r(v), ms));

const out = await asyncPool(2, items, async (x) => sleep(x * 10, 20));
// out === [10, 20, 30, 40, 50]
```

### withConcurrency(limit)
- 주어진 작업 함수 배열을 `limit` 동시성으로 실행하는 러너를 생성합니다.
- 입력 순서를 보존하여 결과 배열을 반환하며, 하나라도 실패하면 즉시 reject됩니다.

```ts
import { withConcurrency } from "./src/async/withConcurrency";

const run = withConcurrency(2);
const tasks = [
  () => fetch("/api/a").then(r => r.json()),
  () => fetch("/api/b").then(r => r.json()),
  () => fetch("/api/c").then(r => r.json()),
];

const results = await run(tasks);
// results: [aResult, bResult, cResult]
```

> 참고: 위 유틸리티들은 입력 순서 보존과 에러 처리 일관성을 중시하며, 테스트(`src/async/*.test.ts`)로 기대 동작을 명확히 검증합니다. 