# 一、vue-router插件的安装
>在工程目录下的终端执行以下命令
```npm
	npm i vue-router
```

# 二、vue-router的基本使用【单级路由】
## 1、index.js路由配置文件
>在src文件夹下新建router文件夹，并创建inedx.js文件
>注意：我这里导入的两个路由组件我将它们放置了pages文件夹下。作用：将路由组件与一般组件区分
```javascript
// 用于创建整个应用的路由器
import VueRouter from "vue-router";

// 引入组件（一级路由）
import About from '../pages/About.vue'
import Home from '../pages/Home.vue'

// 路由实例化
const router = new VueRouter({
    routes: [{
            // 别名（一般对多级路由设置name属性，一级路由建议直接使用path）
            name: 'guanyu',
            // 路径
            path: '/about',
            // 对应的组件
            component: About,
        },
        {
            path: '/home',
            component: Home
        },
    ]
});

// 导出
export default router;
```

## 2、在main.js中使用vue-router插件
```javascript
import Vue from 'vue' // 精简版
import App from './App.vue'

// 1、引入vue路由插件
import VueRouter from 'vue-router'
// 2、引入路由配置文件（这里的path可以省略index。如：import router from './router'）
import router from './router/index'

Vue.config.productionTip = false;

// 3、使用路由
Vue.use(VueRouter);

new Vue({
    el: '#root',
    // 添加router属性
    router,
    render: cE => cE(App),
});
```
## 3、路由组件
### 3.1、App组件
```javascript
<template>
    <div id="app">
        <h1>Vue Router Demo</h1>
        <hr>
        <div id="btn">
            <!-- 
                路由字符串写法
                to：表示path
                tag：表示使用什么html标签
                active-class：表示点击后使用什么样式
             -->
            <router-link to="/about" active-class="active" tag="button">About</router-link><br>
            <router-link to="/home" active-class="active" tag="button">Home</router-link>
        </div>
        <!-- 
         	路由对象写法。使用v-bind绑定，让双引号中的内容为js表达式
         	 <router-link :to="{path:'/home'}"  active-class="active" tag="button">Home</router-link>
         -->
        <div id="result">
            <!-- 组件效果呈现的位置 -->
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'App',    
    }
</script>
<style>
    #app {
        width: 400px;
        height: 400px;
        margin: 50px auto;
    }

    #btn {
        float: left;
    }

    button {
        border-style: none;
        padding: 5px 10px;
        margin-top: 10px;
        margin-right: 10px;
    }

    #result {
        text-align: center;
        color: orange;
    }

    .active {
        background: rgb(0, 178, 248);
        border-color: white;
    }
    ul{
        list-style-type: style;
        list-style:inside;
    }
    li{
        width: 100px;
        height: 30px;
        margin-left: 20px;
        float: left;
    }
    a{
        padding: 5px;
        margin: 5px;
        color: black;
        text-decoration: none;
    }
    a:hover{
        background: rgb(214, 213, 213);
    }
</style>
```
### 3.2、About组件
```javascript
<template>
    <div>
        <h2>我是About组件的内容</h2>
    </div>
</template>

<script>
    export default {
        name: 'About',
    }
</script>
```

### 3.3、Home组件
```javascript
<template>
    <div>
        <h2>我是Home组件的内容</h2>
    </div>
</template>

<script>
    export default {
        name: 'Home',
    }
</script>
```

