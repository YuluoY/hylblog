import * as init from "./init/index.js";
import * as util from "./util/index.js";


window.$valid = window.$valid || {};
window.$valid.init = init;
window.$valid.util = util;


/* back to top function */
export const backToTop = util.dom.createNode('div', {
    className: 'backToTop',
    innerHTML: `<button onclick="util.event.scrollBar('top')">TOP</button>`,
});


// region Realization of cover page decoration function
// 1、Theme change Box
export const changeThemeBox = util.dom.createNode('div', {
    className: 'themeBox',
    innerHTML: init.template.changeThemeBox(util.core.themeMapping.get(window.$valid.defaultOptions.themeStyle)),
    onclick: function () {
        const themeBoxInner = util.dom.find('.themeBoxInner');
        const display = getComputedStyle(themeBoxInner).display;
        if (display === 'block') {
            util.event.eleOpacityChange.call(this, [themeBoxInner, display, 5]);
        }
    }
})

// endregion
