import { flat } from "./flat";

export function flatMap<T, U>(
    arr: T[],
    cb: (value: T, index: number, array: T[]) => U | U[],
    thisArg?: unknown
): U[] {
    if (!Array.isArray(arr)) throw new TypeError("Expected array");
    const mapped = arr.map((v, i, a) => cb.call(thisArg, v, i, a));
    return flat(mapped as (U | U[])[], 1) as U[];
}