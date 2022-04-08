import * as core from './core.js'
import * as dom from './dom.js'
import * as event from './event.js'
import * as env from './env.js'
import * as render from './render.js'
import * as vueComponents from '../components/index.js'

const defaultOptions = {
    name: 'Yu Luo',
    logo: './assets/images/logo.png',
    welcomingSpeech: '欢迎来到雨落的博客！',
    maxim: '人生而自由，却无往不在枷锁之中。 ——— 卢梭',
    themeStyle: 'dark',
    navLeftName: '雨落',
    navLeftImg: './assets/images/logo.png',
    contactIconLinks: {
        'WeChat': 'assets/img/vx_QR_code.jpg',
        'QQ': '//wpa.qq.com/msgrd?v=3&uin=568055454&site=qq&menu=yes',
        'CSDN': 'https://blog.csdn.net/weixin_42390185?type=blog',
        'github': 'https://github.com/YuluoY?tab=repositories',
        'bilibili': 'https://space.bilibili.com/478907371'
    }
};
const Valid = Object.create(null);

window.$valid = window.$valid || Valid;
window.$valid.defaultOptions = window.$valid.defaultOptions ?
    Object.assign(window.$valid.defaultOptions, defaultOptions) : Object.assign({}, defaultOptions);

window.$valid.util = {
    core,
    dom,
    event,
    env,
    render
}

window.$valid.vueComponents = vueComponents;

export default Valid;
