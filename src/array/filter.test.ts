import { describe, it, expect, vi } from "vitest";
import { filter } from "./filter";

describe("filter", () => {
    it("기본 필터링", () => {
        const res = filter([1, 2, 3, 4], (x) => x % 2 === 0);
        expect(res).toEqual([2, 4]);
    });

    it("thisArg 처리", () => {
        const ctx = { max: 3 };
        const res = filter([1, 2, 3, 4], function (this: any, x) {
            return x <= this.max;
        }, ctx);
        expect(res).toEqual([1, 2, 3]);
    });

    it("sparse array: 구멍은 건너뛴다(콜백 호출 안 함)", () => {
        const a = [1, , 3, , 5] as number[];
        const spy = vi.fn((x: number) => x % 2 === 1);
        const res = filter(a, spy);
        expect(res).toEqual([1, 3, 5]);
        // 콜백 호출 횟수는 실제 존재하는 요소 개수만큼
        expect(spy).toHaveBeenCalledTimes(3);
    });

    it("원본 불변", () => {
        const a = [1, 2, 3];
        const _ = filter(a, (x) => x > 1);
        expect(a).toEqual([1, 2, 3]);
    });

    it("배열이 아니면 TypeError", () => {
        // @ts-expect-error
        expect(() => filter(null, () => true)).toThrow(TypeError);
    });
});