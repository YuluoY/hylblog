import {isFunc} from "./core.js";

export function renderEle(coverPage = document.body, nodeArr, callback) {
    if (coverPage) {
        nodeArr.forEach(node => {
            coverPage.appendChild(node);
        });
        isFunc(callback) && callback();
    }
}

