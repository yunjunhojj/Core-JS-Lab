import { describe, it, expect } from "vitest";
import { promiseAllSettled } from "./promiseAllSettled";

describe("promiseAllSettled", () => {
    it("모든 결과를 status와 함께 반환", async () => {
        const res = await promiseAllSettled([1, Promise.resolve(2), Promise.reject("e")]);
        expect(res).toEqual([
            { status: "fulfilled", value: 1 },
            { status: "fulfilled", value: 2 },
            { status: "rejected", reason: "e" },
        ]);
    });

    it("순서 보존", async () => {
        const res = await promiseAllSettled([Promise.reject("a"), Promise.resolve("b")]);
        expect(res[0].status).toBe("rejected");
        expect(res[1].status).toBe("fulfilled");
    });

    it("빈 입력 → []", async () => {
        await expect(promiseAllSettled([])).resolves.toEqual([]);
    });
});