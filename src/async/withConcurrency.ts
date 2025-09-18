export function withConcurrency(limit: number) {
    return async function run<T>(tasks: Array<() => Promise<T>>): Promise<T[]> {
        return;
    }
}