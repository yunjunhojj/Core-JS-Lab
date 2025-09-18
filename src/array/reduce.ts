export function reduce<T, U>(
    arr: T[],
    cb: (acc: U, cur: T, idx: number, src: T[]) => U,
    initial?: U
): U {
    if (!Array.isArray(arr)) throw new TypeError("Expected array");
    // const len = arr.length >>> 0; // 정수 만들어주는 비트 연산
    const len = arr.length;
    let i = 0; // 인덱스
    let acc: U; // 누산값

    // 초기값이 있으면 초기값을 사용
    // arguments는 자바스크립트의 함수 안에서 자동으로 제공되는 유사 배열 객체
    // arguments.length는 함수가 실제로 호출될 때 전달된 인자의 개수
    // 여기서 중요한 건 initial 파라미터의 존재 여부를 체크하기 위해 쓰임 => initial에 undefined가 들어오는 경우를 체크하기 위해
    if (arguments.length >= 3) {
        acc = initial as U;
    } else {
        // 초기값이 없으면 첫 번째 요소를 사용
        while (i < len && !(i in arr)) i++;
        if (i >= len) throw new TypeError("empty array with no initial value");
        acc = arr[i] as unknown as U;
        i++;
    }

    for (; i < len; i++) {
        if (!(i in arr)) continue;
        acc = cb(acc, arr[i], i, arr);
    }
    return acc;
}