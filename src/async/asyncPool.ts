// for example
// const urls = ["/a", "/b", "/c"];
// const results = await asyncPool(2, urls, async (u) => {
//   const r = await fetch(u);
//   return r.text();
// });
// 동시에 2개만 fetch 실행, 결과는 [a, b, c] 순서대로 반환

export async function asyncPool<I, O>(
    limit: number,
    items: Iterable<I>,
    mapper: (item: I, index: number) => Promise<O>
): Promise<O[]> {
    if (!Number.isInteger(limit) || limit <= 0) {
        throw new RangeError("limit must be a positive integer");
    }

    const arr = Array.from(items);
    const n = arr.length;
    if (n === 0) return [];

    const results: O[] = new Array(n);
    let next = 0; // 다음 실행할 작업 인덱스
    let active = 0; // 현재 실행 중 개수
    let done = 0; // 완료된 개수

    return new Promise<O[]>((resolve, reject) => {
        const launch = () => {
            while (active < limit && next < n) {
                const idx = next++;
                active++;

                mapper(arr[idx], idx)
                    .then(
                        (v) => {
                            results[idx] = v;
                            done++;
                        })
                    .catch(
                        (e) => {
                            reject(e);
                        })
                    .finally(() => {
                        active--;
                        if (done === n) {
                            resolve(results);
                        } else if (next < n) {
                            launch();
                        }
                    });
            }
        };

        launch();
    });
}