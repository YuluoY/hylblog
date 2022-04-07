# Nodejs

## 1、fs模块

### 文件的操作

- **writeFile ** : 创建写文件，如果该文件不存在，则会创建并写入，反之则会覆盖写。
- **appendFile** : 追加创建写文件，如果该文件不存在，则会创建并写入，反之则会追加写。
- **unlink ** : 删除文件，文件不存在将报错。
- **readFile ** : 读取文件，文件不存在将报错。

```javascript
const fs = require('fs');

// 1、创建写文件，如果该文件不存在，则会创建并写入，反之则会覆盖写。
fs.writeFile('./test.log', 'Hello World！', (err) => {
    if(err) throw err;
    console.log('文件创建写成功！');
});

// 2、追加创建写文件，如果该文件不存在，则会创建并写入，反之则会追加写。
fs.appendFile('./test2.log', '我是追加的内容', (err) => {
    if(err) throw err;
    console.log('内容追加写成功！');
});

// 3、删除文件，文件不存在就报错。
fs.unlink('./test.log', (err) => {
    if(err) throw err;
    console.log('文件删除成功！');
});

// 4、读取文件，文件不存在就报错。
fs.readFile('./test2.log', 'utf-8', (err, data) => {
    if(err) throw err;
   console.log(data);
});
```

### 文件夹的CRUD

- **mkdir** : 创建文件夹，如果路径下存在logs文件夹则会报错。
- **rename** : 修改文件夹名称。
- **rmdir** : 删除文件夹。只能删除空文件夹。
- **readdir** : 查询文件夹，如果文件夹内有文件，返回文件夹内的文件名数组，反之为空数组。

```javascript
const fs = require('fs');

// 1、创建文件夹，如果路径下存在logs文件夹则会报错。
fs.mkdir('./logs', (err) => {
    if(err) throw err;
    console.log('logs文件夹创建成功！');
});

// 2、修改文件夹名称
fs.rename('./logs', './log', (err) => {
    if(err) throw err;
    console.log('logs文件夹修改成功，新名称为：log');
});

// 3、删除文件夹
fs.rmdir('./log', (err) => {
    if(err) throw err;
    console.log('log文件夹删除成功！');
});

// 4、查询文件夹，如果文件夹内有文件，返回文件夹内的文件名数组，反之为空数组。
fs.readdir('./logs', (err, result) => {
    if(err) throw err;
    console.log(result);
});
```

### 文件的同步操作

- **readFileSync**
- **writeFileSync**
- ...

```js
const fs = require('fs');
let data = fs.readFileSync('./test2.log', 'utf-8');
console.log(data);
console.log('continue...');

输出：
我是追加的内容
continue...
```

### fs/promises模块

```js
const fsPro = require('fs/promises');

// 使用fs/promise模块进行promise异步操作
(async () => {
    let result = await fsPro.readFile('./test2.log');
    console.log(result.toString());
})();
console.log('continue...');

fsPro.readFile('./test.log')
    .then(val => {
        console.log(val.toString());
    }, err => {
        console.log(err);
    });
console.log('continue...');

输出：
continue...
我是追加的内容
```

### 判断是否为文件夹

- **stat**
  - 参数一：文件路径。
  - 参数二：回调函数。
    - 参数一：err，表示错误参数。
    - 参数二：stats，表示文件对象。

```js
const fs = require('fs');

// 异步写法：
let path = './';
fs.readdir(path, (err, dirs) => {
    dirs.forEach(item => {
        fs.stat(path + item, (err, stats) => {
           if(stats.isDirectory())
               console.log(item);
        });
    });
});

// 同步写法：
let path = './';
let dirs = readdirSync(path);
dirs = dirs.filter(item => fs.statSync(path + item).isDirectory());
```

### 文件/文件夹的监视

> 当文件的内容被增加、修改、删除时触发，文件被新建不会被触发。
>
> 只能监听上级目录才能知道当前目录是否有文件/文件夹被新建。

