/*
* 类型判断
* */

export function isFunc(func) {
    return typeof func === 'function';
}

export function isString(string) {
    return typeof string === 'string';
}

export function isNumber(number) {
    return typeof number === 'number';
}

export function isUndef(v) {
    return v === undefined || v === null;
}

export function isDef(v) {
    return v !== undefined && v !== null;
}

export function isTrue(v) {
    return v === true;
}

export function isFalse(v) {
    return v === false;
}

export function isPrimitiveTypes(value) {
    return (typeof value === 'string' ||
        typeof value === 'number' ||
        // $flow-disable-line
        typeof value === 'symbol' ||
        typeof value === 'boolean');
}

export function getStyle(ele, attr) {
    return getComputedStyle(ele)[attr];
}

export function getStyles(ele) {
    return getComputedStyle(ele);
}

export const themeMapping = new Map({
    [Symbol.iterator]: function* () {
        yield ['buble', '#0074D9'];
        yield ['dark', '#EA6F5A'];
        yield ['vue', '#42B983'];
        yield ['dolphin', '#00FFFF'];
    }
})