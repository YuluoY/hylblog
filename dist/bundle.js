/******/
(() => { // webpackBootstrap
    /******/
    "use strict";
    /******/
    var __webpack_modules__ = ([
        /* 0 */,
        /* 1 */
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__);
            /* harmony import */
            var _init_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
            /* harmony import */
            var _util_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);


            const $validOptions = {
                name: ''
            }


            window.$valid = window.$valid || $validOptions;

            /***/
        }),
        /* 2 */
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__);
            /* harmony export */
            __webpack_require__.d(__webpack_exports__, {
                /* harmony export */
                "init": () => (/* reexport module object */ _init_js__WEBPACK_IMPORTED_MODULE_0__),
                /* harmony export */
                "template": () => (/* reexport module object */ _template_js__WEBPACK_IMPORTED_MODULE_1__)
                /* harmony export */
            });
            /* harmony import */
            var _init_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
            /* harmony import */
            var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);


            /***/
        }),
        /* 3 */
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__);
            /* harmony export */
            __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "backToTop": () => (/* binding */ backToTop),
                /* harmony export */   "changeThemeBox": () => (/* binding */ changeThemeBox)
                /* harmony export */
            });
            /* harmony import */
            var _util_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
            /* harmony import */
            var _util_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
            /* harmony import */
            var _util_core_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
            /* harmony import */
            var _template_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);


            /* back to top function */
            const backToTop = (0, _util_dom_js__WEBPACK_IMPORTED_MODULE_0__.createNode)('div', {
                className: 'backToTop',
                innerHTML: `
        <button onclick="scrollBar('top')">TOP</button>
    `,
            });


// region Realization of cover page decoration function
// 1、Theme change Box
            const changeThemeBox = (0, _util_dom_js__WEBPACK_IMPORTED_MODULE_0__.createNode)('div', {
                className: 'themeBox',
                innerHTML: _template_js__WEBPACK_IMPORTED_MODULE_3__.changeThemeBox(_util_core_js__WEBPACK_IMPORTED_MODULE_2__.themeMapping.get(localStorage.getItem('vaild-theme') || 'vue')),
            })


