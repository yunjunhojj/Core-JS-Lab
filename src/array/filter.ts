export function filter<T>(
    arr: T[],
    cb: (value: T, index: number, array: T[]) => unknown,
    thisArg?: unknown
): T[] {
    if (!Array.isArray(arr)) throw new TypeError("Expected array");
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        if (i in arr) {
            if (cb.call(thisArg, arr[i], i, arr)) result.push(arr[i]);
        }
    }

    return result;
}