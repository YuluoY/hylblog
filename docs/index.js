import './src/css/index.css'
import './src/css/main.css'
import './src/css/coverpage.css'
import './assets/styles/iconfont.css'
import './assets/styles/jazz-timeline.css'
import './src/css/loadpage.css'

import {spreadLoadPage} from "./src/core/util/event.js";
import {loadValidTheme} from "./src/core/index.js";
import {initLoadPage} from "./src/core/loadPage";

let loadPage = initLoadPage();

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        spreadLoadPage();
        loadValidTheme();
        $('.mask').css('opacity', 0);
    } else {
        document.body.appendChild(loadPage);
    }
}
