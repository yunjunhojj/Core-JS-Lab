export function flat<T>(arr: T[], depth: number = 1): T[] {
    if (!Array.isArray(arr)) throw new TypeError("Expected array");
    if (depth < 0) throw new RangeError("depth must be >= 0");

    const result: T[] = [];

    const flatten = (input: T[], d: number) => {
        for (let i = 0; i < input.length; i++) {
            if (!(i in input)) continue; // sparse array 처리
            const val = input[i];
            if (Array.isArray(val) && d > 0) { // 배열이고 depth가 0보다 크면 재귀 호출
                flatten(val, d - 1);
            } else {
                result.push(val); // 배열이 아니면 결과 배열에 추가
            }
        }
    }

    flatten(arr, depth);

    return result;
}