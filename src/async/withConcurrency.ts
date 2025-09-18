// for example
// const run = withConcurrency(2);
// const tasks = [
//   () => fetch("/api/a").then(r => r.json()),
//   () => fetch("/api/b").then(r => r.json()),
//   () => fetch("/api/c").then(r => r.json()),
// ];
// const results = await run(tasks);
// // results: [aResult, bResult, cResult]

export function withConcurrency(limit: number) {
    if (!Number.isInteger(limit) || limit <= 0) {
        throw new RangeError("limit must be a positive integer");
    }

    return function run<T>(tasks: Array<() => Promise<T>>): Promise<T[]> {
        const n = tasks.length;
        if (n === 0) return Promise.resolve([]);

        const results: T[] = new Array(n);
        let next = 0;           // 다음 실행할 작업 인덱스
        let active = 0;         // 현재 실행 중 개수
        let done = 0;           // 완료된 개수
        let rejected = false;

        return new Promise<T[]>((resolve, reject) => {
            const launch = () => {
                if (rejected) return;

                while (active < limit && next < n) {
                    const cur = next++;
                    active++;

                    tasks[cur]().then(
                        (v) => {
                            results[cur] = v;
                            done++;
                        },
                        (e) => {
                            rejected = true;
                            reject(e);
                        }
                    ).finally(() => {
                        active--;
                        if (rejected) return;
                        if (done === n) {
                            resolve(results);
                        } else {
                            launch(); // 다음 작업 투입
                        }
                    });
                }
            };

            launch();
        });
    };
}