export function some<T>(
    arr: T[],
    cb: (value: T, index: number, array: T[]) => unknown,
    thisArg?: unknown
): boolean {
    if (!Array.isArray(arr)) throw new TypeError("Expected array");
    for (let i = 0; i < arr.length; i++) {
        if (i in arr) {
            if (cb.call(thisArg, arr[i], i, arr)) return true;
        }
    }

    return false;
}