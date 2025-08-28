import { flat } from "./flat";

export function flatMap<T, U>(
    arr: T[],
    cb: (value: T, index: number, array: T[]) => U,
    thisArg?: unknown
): U[] {
    return [] as U[];
}