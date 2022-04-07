import {isFunc} from "../util/core.js";

export function renderCoverPage(coverPage, nodeArr, callback) {
    if (coverPage.nodeName === 'SECTION') {
        nodeArr.forEach(node => {
            coverPage.appendChild(node);
        });
        isFunc(callback) && callback();
    }
}

