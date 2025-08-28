import { describe, it, expect } from "vitest";
import { flat } from "./flat";

describe("flat", () => {
    it("기본 depth=1 flatten", () => {
        const r = flat([1, [2, 3], [4, [5]]]);
        expect(r).toEqual([1, 2, 3, 4, [5]]);
    });

    it("depth=2 flatten", () => {
        const r = flat([1, [2, 3], [4, [5]]], 2);
        expect(r).toEqual([1, 2, 3, 4, 5]);
    });

    it("depth=0이면 원본 유지", () => {
        const r = flat([1, [2, [3]]], 0);
        expect(r).toEqual([1, [2, [3]]]);
    });

    it("sparse array: 구멍은 무시", () => {
        const a = [1, , [2, , 3]] as any[];
        const r = flat(a, 2);
        expect(r).toEqual([1, 2, 3]);
    });
});