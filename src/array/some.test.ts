import { describe, it, expect, vi } from "vitest";
import { some } from "./some";

describe("some", () => {
    it("하나라도 만족하면 true", () => {
        const r = some([1, 2, 3], (x) => x > 2);
        expect(r).toBe(true);
    });

    it("모두 불만족이면 false", () => {
        const r = some([1, 2, 3], (x) => x > 5);
        expect(r).toBe(false);
    });

    it("thisArg 처리", () => {
        const ctx = { min: 4 };
        const r = some([1, 2, 3, 4], function (this: any, x) {
            return x >= this.min;
        }, ctx);
        expect(r).toBe(true);
    });

    it("sparse array: 구멍은 건너뛰고, 단락 평가 작동", () => {
        const a = [, 2, , 10] as number[];
        const spy = vi.fn((x: number) => x > 5);
        const r = some(a, spy);
        expect(r).toBe(true);
        // 호출은 실제 요소(2,10)까지만, 그리고 10에서 true가 나오는 순간 중단
        expect(spy).toHaveBeenCalledTimes(2);
    });

    it("배열이 아니면 TypeError", () => {
        expect(() => some("not array" as any, () => true)).toThrow(TypeError);
    });
});