# 三、vue-router的进阶使用【多级路由】
>关于配置index.js和App组件的内容都与上面一致，【这里主要是更改了index.js路由配置文件和About组件】，把About组件中的内容看懂了可以尝试着写一下Home组件中的内容。
>
## 1、index.js文件
```javascript
// 用于创建整个应用的路由器
import VueRouter from "vue-router";

// 引入组件（一级路由组件）
import About from '../pages/About.vue'
import Home from '../pages/Home.vue'

// 二级路由组件
import News from '../pages/News.vue'
import Message from '../pages/Message.vue'

// 三级路由组件
import Detail from '../pages/Detail.vue'

// 路由实例化
const router = new VueRouter({
    routes: [{
            // 别名
            name: 'guanyu',
            // 路径
            path: '/about',
            // 对应的组件
            component: About,
            // News组件使用的是query属性路由传参
            // Message组件使用的是params属性路由传参
            children: [{   // 👈 二级路由开始
            		name:'xinwen',
                    path: 'news',
                    component: News,
                    children: [{  // 👈 三级路由开始
                        // 给detail一个别名。作用：在to时可以通过name找到path
                        path: 'detail',
                        component: Detail,
                    }]
                },
                {
                	name: 'xiaoxi',
                    path: 'message',
                    component: Message,
                    children: [{
                        // 【传参时，使用params属性则必须使用name找path】！！！
                        name: 'xiangqing',
                        path: 'detail/:id/:content/:isShow',
                        component: Detail,
                    }]
                }
            ],
        },
        {
            path: '/home',
            component: Home
        },
    ]
});

export default router;
```

## 2、About组件
```javascript
<template>
    <div>
        <h2>About组件的内容</h2>
        <router-link 
            tag="button" 
            to="/about/news"  // 指向news的path，也可以使用对象写法指向name，即：:to="{name:'xinwen'}"
            active-class="active">
            News
        </router-link>
        
        <router-link 
            tag="button"
            to="/about/message"  // 这里与上面也一样
            active-class="active">
            Message
        </router-link>
        
		// 路由组件视图标签
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'About',
    }
</script>
```

