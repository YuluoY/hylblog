import {createNode} from "./util/dom.js";

export const parts = Object.create(null);

!function () {
    parts.themeLinkTag = function () {
        return createNode('link', {
            type: 'text/css',
            rel: 'stylesheet',
            href: `assets/theme/${localStorage.getItem('valid-theme') || 'vue'}.css`,
            id: 'theme'
        });
    }

    parts.backToTop = function () {
        return createNode('div', {
            className: 'backToTop',
            innerHTML: `
                    <svg class="icon" aria-hidden="true" 
                        onclick="$valid.util.event.scrollBar('top', 5, event)">
                        <use xlink:href="#icon-a-huojianqidongyunhang"></use>
                    </svg>
<!--                <button onclick="$valid.util.event.scrollBar('top', 5, event)">TOP</button>-->
            `,
        })
    }

    parts.changeThemeBox = function () {
        return createNode('div', {
            className: 'themeBox',
            innerHTML: `
        <div class="themeBoxInner">
            <input type="button" value="buble" onclick="$valid.util.event.changeTheme(value)">
            <input type="button" value="dark" onclick="$valid.util.event.changeTheme(value)">
            <input type="button" value="vue" onclick="$valid.util.event.changeTheme(value)">
            <input type="button" value="dolphin" onclick="$valid.util.event.changeTheme(value)">
        </div>
        <i id="themeIcon" 
            style="color: ${$valid.util.core.themeMapping.get(localStorage.getItem('valid-theme') || 'vue')};"
             class="iconfont icon-43_zhuti" 
             onclick="$valid.util.event.showThemeBox()"></i>
         `
        })
    }

    parts.coverPageCenter = function () {
        return createNode('div', {
            className: 'coverPageCenter',
            innerHTML: `<div class="centerContent">
            <img src="${$valid.defaultOptions.logo}">
            <h1 style="margin: 30px 0px 10px 0px;">${$valid.defaultOptions.name}</h1> 
            <h3>${$valid.defaultOptions.welcomingSpeech}</h3>
            <p>${$valid.defaultOptions.maxim}</p>
            <div class="contact">
                <div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-weixin"></use>
                    </svg>
                </div>
                <div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-QQ"></use>
                    </svg>
                </div>
                <div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-csdn"></use>
                    </svg>
                </div>
                <div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-GitHub"></use>
                    </svg>
                </div>
                <div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bilibili"></use>
                    </svg>
                </div>
            </div>
        </div> `
        })
    }

    parts.navLeftBox = function () {
        return createNode('div', {
            className: 'navLeftBox',
            innerHTML: `
        <div class="logo" style="background-color: ${$valid.util.core.themeMapping.get(localStorage.getItem('valid-theme') || 'vue')}">
            <img alt="logo" src="${$valid.defaultOptions.navLeftImg}">
        </div>
        <div class="author"><span style="font-size: 2em;color: ${$valid.util.core.themeMapping.get(localStorage.getItem('valid-theme') || 'vue')};">
            ${$valid.defaultOptions.navLeftName}</span>
        </div>
            `,
            onclick: function () {
                alert('😄');
                location.reload();
            }
        })
    }

    parts.drawDownBtnBox = function () {
        return createNode('div', {
            className: 'drawDownBtnBox',
            innerHTML: `
            <div class="drawDownBtn" onclick="$valid.util.event.scrollBar('bottom')">
<!--            <svg class="icon" aria-hidden="true">-->
<!--                <use xlink:href="#icon-xiala"></use>-->
<!--            </svg>-->
            <i style=" color: ${$valid.util.core.themeMapping.get(localStorage.getItem('valid-theme') || 'vue')};" 
                class="iconfont icon-xiala"></i>
        </div>
            `
        })
    }

    parts.videoPlayer = function () {
        return createNode('div', {
            className: 'videoPlayer',
            innerHTML:`
                <div class="videoPlayerBox" 
                    style="background-color:${$valid.util.core.themeMapping.get(localStorage.getItem('valid-theme') || 'vue')}">
                    <div class="left">
                        <img src="assets/images/logo.png">
                    </div>
                    <div class="right">
                        <div>歌手：</div>
                        <div>歌曲：</div>
                    </div>
                </div>
            `,
        })
    }
}(window)