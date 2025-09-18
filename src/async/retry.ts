export interface RetryOptions {
    retries: number;          // 총 재시도 횟수
    delayMs?: number;         // 고정 딜레이
    backoff?: (attempt: number) => number; // 지수 백오프 등
    shouldRetry?: (e: any) => boolean;     // 재시도 조건
}
export function retry<T>(fn: () => Promise<T>, opts: RetryOptions): Promise<T> {
    return;
}