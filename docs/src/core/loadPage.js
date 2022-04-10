import {createNode} from "./util/dom.js";

export function initLoadPage() {
    return createNode('div', {
        className: 'loadPage',
        innerHTML: `
            <h1>
                <span>
                    Loading...
                </span>
            </h1>
            <div style="background-color:${$valid.util.core.themeMapping.get(localStorage.getItem('valid-theme') || 'vue')}"></div>
            <div style="background-color:${$valid.util.core.themeMapping.get(localStorage.getItem('valid-theme') || 'vue')}"></div>
        `,
    })
}