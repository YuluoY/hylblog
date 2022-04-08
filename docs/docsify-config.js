let progressColorMapping = new Map({
    [Symbol.iterator]: function* () {
        yield ['buble', '#0074D9'];
        yield ['dark', '#EA6F5A'];
        yield ['vue', '#42B983'];
        yield ['dolphin', '#00FFFF'];
    }
});
window.$docsify = {
    el: '#app',
    basePath: `${location.href.split('#')[0]}`,
    name: '雨落',  // 文档标题，会显示在侧边栏顶部。
    logo: 'assets/images/logo.png',
    repo: 'https://github.com/YuluoY?tab=repositories',  // 设置github仓库，右上角会出现icon
    homePage: 'README.md', // 设置首页，可自定义
    coverpage: true, // 启动封页面，默认为_coverpage.md
    // maxLevel: 6, // 默认情况下会抓取文档中所有标题渲染成目录，可配置最大支持渲染的标题层级。 默认值为6
    loadNavbar: true,  // 设置导航栏，可以自定义md文件，默认为docs/_navbar.md
    loadSidebar: true, // 设置侧边栏，可以自定义(loadSidebar: 'sidebar.md')，默认为docs/_sidebar.md
    autoHeader: true, // 同时设置 loadSidebar 和 autoHeader 后，可以根据 _sidebar.md 的内容自动为每个页面增加标题。
    hideSidebar: false, // 设置隐藏侧边栏
    subMaxLevel: 10, // 设置侧边栏最大层级
    maxLevel: 4,
    auto2top: true,  // 设置切换页面后是否自动跳转到顶部
    relativePath: false, // 设置相对路径
    // alias: {},  // 别名设置
    executeScript: true, // 执行文档里的 script 标签里的脚本，只执行第一个 script (demo)。 如果 Vue 存在，则自动开启。
    mergeNavbar: true, //小屏设备下合并导航栏到侧边栏。
    routerMode: 'hash', // default: 'hash'
    notFoundPage: '_404.md',
    topMargin: 90, // default: 0

    search: {
        maxAge: 86400000, // 过期时间，单位毫秒，默认一天
        paths: 'auto', // or 'auto'
        placeholder: 'Type to search',

        // 支持本地化
        placeholder: {
            '/zh-cn/': '搜索',
            '/': 'Type to search'
        },

        noData: 'No Results!',

        // 支持本地化
        noData: {
            '/zh-cn/': '找不到结果',
            '/': 'No Results'
        },

        // 搜索标题的最大层级, 1 - 6
        depth: 4,

        hideOtherSidebarContent: false, // 是否隐藏其他侧边栏内容

        // 避免搜索索引冲突
        // 同一域下的多个网站之间
        namespace: 'website-1',

        // 使用不同的索引作为路径前缀（namespaces）
        // 注意：仅适用于 paths: 'auto' 模式
        //
        // 初始化索引时，我们从侧边栏查找第一个路径
        // 如果它与列表中的前缀匹配，我们将切换到相应的索引
        pathNamespaces: ['/zh-cn', '/ru-ru', '/ru-ru/v1'],

        // 您可以提供一个正则表达式来匹配前缀。在这种情况下，
        // 匹配到的字符串将被用来识别索引
        pathNamespaces: /^(\/(zh-cn|ru-ru))?(\/(v1|v2))?/
    },

    count: {
        countable: true,
        fontsize: '1em',
        color: 'rgb(90,90,90)',
        language: 'chinese'
    },

    progress: {
        position: "top",
        color: progressColorMapping.get(localStorage.getItem('valid-theme')),
        height: "2px",
    },
    timeUpdater: {
        text: "Last Update Time: &nbsp;{docsify-updated}",
        formatUpdated: "{YYYY}/{MM}/{DD} {HH}:{mm}:{ss}",
    },
    Valine: {
        appId: 'C8wfb3m2SBgLAh1LHiPKXCBq-gzGzoHsz',
        appKey: 'GwE9fkTnx5dhczlk4BvbdsRu',
        visitor: true, //
        enableQQ: true, // 支持引入qq信息
        avatar: 'monsterid', // 头像设置
        pageSize: '5', // 评论分页，每页5条
        recordIP: true,
        placeholder: '是时候展现你真正的技术了！',
        // docPath: 'hash', //default to `hash` ,or you can choose `full`
    },
    vueComponents: {},
    // vueGlobalOptions: {}
}

progressColorMapping = null;
