import { describe, it, expect, vi } from "vitest";
import { flatMap } from "./flatMap";

describe("flatMap", () => {
    it("map 후 1단계 flatten", () => {
        const r = flatMap([1, 2, 3], (x) => [x, x * 2]);
        expect(r).toEqual([1, 2, 2, 4, 3, 6]);
    });

    it("thisArg 적용", () => {
        const ctx = { mul: 3 };
        const r = flatMap([1, 2], function (this: typeof ctx, x: number) {
            return x * this.mul;
        }, ctx);
        expect(r).toEqual([3, 6]);
    });

    it("map 결과가 배열이 아닐 경우도 flatten", () => {
        const r = flatMap([1, 2, 3], (x) => x * 2);
        expect(r).toEqual([2, 4, 6]);
    });

    it("sparse array: 구멍은 건너뛰고 호출", () => {
        const a = [, 2, , 4] as number[];
        const spy = vi.fn((x: number) => x * 2);
        const r = flatMap(a, spy);
        expect(r).toEqual([4, 8]);
        expect(spy).toHaveBeenCalledTimes(2);
    });





});