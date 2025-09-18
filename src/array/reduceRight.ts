export function reduceRight<T, U>(
    arr: T[],
    cb: (acc: U, cur: T, idx: number, src: T[]) => U,
    initial?: U
): U {
    if (!Array.isArray(arr)) throw new TypeError("Expected array");
    const len = arr.length;
    let i = len - 1;
    let acc: U;

    if (arguments.length >= 3) {
        acc = initial as U;
    } else {
        while (i >= 0 && !(i in arr)) i--;
        if (i < 0) throw new TypeError("empty array with no initial value");
        acc = arr[i] as unknown as U;
        i--;
    }

    for (; i >= 0; i--) {
        if (!(i in arr)) continue;
        acc = cb(acc, arr[i], i, arr);
    }
    return acc;
}