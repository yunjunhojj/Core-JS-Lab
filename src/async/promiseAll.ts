export function promiseAll<T>(iter: Iterable<T | Promise<T>>): Promise<T[]> {
    const items = Array.from(iter);
    if (items.length === 0) return Promise.resolve([]);

    return new Promise<T[]>((resolve, reject) => {
        const out: T[] = new Array(items.length);
        let remaining = items.length;

        items.forEach((item, i) => {
            Promise.resolve(item).then(
                (v) => {
                    out[i] = v;
                    remaining--;
                    if (remaining === 0) resolve(out);
                },
                reject // 하나라도 실패하면 즉시 reject
            );
        });
    });
}