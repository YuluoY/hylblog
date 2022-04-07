import { isFunc, isString } from './core.js';
/*
* 创建节点
* */
export function createScriptTag(src, options = {}) {
    const script = document.createElement('script');
    script.src = src;
    for (const o in options) {
        script[o] = options[o];
    }
    return script;
}
export function createLinkTag(href, rel = 'stylesheet', options = {}) {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    for (const o in options) {
        link[o] = options[o];
    }
    return link;
}
export function createNode(tagName = 'span', options = {}) {
    const tag = document.createElement(tagName);
    for (const o in options) {
        tag[o] = options[o];
    }
    return tag;
}
export function createVueComponent(componentName, options = {}) {
    window['$docsify'] = window['$docsify'] || {};
    if (Object.keys(window['$docsify']).length) {
        console.error(`The $docsify variable is not define in the window ! From util package's dom file createVueComponent function of Error！`);
    }
    return window['$docsify'].vueCpmopnents[componentName] = options;
}
/*
* 查找节点
* */
export function find(selectors, callback) {
    let ele = null;
    if (isString(selectors)) {
        ele = document.querySelector(selectors);
        isFunc(callback) && callback(ele);
    }
    return ele;
}
export function findAll(selectors, callback) {
    let eleAll = null;
    if (selectors.length) {
    }
}
