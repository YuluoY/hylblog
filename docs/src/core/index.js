import Valid from "./util/index.js";
import {parts} from "./template.js";

export function loadValidTheme  () {
    let backToTop = parts.backToTop();
    let changeThemeBox = parts.changeThemeBox();
    let themeLinkTag = parts.themeLinkTag();
    document.head.appendChild(themeLinkTag);
    let coverPageCenter = parts.coverPageCenter();
    let navLeftBox = parts.navLeftBox();
    let drawDownBtnBox = parts.drawDownBtnBox();

    window.onload = function () {

        if (Docsify.util.isMobile) {
            document.body.style.fontSize = '12px';
        }else if(Docsify.util.inBrowser){
            document.body.className = 'ready';
        }

        window.addEventListener('scroll', () => {
            if (Math.ceil(scrollY) >= main.scrollHeight / 3 && getComputedStyle(backToTop).display === 'none') {
                backToTop.style.display = 'block';
            } else if (scrollY <= main.scrollHeight / 3 && getComputedStyle(backToTop).display === 'block') {
                backToTop.style.display = 'none';
            }
        })

        let section = Valid.util.dom.find('section');
        let sectionPats = [backToTop, changeThemeBox, coverPageCenter, navLeftBox, drawDownBtnBox];
        Valid.util.render.renderEle(section, sectionPats, () => {
            sectionPats.forEach((part, i, arr) => arr[i] = null);
            sectionPats = null;
            section = null;
            console.log("The cover page valid theme parts is rendered！");
        })
    }

}