// endregion


            /***/
        }),
        /* 4 */
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__);
            /* harmony export */
            __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "createLinkTag": () => (/* binding */ createLinkTag),
                /* harmony export */   "createNode": () => (/* binding */ createNode),
                /* harmony export */   "createScriptTag": () => (/* binding */ createScriptTag),
                /* harmony export */   "createVueComponent": () => (/* binding */ createVueComponent),
                /* harmony export */   "find": () => (/* binding */ find),
                /* harmony export */   "findAll": () => (/* binding */ findAll)
                /* harmony export */
            });
            /* harmony import */
            var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


            /*
            * 创建节点
            * */
            function createScriptTag(src, options = {}) {
                const script = document.createElement('script');
                script.src = src;
                for (const o in options) {
                    script[o] = options[o];
                }
                return script;
            }

            function createLinkTag(href, rel = 'stylesheet', options = {}) {
                const link = document.createElement('link');
                link.rel = rel;
                link.href = href;
                for (const o in options) {
                    link[o] = options[o];
                }
                return link;
            }

            function createNode(tagName = 'span', options = {}) {
                const tag = document.createElement(tagName);
                for (const o in options) {
                    tag[o] = options[o];
                }
                return tag;
            }

            function createVueComponent(componentName, options = {}) {
                window.$docsify = window.$docsify || {};
                if (Object.keys(window.$docsify).length) {
                    console.error(`The $docsify variable is not define in the window ! From util package's dom file createVueComponent function of Error！`)
                }
                return window.$docsify.vueComponents[componentName] = options;
            }

            /*
            * 查找节点
            * */
            function find(selectors, callback) {
                let ele = null;
                if ((0, _core_js__WEBPACK_IMPORTED_MODULE_0__.isString)(selectors)) {
                    ele = document.querySelector(selectors);
                    (0, _core_js__WEBPACK_IMPORTED_MODULE_0__.isFunc)(callback) && callback(ele);
                }
                return ele;
            }

            function findAll(selectors, callback) {
                let eleAll = null;
                if (selectors.length) {
                    eleAll = document.querySelectorAll(selectors);
                    (0, _core_js__WEBPACK_IMPORTED_MODULE_0__.isFunc)(callback) && callback(eleAll);
                }
                return eleAll;
            }

            /***/
        }),
        /* 5 */
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__);
            /* harmony export */
            __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "getStyle": () => (/* binding */ getStyle),
                /* harmony export */   "getStyles": () => (/* binding */ getStyles),
                /* harmony export */   "isDef": () => (/* binding */ isDef),
                /* harmony export */   "isFalse": () => (/* binding */ isFalse),
                /* harmony export */   "isFunc": () => (/* binding */ isFunc),
                /* harmony export */   "isNumber": () => (/* binding */ isNumber),
                /* harmony export */   "isPrimitiveTypes": () => (/* binding */ isPrimitiveTypes),
                /* harmony export */   "isString": () => (/* binding */ isString),
                /* harmony export */   "isTrue": () => (/* binding */ isTrue),
                /* harmony export */   "isUndef": () => (/* binding */ isUndef),
                /* harmony export */   "themeMapping": () => (/* binding */ themeMapping)
                /* harmony export */
            });

            /*
            * 类型判断
            * */

            function isFunc(func) {
                return typeof func === 'function';
            }

            function isString(string) {
                return typeof string === 'string';
            }

            function isNumber(number) {
                return typeof number === 'number';
            }

            function isUndef(v) {
                return v === undefined || v === null;
            }

            function isDef(v) {
                return v !== undefined && v !== null;
            }

            function isTrue(v) {
                return v === true;
            }

            function isFalse(v) {
                return v === false;
            }

            function isPrimitiveTypes(value) {
                return (typeof value === 'string' ||
                    typeof value === 'number' ||
                    // $flow-disable-line
                    typeof value === 'symbol' ||
                    typeof value === 'boolean');
            }

            function getStyle(ele, attr) {
                return getComputedStyle(ele)[attr];
            }

            function getStyles(ele) {
                return getComputedStyle(ele);
            }

            const themeMapping = new Map({
                [Symbol.iterator]: function* () {
                    yield ['buble', '#0074D9'];
                    yield ['dark', '#EA6F5A'];
                    yield ['vue', '#42B983'];
                    yield ['dolphin', '#00FFFF'];
                }
            })

            /***/
        }),
        /* 6 */
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__);
            /* harmony export */
            __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "eleOpacityChange": () => (/* binding */ eleOpacityChange),
                /* harmony export */   "scrollBar": () => (/* binding */ scrollBar)
                /* harmony export */
            });
            /* harmony import */
            var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


            function scrollBar(direction, speed = 5, event = {}) {
                const section = document.querySelector('section');
                let sectionHeight = parseInt(getComputedStyle(section).height) - scrollY;
                clearInterval(this.time);
                if (direction === 'top') {
                    scrollBy(0, -scrollY)
                } else if (direction === 'bottom') {
                    scrollBy(0, sectionHeight)
                }
            }

            /*
            * @param: {ele} afferent an element node, for change it opacity transformation.
            * @param: {speed} represent opacity transformation speed.
            * pay attention to the element node must existence display attribution !
            * */
            function eleOpacityChange(ele, speed) {
                clearInterval(this.timer);

                let opacity = null;
                const display = (0, _core_js__WEBPACK_IMPORTED_MODULE_0__.getStyle)(ele, 'display');

                if (display === 'none') {
                    opacity = 0.1;
                } else if (display === 'block' || display === 'inline-block') {
                    opacity = 1;
                } else {
                    console.error('The element not display attr ! The error comes from the eleOpacityChange function of event file !');
                    return ele;
                }

                if (opacity === 0.1) {
                    ele.style.display = 'block';
                    this.timer = setInterval(() => {
                        if (opacity >= 1) {
                            clearInterval(this.timer);
                        }
                        opacity += 0.1;
                        ele.style.opacity = opacity;
                    }, speed)
                } else if (opacity === 1) {
                    this.timer = setInterval(() => {
                        if (opacity <= 0) {
                            clearInterval(this.timer);
                            clearTimeout(this.timer2);
                            this.timer2 = setTimeout(() => {
                                ele.style.display = 'none';
                            }, 500)
                        }
                        opacity -= 0.1;
                        ele.style.opacity = opacity;
                    }, speed)
                }
            }

            /***/
        }),
        /* 7 */
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__);
            /* harmony export */
            __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "changeThemeBox": () => (/* binding */ changeThemeBox)
                /* harmony export */
            });

            function changeThemeBox(theme) {
                return (`
        <div class="themeBoxInner">
            <input type="button" value="buble" onclick="utils.changeTheme(value)">
            <input type="button" value="dark" onclick="utils.changeTheme(value)">
            <input type="button" value="vue" onclick="utils.changeTheme(value)">
            <input type="button" value="dolphin" onclick="utils.changeTheme(value)">
        </div>
        <i id="themeIcon" style="color: ${theme}; transition: 1s;" class="iconfont icon-43_zhuti"></i>
    `)
            }

            /***/
        }),
        /* 8 */
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__);
            /* harmony export */
            __webpack_require__.d(__webpack_exports__, {
                /* harmony export */
                "core": () => (/* reexport module object */ _core_js__WEBPACK_IMPORTED_MODULE_0__),
                /* harmony export */
                "dom": () => (/* reexport module object */ _dom_js__WEBPACK_IMPORTED_MODULE_1__),
                /* harmony export */
                "env": () => (/* reexport module object */ _env_js__WEBPACK_IMPORTED_MODULE_3__),
                /* harmony export */
                "event": () => (/* reexport module object */ _event_js__WEBPACK_IMPORTED_MODULE_2__)
                /* harmony export */
            });
            /* harmony import */
            var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
            /* harmony import */
            var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
            /* harmony import */
            var _event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
            /* harmony import */
            var _env_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);


            /***/
        }),
        /* 9 */
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__);
            /* harmony export */
            __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   "isIos": () => (/* binding */ isIos),
                /* harmony export */   "isMobile": () => (/* binding */ isMobile),
                /* harmony export */   "isPC": () => (/* binding */ isPC),
                /* harmony export */   "isQQBrowser": () => (/* binding */ isQQBrowser)
                /* harmony export */
            });

            function isQQBrowser(navigator) {
                const ua = navigator.userAgent;
                return !!ua.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i)
            }

            function isMobile(navigator) {
                const u = navigator.userAgent;
                return ((u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) ||
                    (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)));
            }

            function isIos(navigator) {
                const ua = navigator.userAgent;
                if (ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) {
                    // 安卓手机
                    return false
                } else if (ua.indexOf('iPhone') > -1) {
                    // 苹果手机
                    return true
                } else if (ua.indexOf('iPad') > -1) {
                    // iPad
                    return false
                } else if (ua.indexOf('Windows Phone') > -1) {
                    //winphone手机
                    return false
                } else {
                    return false
                }
            }

            function isPC(navigator) {
                const ua = navigator.userAgent;
                const Agents = ["Android", "iPhone",
                    "SymbianOS", "Windows Phone",
                    "iPad", "iPod"];
                let flag = true;
                for (let v = 0; v < Agents.length; v++) {
                    if (ua.indexOf(Agents[v]) > 0) {
                        flag = false;
                        break;
                    }
                }
                return flag;
            }

            /***/
        })
        /******/]);
    /************************************************************************/
    /******/ 	// The module cache
    /******/
    var __webpack_module_cache__ = {};
    /******/
    /******/ 	// The require function
    /******/
    function __webpack_require__(moduleId) {
        /******/ 		// Check if module is in cache
        /******/
        var cachedModule = __webpack_module_cache__[moduleId];
        /******/
        if (cachedModule !== undefined) {
            /******/
            return cachedModule.exports;
            /******/
        }
        /******/ 		// Create a new module (and put it into the cache)
        /******/
        var module = __webpack_module_cache__[moduleId] = {
            /******/ 			// no module.id needed
            /******/ 			// no module.loaded needed
            /******/            exports: {}
            /******/
        };
        /******/
        /******/ 		// Execute the module function
        /******/
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        /******/
        /******/ 		// Return the exports of the module
        /******/
        return module.exports;
        /******/
    }

    /******/
    /************************************************************************/
    /******/ 	/* webpack/runtime/define property getters */
    /******/
    (() => {
        /******/ 		// define getter functions for harmony exports
        /******/
        __webpack_require__.d = (exports, definition) => {
            /******/
            for (var key in definition) {
                /******/
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    /******/
                    Object.defineProperty(exports, key, {enumerable: true, get: definition[key]});
                    /******/
                }
                /******/
            }
            /******/
        };
        /******/
    })();
    /******/
    /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
    /******/
    (() => {
        /******/
        __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
        /******/
    })();
    /******/
    /******/ 	/* webpack/runtime/make namespace object */
    /******/
    (() => {
        /******/ 		// define __esModule on exports
        /******/
        __webpack_require__.r = (exports) => {
            /******/
            if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                /******/
                Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
                /******/
            }
            /******/
            Object.defineProperty(exports, '__esModule', {value: true});
            /******/
        };
        /******/
    })();
    /******/
    /************************************************************************/
    var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
    (() => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */
        var _src_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

    })();

    /******/
})()
;