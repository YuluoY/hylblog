import {backToTop, changeThemeBox} from "./pieced.js";

export function loadValidTheme(window) {

    window.onload = function () {
        let {dom} = $valid.util;
        let {render} = $valid.init;
        let utilCore = $valid.util.core;
        let initCore = $valid.init.core;

        const main = dom.find('main');

        window.addEventListener('scroll', () => {
            if (Math.ceil(scrollY) >= main.scrollHeight / 3 && utilCore.getStyle(backToTop, 'display') === 'none') {
                backToTop.style.display = 'block';
            } else if (scrollY <= main.scrollHeight / 3 && utilCore.getStyle(backToTop, 'display') === 'block') {
                backToTop.style.display = 'none';
            }
        })


        /* render cover page */
        dom.find('section', ele => {
            render.renderCoverPage(ele, [
                backToTop, changeThemeBox
            ], () => {
                console.log('The cover page render finished !')
            })
        })
    }
}