import { describe, it, expect, vi } from "vitest";
import { every } from "./every";

describe("every", () => {
    it("모두 만족하면 true", () => {
        const r = every([2, 4, 6], (x) => x % 2 === 0);
        expect(r).toBe(true);
    });

    it("하나라도 불만족이면 false(단락 평가)", () => {
        const spy = vi.fn((x: number) => x < 5);
        const r = every([1, 2, 6, 3], spy);
        expect(r).toBe(false);
        // 6에서 false가 되면 이후 요소는 검사하지 않음
        expect(spy).toHaveBeenCalledTimes(3);
    });

    it("thisArg 처리", () => {
        const ctx = { max: 10 };
        const r = every([1, 5, 9], function (this: any, x) {
            return x <= this.max;
        }, ctx);
        expect(r).toBe(true);
    });

    it("sparse array: 구멍은 건너뛰고 판단", () => {
        const a = [, 2, , 4] as number[];
        const r = every(a, (x) => x % 2 === 0);
        expect(r).toBe(true);
    });

    it("배열이 아니면 TypeError", () => {
        expect(() => every(123 as any, () => true)).toThrow(TypeError);
    });
});