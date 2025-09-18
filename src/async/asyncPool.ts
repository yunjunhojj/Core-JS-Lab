export async function asyncPool<I, O>(
    limit: number,
    items: Iterable<I>,
    mapper: (item: I) => Promise<O>
): Promise<O[]> {
    return;
}