- **watchFile**

  - curr.mtime : 返回一个时间对象。
    - curr.mtime.toLocaleString() : 返回示例：2021/11/21 下午12:13:09
    - curr.mtime.toLocaleDateString() :  返回示例：2021/11/21
    - curr.mtime.toLocaleTimeString() : 返回示例：下午12:13:09
    - curr.mitme.getDay()
    - ...

  - curr.mtimeMs : 返回时间戳。

  - curr.size : 返回文件大小。

```js
const fs = require('fs');
const dayjs = require('dayjs');

fs.watchFile(__filename, (curr, prev) => {
    const date = curr.mtime;
    let modifyDate = `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
     console.log('最近修改文件时间：' , modifyDate);

    // console.log('最近修改文件时间：' , dayjs(curr.mtimeMs).format('YYYY年MM月DD日 HH:mm:ss'));
    // console.log('之前修改文件时间：' + prev.mtime);
});
  
// console.log(__filename); // 当前文件路径
// console.log(__dirname); // 当前文件夹路径
// console.log(__filename.slice(__dirname.length + 1)) // 当前文件
```

### 文件压缩与解压

```js
const fs = require('fs');

const zlib = require('zlib');
const gzip = zlib.createGzip();  // 创建压缩实例

// 压缩
// 将读出流的数据通过管道传送给gzip压缩，然后进入第二个管道写入
const readStream = fs.createReadStream('./test.txt');
readStream.pipe(gzip).pipe(fs.createWriteStream('./test.gz'));

// 解压
const readStream = fs.createReadStream('./test.gz');
readStream.pipe(zlib.createGunzip()).pipe(fs.createWriteStream('./test2.txt'));
```

### 文件加密

> crypto.getHashes()：输出crypto的所有加密模式

- **不可逆hash加密**

```js
const crypto = require('crypto');
const hash = crypto.createHash('sha256')

const password = 'abc123四五六';
hash.update(password, 'utf-8');

console.log(hash.digest('hex'));
```

- **AES对称加密解密**

```js
function encode(src, key, iv) {
    let sign = "";
    const cipher = crypto.createCipheriv("aes-128-cbc", key, iv); // createCipher在10.0.0已被废弃
    sign += cipher.update(src, "utf8", "hex");
    sign += cipher.final("hex");
    return sign;
}

function decode(sign, key, iv) {
    let src = "";
    const cipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
    src += cipher.update(sign, "hex", "utf8");
    src += cipher.final("utf8");
    return src;
}

/*
    algorithm：加密解密的类型；
    key: 加密解密的密钥：密钥必须是 8/16/32 位，如果加密算法是 128，则对应的密钥是 16 位，如果加密算法是 256，则对应的密钥是 32 位；
    iv: 初始向量，规则与 key 一样
*/

let sign = '你好啊！！！World 123';
let key = '1234567891011123';
let iv =  'abcdef1234567890';

let sign2 = encode(sign, key, iv);
console.log('加密后：' + sign2);
console.log('解密后：' + decode(sign2, key, iv));
```





## 2、http模块

### 路由设置

```javascript
const http = require('http');

const server = http.createServer();

server.on('request', function (request, response) {

    // 写入响应头
    response.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    });
    // 过滤掉图标的get请求，浏览器默认会发出两个请求，一个是文件，一个是favicon图标
    if (request.url === '/favicon.ico') return;
    // 路由设置
    switch (request.url) {
        case '/about':
            response.end("<a href='http://192.168.1.105:8080/'>咕噜咕噜</a>");
            break;
        case '/index':
            response.end("<a href='./about'>关于</a>");
            break;
        default:break;
    }
    let socket = request.socket;
    console.log(`请求的主机为：${socket.remoteAddress}:${socket.remotePort}`);

}).listen(8080); // 监听8080端口
```

### get请求

- 参数一：url地址路径。
- 参数二：接收一个request参数的回调函数。
  - 通过request参数绑定两个事件，data和end。当获取数据流后存放在data字符串中。当获取完毕后设置响应体的内容输出类型，最后渲染到页面上，res.end()会将字节流自动转换为可识别的文本。

```js
const http = require('http');
const libUrl = require('url');
const https = require('https');

