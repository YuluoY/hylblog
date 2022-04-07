import {getStyle, themeMapping} from "./core.js";
import {find} from "./dom.js";

export function scrollBar(direction, speed = 5, event = {}) {
    const section = document.querySelector('section');
    let sectionHeight = parseInt(getStyle(section, 'height')) - scrollY;
    // clearInterval(this.time);
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
export function eleOpacityChange([ele, display, speed]) {
    clearInterval(this.timer);
    let opacity = null;
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

export function changeTheme(themeName = 'vue') {
    if (localStorage.getItem('my_theme') !== themeName) {
        const themeLinkTag = find('#theme');

        find('#themeIcon', (ele) => {
            let currThemeColor = themeMapping.get(themeName);
            ele.style.color = currThemeColor;
            $docsify.progress.color = currThemeColor;
            $('.logo').css('background-color', currThemeColor);
            $('.author').css('color', currThemeColor);
            $('.drawDownBtn i').css('color', currThemeColor);

        })
        themeLinkTag.href = `assets/theme/${themeName}.css`;
        localStorage.setItem('my_theme', themeName);
    }
}

export function showThemeBox() {
    const themeBoxInner = $valid.util.dom.find('.themeBoxInner');
    const display = $valid.util.core.getStyle(themeBoxInner, 'display');
    $valid.util.event.eleOpacityChange.call(this, [themeBoxInner, display, 5])
}






















