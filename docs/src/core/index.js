import Valid from "./util/index.js";
import {parts} from "./template.js";
import './util/init.js'

export function loadValidTheme() {

    let backToTop = parts.backToTop();
    let changeThemeBox = parts.changeThemeBox();
    let themeLinkTag = parts.themeLinkTag();
    document.head.appendChild(themeLinkTag);
    let coverPageCenter = parts.coverPageCenter();
    let navLeftBox = parts.navLeftBox();
    let drawDownBtnBox = parts.drawDownBtnBox();
    let videoPlayer = parts.videoPlayer();

    window.onload = function () {

        const main = Valid.util.dom.find('main');

        if (Docsify.util.isMobile) {
            coverPageCenter.style.marginTop = '5em';
            document.body.style.fontSize = '12px';
        } else if (Docsify.util.inBrowser) {
            document.body.className = 'ready';
        }

        window.addEventListener('scroll', () => {
            if (Math.ceil(scrollY) >= main.scrollHeight / 3 && getComputedStyle(backToTop).display === 'none') {
                backToTop.style.display = 'block';
            } else if (scrollY <= main.scrollHeight / 3 && getComputedStyle(backToTop).display === 'block') {
                backToTop.style.display = 'none';
            }
        })

        window.addEventListener('hashchange', () => {
            let arr = document.body.className.split(' ');
            if (location.href.split('/').includes('timeLine')) {
                arr.push('close');
                document.body.className = arr.join(' ');
            } else {
                if (arr.includes('close')) {
                    arr = arr.filter(item => item !== 'close');
                    document.body.className = arr.join(' ');
                }
            }
        })

        let section = Valid.util.dom.find('section');
        let sectionPats = [changeThemeBox, coverPageCenter, navLeftBox, drawDownBtnBox];
        main.appendChild(backToTop);
        // main.appendChild(videoPlayer);
        Valid.util.render.renderEle(section, sectionPats, () => {
            sectionPats.forEach((part, i, arr) => arr[i] = null);
            sectionPats = null;
            section = null;
            console.log("The cover page valid theme parts is rendered！");
            Valid.util.dom.findAll('.contact div', eleAll => {
                const urls = Object.values(Valid.defaultOptions.contactIconLinks);
                eleAll.forEach((ele, i, arr) => {
                    ele.addEventListener('click', function () {
                        window.open(urls[i])
                    })
                })
            })
        })
    }

}
