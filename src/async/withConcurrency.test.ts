import { describe, it, expect } from "vitest";
import { withConcurrency } from "./withConcurrency";

const task = (v: number, ms: number) => () =>
    new Promise<number>(resolve => setTimeout(() => resolve(v), ms));

describe("withConcurrency", () => {
    it("입력 순서 보존 + 동시성 제한", async () => {
        const run = withConcurrency(2);
        let concurrent = 0, maxConcurrent = 0;

        const makeTracked = (v: number, ms: number) => () => new Promise<number>((res) => {
            concurrent++; maxConcurrent = Math.max(maxConcurrent, concurrent);
            setTimeout(() => { concurrent--; res(v); }, ms);
        });

        const tasks = [
            makeTracked(1, 30), // batch1
            makeTracked(2, 20), // batch1
            makeTracked(3, 10), // batch2
            makeTracked(4, 5),  // batch2
        ];

        const r = await run(tasks);
        expect(r).toEqual([1, 2, 3, 4]);   // 입력 순서 보존
        expect(maxConcurrent).toBeLessThanOrEqual(2); // 동시 실행 상한
    });

    it("작업 하나라도 실패 시 reject", async () => {
        const run = withConcurrency(2);
        const tasks = [
            task(1, 5),
            () => Promise.reject(new Error("boom")),
            task(3, 5),
        ];
        await expect(run(tasks)).rejects.toThrow("boom");
    });
});