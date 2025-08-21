import { describe, it, expect, vi } from "vitest";
import { reduce } from "./reduce";

describe("reduce", () => {
    it("초기값이 있을 때 합계 계산", () => {
        const sum = reduce([1, 2, 3], (acc: number, cur) => acc + cur, 0);
        expect(sum).toBe(6);
    });

    it("초기값 없이 동작(첫 유효 요소를 초기 acc로 사용)", () => {
        const sum = reduce([1, 2, 3], (acc: number, cur) => acc + cur);
        expect(sum).toBe(6);
    });

    it("빈 배열 + 초기값 없음 → TypeError", () => {
        expect(() => reduce([], (a: number, c: number) => a + c)).toThrow(TypeError);
    });

    it("배열이 아니면 TypeError", () => {
        expect(() => reduce(null as any, (a: number, c: number) => a + c, 0)).toThrow(TypeError);
    });

    it("sparse array: 구멍은 건너뛰고 존재하는 요소만 콜백", () => {
        const a = [, 2, , 4] as number[];
        const spy = vi.fn((acc: number, cur: number) => acc + cur);
        const res = reduce(a, spy, 0);
        expect(res).toBe(6);
        // 실제 요소는 2개(2,4)
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenNthCalledWith(1, 0, 2, 1, a);
        expect(spy).toHaveBeenNthCalledWith(2, 2, 4, 3, a);
    });

    it("초기값 없이 sparse 시작 시, 첫 유효 요소를 acc로 선택", () => {
        const a = [, , 5, 7] as number[];
        const spy = vi.fn((acc: number, cur: number) => acc + cur);
        const res = reduce(a, spy);
        // acc = 5로 시작, 이후 7만 콜백
        expect(res).toBe(12);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(5, 7, 3, a);
    });

    it("객체 누산 패턴", () => {
        const users = [
            { id: 1, name: "A" },
            { id: 2, name: "B" },
        ];
        const mapById = reduce(users, (acc: Record<number, string>, u) => {
            acc[u.id] = u.name;
            return acc;
        }, {} as Record<number, string>);
        expect(mapById).toEqual({ 1: "A", 2: "B" });
    });

    it("콜백이 반환하는 acc를 매 단계에 전달", () => {
        const steps: number[] = [];
        const r = reduce([1, 2, 3], (acc: number, cur) => {
            const next = acc * 10 + cur;
            steps.push(next);
            return next;
        }, 0);
        expect(r).toBe(123);
        expect(steps).toEqual([1, 12, 123]);
    });
});