http.createServer((req, res) => {
    const url = libUrl.parse(req.url);

    if (url.pathname === '/favicon.ico') return;

    // get数据请求，向url发出请求，获取数据流。（发数据）
    https.get('https://autumnfish.cn/api/joke', (request) => {
        let data = '';
        request.on('data', (chunk) => {
            data += chunk;
        });

        request.on('end', () => {
            res.writeHead(200, {
                'content-type': 'text/html;charset=utf-8;',
                // 'content-type':'application/json;chartset=utf-8'
            });
            res.end(data);
        })
    })
}).listen(8080)
```

### post请求

- 参数一：传入一个options配置项对象，基本配置项包括以下几个：
  - protocol：'http:'    （必需，表示使用的协议，http/https，注意要加上冒号）
  - hostname：'localhost'  （必需，目标主机名）
  - method：'post'    （可选，默认是get请求）
  - port：3000   （必需，目标端口号）
  - path：'/data'   （可选，默认为'/'）
  - headers：{.....设置请求头信息}  （可选）
  - ...
- 参数二：接收一个回调函数，且带有一个对方服务器返回的结果。可result.statusMessage输出。
- 返回值为request请求，需要写入数据，并end结束。

```js
const http = require('http');
const https = require('https');
const querystring = require('querystring');

/**
 * 在express中创建了一个接口，http://localhost:3000/data,
 * 通过访问这个接口传入数据，它就会向文件中保存传入的数据，做持久化存储。
 * 在express_test文件夹中的index.js文件中设置了/data路由，当访问这个地址后，就会将传入请求参数存储。
 */

// 将要post发送的数据解析成我也看不懂的编码，
// 因为req.write()不允许写入string
/**
 * province=%E4%B8%8A%E6%B5%B7&
 * city=%E4%B8%8A%E6%B5%B7&
 * district=%E5%AE%9D%E5%B1%B1%E5%8C%BA
 * &address=%E5%90%8C%E6%B5%8E%E6%94%AF%E8%B7%AF199%E5%8F%B7%E6%99%BA%E6%85%A7%E4%B8%83%E7%AB%8B%E6%96%B93%E5%8F%B7%E6%A5%BC
 */
const postData = querystring.stringify({
    province: '上海',
    city: '上海',
    district: '宝山区',
    address: '同济支路199号智慧七立方3号楼',
});

// const postData = JSON.stringify({
//     name: '胡永乐',
//     age: 20,
//     sex: '男',
//     address: '襄阳',
//     university: '湖北文理学院'
// })

// 这里是配置项，连接起来就是 http://localhost:3000/data
// 然后一并设置头信息
const options = {
    protocol: 'http:',
    hostname: 'localhost',
    method: 'post',
    port: 3000,
    path: '/data',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'content-type': 'text/plain;charset=utf-8;',
        'content-length': Buffer.byteLength(postData)
    }
};


http.createServer((req, res) => {
    // 发送request请求
    const req2 = http.request(options, (result) => {
        // 这里是Express的http://localhost:3000/data/ 返回的的ok
        console.log(result.statusMessage);
    });
    req2.write(postData);
    req2.end();
    res.end();

}).listen(8080, () => {
    console.log(`http://localhost:8080/ \t服务已启动！`);
});
```





## 3、os模块

```javascript
const os = require('os');

console.log( os.userInfo() ); // 获取主机用户信息
console.log( os.type() );  // 获取操作系统类型
console.log( os.hostname() );  // 获取主机名
console.log( os.networkInterfaces() );  //获取网络相关的信息
console.log( os.cpus() ); //获取cpu信息
console.log( Math.round(os.totalmem()/1024/1024/1024)+'GB' ); // 获取内存大小
```



## 4、path模块

```javascript
const path = require('path');

