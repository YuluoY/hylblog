import {getStyle, themeMapping} from "./core.js";
import {find} from "./dom.js";

// export function Events(Base){
//     return class Events extends Base{
//
//     }
// }

export function scrollBar(direction, speed = 5, event = {}) {
    const section = document.querySelector('section');
    let sectionHeight = parseInt(getStyle(section, 'height')) - scrollY;
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
export const eleOpacityChange = function (ele, display, speed) {
    clearInterval(window.$valid.timer);
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
        window.$valid.timer = setInterval(() => {
            if (opacity >= 1) {
                clearInterval(window.$valid.timer);
            }
            opacity += 0.1;
            ele.style.opacity = opacity;
        }, speed)
    } else if (opacity === 1) {
        window.$valid.timer = setInterval(() => {
            if (opacity <= 0) {
                clearInterval(window.$valid.timer);
                clearTimeout(window.$valid.timer2);
                window.$valid.timer2 = setTimeout(() => {
                    ele.style.display = 'none';
                }, 500)
            }
            opacity -= 0.1;
            ele.style.opacity = opacity;
        }, speed)
    }
}

export function changeTheme(themeName = 'vue') {
    $valid.defaultOptions.themeStyle = themeName;
    if (localStorage.getItem('valid-theme') !== themeName) {
        const themeLinkTag = find('#theme');
        find('#themeIcon', (ele) => {
            let currThemeColor = themeMapping.get(themeName);
            ele.style.color = currThemeColor;
            $docsify.progress.color = currThemeColor;
            $('.logo').css('background-color', currThemeColor);
            $('.author span').css('color', currThemeColor);
            $('.drawDownBtn i').css('color', currThemeColor);
            $('.pagingActive').css('background-color', currThemeColor);
            $('#progress-display').css('background-color', currThemeColor);

        })
        themeLinkTag.href = `assets/theme/${themeName}.css`;
        localStorage.setItem('valid-theme', themeName);
    }
}

export function TimeLineBtnActive(t) {
    if ($(t).attr('class').split(' ').includes('timeLineActive')) {
        return;
    }
    let theme = themeMapping.get(localStorage.getItem('valid-theme') || 'vue');
    $(t).css('background-color', theme).addClass('timeLineActive');
    $('.timeLineActive').each((index, ele) => {
        if (ele !== t) {
            $(ele).removeClass('timeLineActive').css('background-color', '');

        }
    })
}

export function showThemeBox() {
    const themeBoxInner = $valid.util.dom.find('.themeBoxInner');
    const display = $valid.util.core.getStyle(themeBoxInner, 'display');
    $valid.util.event.eleOpacityChange(themeBoxInner, display, 5)
}






















