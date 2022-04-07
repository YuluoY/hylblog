/*
* 类型判断
* */
export function isMobile() {
    const u = navigator.userAgent;
    return (
        (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) ||
        (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))
    )
}

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
    return v === undefined || v === null
}

export function isDef(v) {
    return v !== undefined && v !== null
}

export function isTrue(v) {
    return v === true
}

export function isFalse(v) {
    return v === false
}

export function isPrimitiveTypes(value) {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        // $flow-disable-line
        typeof value === 'symbol' ||
        typeof value === 'boolean'
    )
}