// src/array/map.test.ts
import { describe, it, expect } from "vitest";
import { map } from "./map";

describe("map", () => {
    it("기본 변환", () => {
        expect(map([1, 2, 3], x => x * 2)).toEqual([2, 4, 6]);
    });
    it("thisArg 처리", () => {
        const ctx = { mul: 3 };
        const res = map([1, 2], function (this: typeof ctx, x) { return x * this.mul; }, ctx);
        expect(res).toEqual([3, 6]);
    });
    it("sparse array 보존", () => {
        const a = [1, , 3] as number[];
        const r = map(a, x => (x ?? 0) + 1);
        expect(1 in r).toBe(false);
    });
    it("배열이 아니면 에러", () => {
        // @ts-expect-error
        expect(() => map(null, x => x)).toThrow(TypeError);
    });
});