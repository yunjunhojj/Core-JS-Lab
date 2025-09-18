import { describe, it, expect } from "vitest";
import { promiseAll } from "./promiseAll";

const sleep = <T>(v: T, ms: number) =>
    new Promise<T>(resolve => setTimeout(() => resolve(v), ms));

describe("promiseAll", () => {
    it("순서 보존", async () => {
        const r = await promiseAll([sleep(1, 30), sleep(2, 10), 3]);
        expect(r).toEqual([1, 2, 3]);
    });

    it("하나라도 reject면 전체 reject", async () => {
        await expect(
            promiseAll([Promise.resolve(1), Promise.reject("X")])
        ).rejects.toBe("X");
    });

    it("빈 iterable → 즉시 []", async () => {
        await expect(promiseAll([])).resolves.toEqual([]);
    });
});