console.log(path.dirname("D:\\桌面\\text.js"));    // D:\桌面
console.log(path.basename("D:\\桌面\\text.js"));  // text.js
console.log(path.extname("D:\\桌面\\text.js"));  // .js

let url = 'http://localhost:8080/about';
console.log(path.dirname(url)); // http://localhost:8080
console.log(path.basename(url)); // about
console.log(path.extname(url));  //

console.log(path.parse(url));
{
    root: '',
    dir: 'http://localhost:8080',
    base: 'about',
    ext: '',
    name: 'about'
  }
```



## 5、querystring模块

```js
'use strict'

// 专门用于解析参数的模块————querystring
const querystring = require('querystring');


// https://autumnfish.cn/api/joke?
let url = 'id="123&name="asdsad"';
let obj = {id: '2', name: '12321'}
let post = 'id:3/name:12312312'

let data = `userName=%E8%83%A1%E6%B0%B8%E4%B9%90 &
            content=%E5%95%8A%E5%93%88%E5%93%88%E5%93%88%E5%93%88%E5%93%88%E5%93%88`

const newObj = querystring.stringify(obj, null, null, {
    encodeURIComponent(string) {
        return querystring.unescape(string)
    }
});
console.log(querystring.parse(data)); // { userName: '胡永乐', content: '啊哈哈哈哈哈哈' } // obj对象
console.log(querystring.unescape(data)); // userName=胡永乐&content=啊哈哈哈哈哈哈
console.log(querystring.stringify(data, ':', '/')); // userName=胡永乐&content=啊哈哈哈哈哈哈
console.log(querystring.parse(data, '/', ':'));  // { 'userName=胡永乐&content=啊哈哈哈哈哈哈': '' } obj对象

console.log(newObj); // id=2&name=12321

console.log(querystring.parse(url)); // { id: '"123', name: '"asdsad"' }
console.log(querystring.escape(url)); // id%3D%22123%26name%3D%22asdsad%22
console.log(querystring.unescape(url)); // id="123&name="asdsad"

console.log(querystring.stringify(obj, ':', '/')); // id/2:name/12321

console.log(querystring.parse(post, '/', ':')); // { id: '3', name: '12312312' }


// 配合使用，规避中文乱码
querystring.escape(data);  // 打散
querystring.unescape(data);  // 重塑
```



## 6、跨域

### jsonp

- jsonp跨域就是利用`<srcipt>`标签的src属性访问服务器，通过约定(路径)来获取资源。

### cors

```js
// 在响应头中设置允许通过的源，*表示允许所有
'Access-Control-Allow-Origin': '*'
```

### proxy

- 参数一：约定的路径
- 参数二：对象，用于options设置。
  - target : 'https://www.xiaomiyoupin.com/',  （表示目标地址）。
  - changeOrigin : true,  （表示跨域）
  - pathRewrit : {'^/mtop': ''}  （表示删除/mtop路径）路径重写主要用于删除约定的路径暗号。
- 返回一个代理对象，一般使用proxy命名。最后启用需要传入当前的request和response参数。例如：proxy(request, response)，它将把数据返回给请求者。
  - 例如：使用`server2.js`开启8080端口来对`server.js`的3000端口发出get请求，3000端口的服务器将判断是否符合约定，如果是则将该请求交给中间件`http-proxy-middleware`来处理(获取数据，返回数据)，并返回8080端口数据。

> 在这里介绍使用`http-proxy-middleware`中间件来通过代理实现跨域。

- **server.js**

```js
const http = require('http');
const libUrl = require('url');
const {
    createProxyMiddleware
} = require('http-proxy-middleware');

// console.log(proxy);
/*
  {
  createProxyMiddleware: [Function: createProxyMiddleware],
  responseInterceptor: [Getter],
  fixRequestBody: [Getter]
 */

