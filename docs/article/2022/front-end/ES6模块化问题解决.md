# ES6模块化问题
&emsp;&emsp;也就昨天，在《一个周敲代码的反思》中提到的[ES6模块化使用的问题](life/2022/一个周敲代码的反思?id=es6模块化问题)。因为虽然实现了我
想要的模块化开发，但是使用起来却很奇怪，需要以这样的形式引入，甚至修改，`<script type="module" defer>...</script>`。这样的写法就很异类，虽然
理论上解释确实这样引入，但这也导致与非模块化的js代码断开了联系，无法使别人在我的主题基础上进行第二次开发或修改，当时就百思不得其解。但是呢，
没想到我第二天就解决了这个东西。这时候我就对ES6模块化的理解有了质的提升，之前以为只是文件中的`import`与`export`来操作，现在我通过`webpack`打包
我的js文件我就明白了什么叫工程化。

&emsp;&emsp;通过`webpack`打包我的根目录下的js文件，而这个文件又是其他js文件的导出。这样`webpack`就能将导出的所有js文件整合为一个js文件，然后
根据`webpack.config.js`的配置项进行降级，这样就能达到同样的功能其兼容性却又更好。目前的浅显的理解是这样的，缺乏实际的工程项目经验，再加上我的
`webpack`只是简单的学了点皮毛。但就目前而言，理解了打包工具配合模块化的使用也是不小的收获。

## webpack的基本配置
1. 在工程目录下打开终端输入以下命令

```shell
    npm install -D webpack@5.71.0 webpack-cli@4.9.2
```
2. 在工程目录下新建webpack.config.js文件输入以下配置

```js
/**
 * webpack: 5.71.0
 * webpack-cli: 4.9.2
 */
const path = require("path");
module.exports = {
    entry: './docs/index.js',  // 文件入口
    output: {
        filename: "bundle.js", // 打包后输出的文件名
        path: path.resolve(__dirname, "./docs/"), // 输出地址
    },
    // 这里使用的开发模式，打包速度更快，还有一个production，也就是生产模式，会压缩你的代码，打包速度会比较慢。
    mode: "development", 
};
```

3. 在工程目录下打开终端输入命令，使用webpack打包

```shell
    npx webpack  
```

4. 热更新打包

```shell
    npx webpack -w
```

> 这样就只需要将所有需要的文件全部引入到./docs/index.js一个js文件中就可以了。打包后会在docs文件夹下生成bundle.js文件。