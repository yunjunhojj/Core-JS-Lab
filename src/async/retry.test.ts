import { describe, it, expect, vi } from "vitest";
import { retry, type RetryOptions } from "./retry";

const onceFailThenOk = (failCount: number) => {
    let n = 0;
    return vi.fn(async () => {
        if (n++ < failCount) throw new Error("fail");
        return "ok";
    });
};

describe("retry", () => {
    it("정해진 횟수 내 성공 시 resolve", async () => {
        const fn = onceFailThenOk(2);
        const res = await retry(fn, { retries: 3, delayMs: 0 });
        expect(res).toBe("ok");
        expect(fn).toHaveBeenCalledTimes(3);
    });

    it("모두 실패 시 마지막 에러로 reject", async () => {
        const fn = onceFailThenOk(5);
        await expect(retry(fn, { retries: 2, delayMs: 0 })).rejects.toThrow("fail");
    });

    it("shouldRetry가 false면 즉시 reject", async () => {
        const fn = vi.fn(async () => { throw new Error("fatal"); });
        await expect(retry(fn, {
            retries: 5,
            shouldRetry: e => e.message !== "fatal"
        })).rejects.toThrow("fatal");
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it("backoff 적용", async () => {
        const fn = onceFailThenOk(1);
        const backoff = vi.fn(attempt => attempt * 5);
        await retry(fn, { retries: 2, backoff });
        expect(backoff).toHaveBeenCalledWith(1);
    });
});