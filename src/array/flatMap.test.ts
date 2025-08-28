import { describe, it, expect } from "vitest";
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
});