http.createServer((req, res) => {
    // true表示将query参数解析成对象, 例如：name=123&age=19 ===> {name: 123, age: 19}
    const url = libUrl.parse(req.url, true);
    // 设置响应头，发送json格式的数据
    res.writeHead(200, {
        'content-type': 'application/json',
        // 'Access-Control-Allow-Origin': '*'
    })
    if (url.pathname === '/favicon.ico') return;

    // 通过正则检查路径开头是否是 /mtop
    if (/^\/mtop/.test(url.pathname)) {
        /*
            这里使用的是insomnia软件发送的post请求，向本地发送请求，所以不存在跨域，
            但下面的地址与本地端口不一致，我们通过代理实现了跨域请求数据。

            同理，我们将insomnia软件换成自己开发的server，例如该目录下的server2.js,
            创建了一个8080的端口，使用server2请求server，将server返回的数据返回给前端[index.html]页面，
            可以看到，我在index.html做了一个输出，将json数据打印到页面上。

            流程：小米有品数据-->server-->proxy-->server2-->index.html
            实际上，我们可以直接在server2做输出，因为index.html的端口是5500，
            想要将server2[端口:8080]的数据发送到index文件上，我们还是得使用cros跨域，有点多此一举了。
            
            流程：小米有品数据-->server-->proxy-->server2
            所以直接打开浏览器，访问http://localhost:8080/api，即可以渲染出数据。
            这里的api路径是我们添加的一个约定，也就是接口，你路径是/api，我就给你数据，反之渲染error
        */
        let proxy = createProxyMiddleware('/mtop', {
            target: 'https://www.xiaomiyoupin.com/',
            changeOrigin: true,
            // 这是路径重写, 将/mtop替换成空字符串
            // 作用：添加自己的接口路径暗号，然后访问时删除该暗号
            // pathRewrite: {
            //     '^/mtop': ''
            // }
        });
        proxy(req, res);
    }

}).listen(3000)
```

- **server2.js**

```js
const http = require('http');
const libUrl = require('url');

http.createServer((req, res) => {
    const url = libUrl.parse(req.url);
    if (url.pathname === '/api') {
        let data = '';
        http.get('http://localhost:3000/mtop/navi/venue/page?page_id=6425&pdl=jianyu&sign=a31558dc483536c81f38a701b1cbefce', (request) => {
            request.on('data', (chunk) => {
                data += chunk;
            });

            request.on('end', () => {
                res.writeHead(200, {
                    'content-type': 'application/json;charset=utf-8;',
                    // 'access-control-allow-origin': '*'
                    // 'content-type':'application/json;chartset=utf-8'
                });
                res.end(JSON.stringify(data.toString()));
            });
        })
    } else {
        res.end('error')
    }
}).listen(8080)
```



## 7、events模块

- event.on(event, listener);
- event.once(event, listener);
- event.addListener(event, listener);
- event.removeListener(event, listener);
- event.removeAllListeners([event]);
- event.setMaxListeners(n);   只会检查该行代码以下的监听器。
- event.listenerCount([event]);

```js
const EventEmitter = require('events'),EventEmitter;
const event = new EventEmitter();

// 1、on(event, listener)
event.on('test', (val)=>{
    console.log('test：' + val);
});

event.emit('test', '测试触发事件');

// 2、addListener(event, listener)
let listener1 = (val) => {
    console.log('listener1: ' + val);
};
event.addListener('connection', listener1)
event.emit('connection', '测试监听事件');

// 3、removeListener(event, listener)
event.removeListener('connection', listener1);

// 4、removeAllListeners([event])
event.removeAllListeners('connection'); // 移除connection监听器
event.removeAllListeners(); // 移除所有监听器

// 5、setMaxListeners(n)
event.setMaxListeners(1);
let test = () => console.log("测试");
let test1 = test;
evnet.addListener('test', test);
evnet.addListener('test', test1); // 添加第二个时将报错

// 6、once
let test = () => console.log("测试");
event.once('test', test);
event.emit('test'); 
event.emit('test'); // 只会执行一次

