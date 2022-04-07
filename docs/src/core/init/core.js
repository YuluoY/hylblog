export const $valid = {
    defaultOptions: {
        name: '雨落',
        centerName: 'Yu Luo',
        themeStyle: localStorage.getItem('valid-theme') || 'vue',
    }
}

window.$valid = window.$valid || {};
window.$valid.defaultOptions = window.$valid.defaultOptions ? window.$valid.defaultOptions : $valid.defaultOptions;


