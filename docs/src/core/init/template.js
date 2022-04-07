export function changeThemeBox(theme) {
    return (`
        <div class="themeBoxInner">
            <input type="button" value="buble" onclick="$valid.util.event.changeTheme(value)">
            <input type="button" value="dark" onclick="$valid.util.event.changeTheme(value)">
            <input type="button" value="vue" onclick="$valid.util.event.changeTheme(value)">
            <input type="button" value="dolphin" onclick="$valid.util.event.changeTheme(value)">
        </div>
        <i id="themeIcon" 
            style="color: ${theme};" 
            class="iconfont icon-43_zhuti"
            onclick="$valid.util.event.showThemeBox.call(this, window)"></i>
    `)
}
