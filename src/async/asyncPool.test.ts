import { describe, it, expect } from "vitest";
import { asyncPool } from "./asyncPool";

const sleep = <T>(v: T, ms: number) =>
    new Promise<T>(resolve => setTimeout(() => resolve(v), ms));

describe("asyncPool", () => {
    it("limit 이하 동시 처리 + 순서 보존", async () => {
        const items = [1, 2, 3, 4, 5];
        let concurrent = 0, maxConcurrent = 0;

        const mapper = async (x: number) => {
            concurrent++; maxConcurrent = Math.max(maxConcurrent, concurrent);
            const r = await sleep(x * 10, 10 + (6 - x) * 2);
            concurrent--;
            return r;
        };

        const out = await asyncPool(2, items, mapper);
        expect(out).toEqual([10, 20, 30, 40, 50]);
        expect(maxConcurrent).toBeLessThanOrEqual(2);
    });
});