export function isQQBrowser(navigator) {
    const ua = navigator.userAgent;
    return !!ua.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i)
}

export function isMobile(navigator) {
    const u = navigator.userAgent;
    return ((u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) ||
        (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)));
}

export function isIos(navigator) {
    const ua = navigator.userAgent;
    if (ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) {
        // 安卓手机
        return false
    } else if (ua.indexOf('iPhone') > -1) {
        // 苹果手机
        return true
    } else if (ua.indexOf('iPad') > -1) {
        // iPad
        return false
    } else if (ua.indexOf('Windows Phone') > -1) {
        //winphone手机
        return false
    } else {
        return false
    }
}

export function isPC(navigator) {
    const ua = navigator.userAgent;
    const Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (ua.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}