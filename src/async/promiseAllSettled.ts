export type Settled<T> =
    | { status: "fulfilled"; value: T }
    | { status: "rejected"; reason: any };

export function promiseAllSettled<T>(
    iter: Iterable<T | Promise<T>>
): Promise<Settled<T>[]> {
    const items = Array.from(iter);
    if (items.length === 0) return Promise.resolve([]);

    return new Promise<Settled<T>[]>((resolve) => {
        const out: Settled<T>[] = new Array(items.length);
        let remaining = items.length;

        items.forEach((item, i) => {
            Promise.resolve(item).then(
                (v) => {
                    out[i] = { status: "fulfilled", value: v };
                    remaining--;
                    if (remaining === 0) resolve(out);
                },
                (e) => {
                    out[i] = { status: "rejected", reason: e };
                    remaining--;
                    if (remaining === 0) resolve(out);
                }
            );
        });
    });
}