export interface RetryOptions {
    retries: number;                               // 재시도 횟수(실패 후 시도 수)
    delayMs?: number;                              // 고정 대기(ms)
    backoff?: (attempt: number) => number;         // 시도 번호(1..n) 기반 backoff(ms)
    shouldRetry?: (e: any) => boolean;             // 재시도 여부 판단
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export async function retry<T>(
    fn: () => Promise<T>,
    {
        retries,
        delayMs = 0,
        backoff,
        shouldRetry = () => true,
    }: RetryOptions
): Promise<T> {
    let attempt = 0; // 실패 후 재시도 카운트

    for (; ;) {
        try {
            return await fn();
        } catch (e) {
            const canRetry = shouldRetry(e) && attempt < retries;
            if (!canRetry) throw e;

            attempt += 1;
            const wait = backoff ? backoff(attempt) : delayMs;
            if (wait > 0) await sleep(wait);
        }
    }
}