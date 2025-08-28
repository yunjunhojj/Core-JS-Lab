export function reduceRight<T, U>(
    arr: T[],
    cb: (acc: U, cur: T, idx: number, src: T[]) => U,
    initial?: U
): U {
    return 0 as U;
}