// src/array/map.ts
export function map<T, U>(
    arr: T[],
    cb: (value: T, index: number, array: T[]) => U,
    thisArg?: unknown
): U[] {
    if (!Array.isArray(arr)) throw new TypeError("Expected array");
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        // if (typeof arr[i] !== "undefined") {
        // if (arr[i] !== undefined) {
        if (i in arr) {
            result[i] = cb.call(thisArg, arr[i], i, arr);
        }
    }

    return result;
}


// cb.call 로 호출하는 이유는 무엇일까?

/*

1. 그냥 cb(...) 호출과 cb.call(...) 호출의 차이
• cb(...)
→ 단순히 콜백을 실행. 이때 this는 기본적으로 undefined (strict mode)거나 전역 객체(window/global, non-strict mode)로 바인딩됨.

• cb.call(thisArg, ...)
→ 첫 번째 인자로 this 바인딩을 강제로 지정할 수 있음.
즉, 배열 메서드들이 제공하는 thisArg 기능을 재현하려면 call을 써야 함.

*/