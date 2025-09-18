export type Settled<T> = { status: "fulfilled"; value: T } | { status: "rejected"; reason: any };
export function promiseAllSettled<T>(iter: Iterable<T | Promise<T>>): Promise<Settled<T>[]> {
    return;
}