## 3、About的子路由组件——News与Message
### 3.1、News组件
```javascript
<template>
    <div>
        <ul>
            <li v-for="n in newsList" :key="n.id">
                <a>{{n.news}}</a>
            </li>
        </ul>
      	<hr>
    </div>
</template>

<script>
    export default {
        name: 'News',
        data() {
            return {
                newsList: [
                	{id: '001', news: '新闻001'},
                    {id: '002', news: '新闻002'},
                    {id: '003', news: '新闻003'}
            	],
            }
        },
    }
</script>
```
### 3.2、Message组件
```javascript
<template>
    <div>
        <ul>
            <li v-for="m in msgList" :key="m.id">
               {{m.message}}
            </li>
        </ul>
        <hr>
    </div>
</template>

<script>
    export default {
        name: 'Message',
        data() {
            return {
                msgList: [
                	{id: '001', message: '消息001'},
                    {id: '002', message: '消息002'},
                    {id: '003', message: '消息003'},
                ]
            }
        },
    }
</script>
```
>到这里，我们的二级路由效果是这样的：![二级路由News效果图](https://img-blog.csdnimg.cn/e42a429c20b4454f93798e547558ec4e.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6Zuo6JC9TGl5,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
![二级路由Message效果图](https://img-blog.csdnimg.cn/0d67c0db3bde41019a0bae972885403b.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6Zuo6JC9TGl5,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

# 四、vue-router的进阶使用【多级路由+传参】
## 1、index.js文件
>index.js文件与上面的一样

## 2、二级路由组件
> 传参的方式有两种。
> 在News中使用query属性，在Message中使用的params属性。
> query和params都可以通过this.$router.query 或 this.$router.params获取参数
### 2.1、News组件【query传参】
> 1、query之to属性字符串传参：:to=" `/about/news/detail?a=${100}&b=${200} `"， 这里v-bind和模板字符串搭配使用，使变量能放入其中。
>2、query之to属性对象传参： :to="{ path:'/about/news/detail', query:{a=100, b=200} }"
```javascript
<template>
    <div>
        <ul>
            <li v-for="n in newsList" :key="n.id">
                <!-- 1、跳转路由并携带query参数，to的字符串写法 -->
                <!-- <router-link :to="`/about/news/detail?id=${n.id}&content=${n.news}`">{{n.news}}</router-link> -->

                <!-- 2、跳转路由并携带query参数，to的对象写法 -->
                <!--
					这里的exact-active-class是query传参时使用，
					它可以精确到被点击的link标签，如果使用active-class，
					就会导致点击一个link会让其他的都会有效果。
				-->
                <router-link exact-active-class="active" :to="{
                        path:'/about/news/detail',
                        query:{
                            id:n.id,
                            content:n.news,
                            isShow:true  // 这里我设置了一个是否显示，因为有News和Message两个路由
                        }
                    }">
                    {{n.news}}
                </router-link>
            </li>
        </ul>
        <hr>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'News',
        data() {
            return {
                newsList: [
                	{id: '001', news: '新闻001'},
                	{id: '002', news: '新闻002'},
                	{id: '003', news: '新闻003'},
                ],
            }
        },
    }
</script>
```
### 2.2、Message组件【params传参】
> params与query的区别在于：
> 	1、params之to属性字符串传参：需要在index.js文件中相对组件路径写对象占位符，例如：path: 'detail/:id/:content/:isShow'。 在to属性中则： :to="`/about/message/detail/${m.id}/${m.message}/${true}`"
> 2、params之to属性对象传参：与query对象传参基本一样，但在params中不能使用path来路由定位组件，【只能使用name来定位组件！！！】
```javascript
<template>
    <div>
        <ul>
            <li v-for="m in msgList" :key="m.id">
                <!-- 跳转路由并携带params参数，to的字符串写法 -->
                <!-- <router-link 
                    tag="a"
                    active-class="active"
                    :to="`/about/message/detail/${m.id}/${m.message}/${true}`">
                    {{m.message}}
                </router-link> -->

                <!-- 跳转路由并携带params参数，to的对象写法 -->
                <router-link active-class="active" :to="{
                    name:'xiangqing',
                    params:{
                        id:m.id,
                        content:m.message,
                        isShow:true
                    }
                }">
                {{m.message}}
                </router-link>
            </li>
        </ul>
        <hr>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'Message',
        data() {
            return {
                msgList: [
                	{id: '001', message: '消息001'},
                    {id: '002', message: '消息002'},
                    {id: '003', message: '消息003'},
                ]
            }
        },
    }
</script>
```
### 2.3、News与Message的子路由组件——Detail组件
```javascript
<template>
    <div id="detail">
        <h2>Detail组件内容如下</h2>
        <!-- News -->
        <ul v-if="$route.query.isShow">  // 在模板标签中，直接使用$route来获取参数，如果在method、computed等等选项属性中则需要this.$route.query
            <li>消息编号：{{$route.query.id}}</li>
            <li>消息内容：{{$route.query.content}}</li>
        </ul><br>

        <!-- Message -->
        <ul v-if="$route.params.isShow">
            <li>消息编号：{{$route.params.id}}</li>
            <li>消息内容：{{$route.params.content}}</li>
        </ul><br>
    </div>
</template>

<script>
    export default {
        name: 'Detail',
    }
</script>
<style scoped>
    #detail>ul {
        margin-top: -20px;
    }

    #detail li {
        width: 60%;
        margin: 0;
        padding: 0;
        text-align: left;
    }
</style>
```
> 三级路由的效果：![三级路由效果图](https://img-blog.csdnimg.cn/def72de9012c495fb8a5d0f56dcb49d9.gif#pic_center)

# 五、总结
>看到这里了，相信路由已经很好理解了。
>掌握关键步骤，其实多层嵌套路由就很容易理解，无非就是持续套娃，其原理还是一样。

	1、vue中使用vue-router插件的步骤
		1.1、下载：npm i vue-router
		1.2、配置：新建router文件夹，新建index.js文件，导入插件、组件，配置相关路由，导出。
		1.3、使用：在main.js中引入插件，Vue.use()使用插件，在Vue中添加router属性。
	2、多级路由
		2.1、在index.js文件中使用children:[]来实现路由嵌套。
	3、路由传参
		3.1、query和params传参都有字符串和对象传参两种形式。
		3.2、关于点击效果建议使用exact-active-class。
		3.3、注意：params对象传参只能使用name属性指向路由path属性。