// 7、listenerCount([event]) 包括on事件
let test = () => console.log("测试");
event.addListener('test', test);
event.addListener('test', test);
console.log(event.listenerCount('test')); // 2
```



## 8、readline模块

### 标准输入输出

```js
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('你觉得《四月是你的谎言》好看吗？\n', (answer)=>{
    console.log('你的回答：非常好看！！！', '忽略你觉得'+ answer);
    rl.close();
});
```

### 逐行输出文件内容

```js
const fs = require('fs');
const readline = require('readline');

const rl2 = readline.createInterface({
    input: fs.createReadStream('./app.js')
});

rl2.on('line', (line) => {
    console.log('逐行输出：' + line);
})
```



## 9、静态服务框架搭建

> 有两种实现：同步与异步。
>
> > 同步实现起来简洁，代码量明显少于异步实现。但当获取的资源足够多时，效率低下。
> >
> > 异步虽然做的操作多，但当获取的资源足够多时，使用高并发能很好的提升读取文件的效率。

- 创建一个工程文件夹
  - 创建public文件夹
    - 创建styles文件夹（css、styl、less...文件）
    - 创建scripts文件夹（js文件）
    - 创建img文件夹（图片图标文件）
    - 创建index.html文件（用于服务器渲染首页）
  - 创建server.js文件（用于创建服务器）

- **server.js**

```js
const http = require('http');
const path = require('path');
const mime = require('mime/lite');

const readStaticFile = require('./readStaticFile');

const server = http.createServer();

server.on('request',async (req, res) => {
    
    let filePath = path.join(__dirname, './public', req.url);
    try {
        let {data, mimeType} = await readStaticFile(filePath);
        res.writeHead(200, {
            'Content-Type' : mimeType + ';charset=utf-8'
        });
        res.end(await data);
    } catch (error) {
        console.log(error);
    }

}).listen(3000);
```

- **readStaticFile.js**（属于拓展脚本文件，减少主服务器的代码量）

```js
const path = require('path');
const fs = require('fs');
const mime = require('mime/lite'); // 用于通过后缀得到对应的类型，用于设置响应体

// 1、同步实现
// function readStaticFile(fileName) {
//     let data = '';
//     let ext = path.parse(fileName).ext;
//     let mimeType = mime.getType(ext);
//     // 1、判断传过来的文件是否存在，根目录为public
//     if (fs.existsSync(fileName)) {
//         if (ext) {
//             data = fs.readFileSync(fileName);
//         } else {
//             data = fs.readFileSync('./public/index.html')
//         }
//     } else {
//         data = 'File not found!';
//     }
//     return {
//         data,
//         mimeType
//     };
// }

// 2、异步实现
function render(file) {
    try {
        return new Promise((resolve, reject) => {
            fs.readFile(file, (err, data) => {
                if (err) {
                    reject('你访问的路径是文件夹');
                } else {
                    resolve(data);
                }
            });
        })
    } catch (error) {
        return error;
    }
}
async function readStaticFile(fileName) {
    let data = '';
    let ext = path.parse(fileName).ext;
    let mimeType = mime.getType(ext) || 'text/html';
    // 1、判断传过来的文件是否存在，根目录为public
    if (fs.existsSync(fileName)) {
        if (ext) {
            data = render(fileName);
        } else {
            data = render(path.join(fileName, '/index.html'));
        }
    } else {
        data = '没有发现文件！';
    }
    return {
        data,
        mimeType
    };
}

module.exports = readStaticFile;
```

- **index.html**

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./styles/common.css">
</head>

<body>
    <img src="./img/1.jpg"/>
    <img src="./img/2.jpg"/>
    <img src="./img/3.jpg"/>
    <img src="./img/4.jpg"/>
    <img src="./img/5.jpg"/>
    <img src="./img/6.jpg"/>
    <img src="./img/7.jpg"/>
    啊哈哈哈哈
</body>

</html>
```

- **common.css**

```css
*{
    margin: 0;
    padding: 0;
    font-size: 14px;
}
img{
    width: 50px;
    height: 50px;
}
```



## 10、Express框架

### 1、use方法路由

