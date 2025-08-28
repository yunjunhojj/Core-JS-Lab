import { describe, it, expect } from "vitest";
import { reduceRight } from "./reduceRight";

describe("reduceRight", () => {
    it("오른쪽부터 합산", () => {
        const r = reduceRight([1, 2, 3], (acc, cur) => acc - cur, 0);
        // (((0 - 3) - 2) - 1) = -6
        expect(r).toBe(-6);
    });

    it("초기값 없을 때 마지막 요소를 acc로 사용", () => {
        const r = reduceRight([1, 2, 3], (acc: number, cur: number) => acc - cur);
        // ((3 - 2) - 1) = 0
        expect(r).toBe(0);
    });

    it("빈 배열 + 초기값 없음 → TypeError", () => {
        // @ts-expect-error
        expect(() => reduceRight([], (a, c) => a)).toThrow(TypeError);
    });

    it("sparse array 건너뛰기", () => {
        const a = [1, , 3] as number[];
        const r = reduceRight(a, (acc: number, cur: number) => acc + cur, 0);
        expect(r).toBe(4);
    });
});