> 1、`express`的`use`方法路由是从上自下执行进行的，当`/api`路径在`/`默认路径的后面将不被执行。
>
> 2、当在路由操作的最后一步执行了`next`，那该路由成了下一个路由的中间站，两个路由只能有一个使用`send`渲染页面，但可以通过中间站执行非渲染的操作。
>
> > 什么叫中间站，就是程序执行了该回调且回调中使用了`next`放行，程序还会执行下一个回调。那么该回调就是中间站，也就是中间件。个人喜欢称为中间站，因为程序还没到终点还会往下走。
```js
const express = require('express');

const app = express();

// 中间件栈，根据索引从上自下执行。
const middlewares = [(req, res, next) => {
    console.log(0);
    next(); 
}, (req, res, next) => {
    console.log(1);
    next();
}, (req, res, next) => {
    console.log(2);
}];

/**
 * 当在路由操作的最后一步执行了next，那该路由成了下一个路由的中间站，
 * 两个路由只能有一个使用send渲染页面，但可以通过中间站执行非渲染的操作。
 */

app.use('/api', (req, res, next) => {
    res.send('啦啦啦啦啦');
    next();
}, middlewares)

app.use('/', (req, res, next) => {
    if (req.url === '/favicon.ico') return;
    res.write('咕噜咕噜咕噜~');
    next();
}, (req, res, next) => {
    res.send()
});

app.listen(8080);
```

### 2、router路由

> 注意配置：
>
> app.use(express.urlencoded({extended: false})) // 解析post等请求中间件
>
> app.use(express.json()) // 使用json解析中间件

```js
const express = require('express');
const fs = require('fs');

// 路由中间件
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('main pages');
});

// 获取数据
router.get('/index.html', (req, res, next) => {
    res.send(req.query)
});

// 添加数据
router.post('/index.html', (req, res, next) => {
    res.send(req.body)
});

// 修改数据——覆盖修改
router.put('/index.html', (req, res, next) => {
    res.send(req.body)
});

// 修改数据——增量修改
router.patch('/index.html', (req, res, next) => {
    res.send(req.body)
});

// 删除数据
router.delete('/index.html', (req, res, next) => {
    res.send(req.body)
});

// 接收所有请求
router.all('/index.html', (req, res, next) => {
    res.send('all method')
});

module.exports = router; 
```

### 3、MVP架构

> MVP(Model-View-Presenter)是MVC(Model-View-Controller)的升级版，MVP与MVC有着一个重大的区别：在MVP中View并不直接使用Model，它们之间的通信是通过Presenter (MVC中的Controller)来进行的，所有的交互都发生在Presenter内部，而在MVC中View会直接从Model中读取数据而不是通过 Controller。

- **生产依赖**

```json
 "dependencies": {
    "art-template": "^4.13.2",
    "express": "^4.17.1",
    "express-art-template": "^1.0.1"
  }
```

- **工程结构**

```
Express
|------controller
|------|---------index.js
|------module
|------|-----（暂时还未学到MongoDB）
|------public
|------|-----images
|------|-----scripts
|------|-----|------template-web.js
|------|-----styles
|------|-----index.html
|------router
|------|-----index.js
|------view
|------|---index.art
|------app.js
```

- **app.js（服务器）**

```js
const express = require('express');
const app = express();
const path = require('path');

// 引入路由中间件
const router = require('./router/index');

app.engine('art', require('express-art-template'));  // 启用art-template模板
app.set('view options', {   // 【大坑】，官网写的views
    debug: process.env.NODE_ENV !== 'production',
    escape: false // 是否自动编码模板的输出语句。设置 false 将关闭该功能。escape可以防止XSS攻击
});
app.set('view', path.join(__dirname, 'view'));
app.set('view engine', 'art');

app.use(express.urlencoded({
    extended: false 
})) // 解析post等请求中间件
app.use(express.static('public')) // 使用中间件托管静态资源，即：默认访问的就是index.html，http://localhost:8080与http://localhost:8080/index.html等效。
app.use(express.json()) // 使用json解析中间件
app.use('/', router); // 使用router中间件

app.listen(8080);

// SSR (Server Side Render)
// CSR (Client Side Render)
```

- **Presenter层**

> 将数据通过render传到index.art中。
>
> > 如果想直接在`public`下生成html文件，就在art文件中写入html框架，在框架中直接写art模板语法。当用户点击`发布`操作后，使用fs模块生成html文件，这样就可以通过`http://localhost:8080/newWeb.html`来访问静态目录下的`newWeb.html`文件了。
> >
> > ```js
> > let dataArr = [];
> > for (let i = 0; i < 100; i++) {
> >     dataArr.push('line' + i);
> > }
> > const filePath = (p) => path.join(__dirname, p);
> > var html = template(filePath('../view/index2.art'), { 
> >     data: dataArr
> > });
> > fs.writeFileSync(filePath('../public/newWeb.html'), html); // 创建写入文件 
> > res.send('ok'); // 返回给用户操作成功
> > }
> > ```

```js
const template = require('art-template');
const path = require('path');
const fs = require('fs');

const control = {
    hello: (req, res, next) => {
        // 1、创建模拟数据
        let dataArr = [];
        for (let i = 0; i < 100; i++) {
            dataArr.push('line' + i);
        }
         res.set('content-type', 'application/json;charset=utf-8');
         res.render('index', {
             data: JSON.stringify(dataArr)
         });
    }
}
module.exports = control;
```

- **router**（服务器分离的子功能，专门用于控制路由，也属于P层）

> 不再使用use进行路由，通过路由中间件进行路由进入P层

```js
const express = require('express');
const fs = require('fs');

const control = require('../controller/index')

// 路由中间件
const router = express.Router();

router.get('/api/hello', control.hello);
```

- **view层**

```art
{
	"ret": true,
	"dataArr": {{data}}
}
```



- **public静态目录**

  - index.html

  - > 导入的脚本有：jquery与art-template
    >
    > 使用jq发送ajax请求，服务器将数据交给art模板，最后返回数据。
    >
    > 即：请求=>app.js=>router(index.js)=>controller(index.js)=>view(index.art)=>数据

    ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="./scripts/template-web.js"></script>
    </head>
    
    <body>
        <img src="./images/1.jpg" />
        <img src="./images/2.jpg" />
        <div id="test"></div>
        <script>
            $.ajax({
                url: '/api/hello', 
                success(result) {
                    // 2、模板生成
                    let tempStr = `
                        <ul>
                            {{each data}}   
                            <li>{{$value}}</li>
                            {{/each}}
                        </ul>
                    `;
                    
                    // 1、数据传入
                    let html = template.render(tempStr, {
                        data: result.dataArr
                    });
                    
                    // 3、渲染模板
                    $('#test').html(html);
                }
            })
        </script>
    </body>
    
    </html>
    ```

    





## 留言簿实战

### 预备

1. 编写html页面，并编写ajax请求，当页面打开时就向服务器发出ajax请求，请求读取数据库数据，更新页面。
2. 使用http模块创建服务器
3. 创建文本文件，用于持久化存储。

### 执行

1. html界面填写信息，携带参数向服务器发出请求。
2. 服务器接收请求，解析数据。
3. 使用fs模块写文件存储数据。
4. 使用fs模块读html文件渲染页面。

> 值得一提的是，使用fs模块读取html文件渲染需要使用异步操作，否则将会渲染失败。第一次做使用的是回调函数，当fs模块读取流完毕后，将数据以参数的形式返回给回调函数，然后在回调内执行渲染页面。



## log4js——日志

> 在当前目录下将创建一个cheese.log文件，记录每一个使用logger.debug的输出。

```sh
npm i log4js -D
```

```js
var log4js = require('log4js');
log4js.configure({
    appenders:{cheese:{type:'file', filename:'cheese.log'}},
    categories:{default:{appenders:['cheese'], level:'error'}}
});

var logger = log4js.getLogger('cheese');
logger.level = 'debug';

logger.debug(...);
```




























