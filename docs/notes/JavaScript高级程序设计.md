# JavaScript高级程序设计

## 第一章 什么是JavaScript

### 1.1 JavaScript的历史

时间：1995年

主要人物：Brendan Eich

公司：网景与Sun

语言：发布前 -> LiveScript  发布后 -> JavaScript

解决痛点：验证简单的表单而需要大量与服务器的往返通信，导致用户等待时间过长。JavaScript当时的主要用途是代替Perl等服务器端语言处理输入验证。



时间：1997年

语言：JavaScript 1.1

事件：JavaScript 1.1 作为提案被提交给欧洲计算机制造商协会（Ecma）。第39技术委员会（TC39）承担了“标准化一门通用、跨平台、厂商中立的脚本语言的语法和语义”的任务。

TC39委员会成员：网景、Sun、微软、Borland、Nombas和其他工程师。

解决痛点：微软IE的JScript和网景Navigator的JavaScript两个版本并存，导致脚本语言的未规范语法和特性的标准问题更加突出，最后JavaScript踏上了标准化的路程。



时间：1998年

事件：国际标准化组织（ISO）和国际电工委员会（IEC）也将ECMAScript采纳为标准（ISO/IEC-16262）。自此各家浏览器均以ECMAScript作为自己JavaScript实现的依据。



### 1.2 JavaScript的实现

JavaScript包含：ECMAScript规范、DOM（文档对象模型）、BOM（浏览器对象模型）

#### 1.2.1 ECMAScript版本

- **ECMA-262 第3版**
  - 更新字符串处理、错误定义和数值输出。还增加了正则表达式、新的控制语句、`try/catch`异常处理的支持。标志着ECMAScript作为一门真正的编程语言的时代到来。
- **ECMA-262 第5（4）版**（ES5）
  - 发布时间：2009年12月3日
  - 强类型变量、新语句、数据结构、真正的类、类的继承、以及操作数据的手段。 --- > ==改动被废弃==
  - 于此同时TC39委员会的一个子委员会提出了另外一份提案，叫“ECMAScript 3.1”，只对这门语言进行了较少的改动，子委员会认为4版本对于JavaScript跳跃太大了。
  - 最后ECMA-262第4版在正式发布前被放弃，而3.1版本也变成了第5版本。俗称ES5。
  - 3.1版本改动：原生的解析和序列化JSON数据的==JSON对象==、方便继承和高级属性定义的方法（==原型链==）、增强ECMAScript引擎解释和执行代码能力的严格模式（`'use strict'`，严格模式的开启存在作用域）。
- **ECMA-262 第6版**（ES6、ES2015、ES Harmony）
  - 发布时间：2015年6月
  - 支持了类（`class`）、模块（`import`和`export`）、迭代器（`entries`）、生成器（`yield`）、箭头函数、期约、反射、代理（`Proxy`）和众多新的数据类型（`let`、`const`）。
- **ECMA-262 第7版**（ES7、ES2016）
  - 发布时间：2016年6月
  - 少量语法层面的增强，如`Array..prototype.includes`和指数操作符（==2**2=4==）。
- **ECMA-262 第8版**（ES8、ES2017）
  - 发布时间：2017年6月
  - 增加了异步函数（`async/await`）、`SharedArrayBuffer`及Atomics API，以及`Object.values()/Object.entries()/Object.getOwnPropertyDescriptors()`和字符串填充方法，明确支持对象字面量最后的逗号（==let a,b,c;==）。
- **ECMA-262 第9版**（ES9、ES2018）
  - 发布时间：2018年6月
  - 修订包括异步迭代、剩余和扩展属性、一组新的正则表达式特性、==Promise finally()==，以及模板字面量修订。
- **ECMA-262 第10版**（ES10、ES2019）
  - 发布时间：2019年6月
  - 修订增加`Array.prototype.flat().flatMap()`、`String.prototype.trimStart()/trimEnd()`、`Object.fromEntries()`方法，以及`Symbol.prototype.decription`属性，明确定义了`Function.prototype.toString()`的返回值并固定了`Array.prototype.sort()`的顺序。解决了与JSON字符串兼容的问题，并定义了catch子句的可选绑定。



#### 1.2.2 ECMAScript符合性

1. 支持ECMA-262中描述的所有“类型、值、对象、属性、函数”，以及程序语法和语义。
2. 支持Unicode字符标准。
3. 增加ECMA-262中未提及的“额外的类型、值、对象、属性和函数”。ECMA-262所说的这些额外内容主要指规范中未给出的新对象或对象的新属性。
4. 支持ECMA-262中没有定义的“程序和正则表达式语法”（意思是允许修改和扩展内置的正则表达式特性）。

#### 1.2.3 DOM

​		文档对象模型（DOM，Document Object Model）是一个应用编程接口。通俗的来说就是控制网页的内容和结构。使用DOM API可以轻松的对文档节点进行CRUD。

#### 1.2.4 BOM

​		浏览器对象模型（BOM，Browser Object Model），用于支持访问和操作浏览器的窗口。使用BOM，开发者能操控浏览器显示页面之外的部分。

浏览器的扩展

- 弹出新浏览器窗口的能力。
- 移动、缩放和关闭浏览器窗口的能力。
- `navigator`对象，提供关于浏览器的详尽信息。
- `location`对象，提供浏览器加载页面的详尽信息。
- `screen`对象，提供关于用户屏幕分辨率的详尽信息。
- `performance`对象，提供浏览器内存占用、导航行为和时间统计的详尽信息。
- 对`cookie`的支持。
- 其他自定义对象，如`XMLHttpRequest`和IE的`ActiveXObject`。



## 第二章 HTML中的JavaScript

### 2.1 <script\>元素

> ​		按照惯例，外部JavaScript文件的扩展名是.js。这不是必需的，因为浏览器不会检查所包含JavaScript文件的扩展名。
>
> ​		不过要注意，服务器经常会根据文件扩展来缺点响应的正确MIME类型。如果不打算使用.js扩展名，一定要确保服务器能返回正确的MIME类型。

- **async**：可选。脚本资源的异步执行，仅外部脚本文件有效。
  - 表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载。
- **charset**：可选。使用src属性指定的代码字符集。<!--很少用，大多浏览器不在乎它的值 -->
- **crossorigin**：可选。配置相关请求的CORS（跨源资源共享）设置。默认不使用CORS。
  - crossorigin，==> crossorigin="anonymous"
  - crossorigin="use-credentials"设置凭据标志，意味着出站请求会包含凭据。Access-Control-Allow-Origin中的header需包含该凭据。
- **==defer==**：可选。该属性等同于`window.onload`，等待页面加载完毕后加载该脚本文件。
  - 表示脚本可以延迟到文档完全被解析和显示之后再执行。支队外部脚本文件有效。在IE7及更早的版本中，对行内脚本也可以指定这个属性。
- **integrity**：可选。这个属性可以用于确保内容分发网络（CDN，Content Delivery Network）不会提供恶意内容。
  - 允许比对接收到的资源和指定的加密签名以验证子资源完整性（SRI）。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。
- **src**：引用外部脚本文件地址。
- **type**：按照惯例始终都是"text/javascript"，如果值为module，则代码会被当成ES6模块，这时候才能使用import和export。

### 2.2 动态加载脚本

> ​		所有的浏览器都支持createElement方法，但async属性不行。
>
> ​		通过下述代码动态添加`gibberish.js`脚本文件可能会严重影响性能。要想让预加载器知道这些动态请求文件的存在，可以在文档头部显式声明它们：`<link rel="preload" href="gibberish.js">`

```js
let script = document.createElement('script');
script.src = 'gibberish.js';
script.async = false;
document.head.appendChild(script);
```



### 2.3 文档模式

> 不用赘述了，IE将在2022年6月15日退出舞台😊。

最初的文档模式有两种：混杂模式（quirks mode）和标准模式（standards mode）。

混杂模式：让IE像IE5一样（支持一些非标准的特性）

标准模式：让IE具有兼容标准的行为。

后来有出现了准标准模式，通过过渡性文档类型（Transitional）和框架集文档类型（Frameset）来触发。

```html
<!-- HTML 4.01 Transitional -->
<!DOCTYPE HTML PUBLIC
"-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">

<!-- HTML 4.01 Frameset -->
<!DOCTYPE HTML PUBLIC
"-//W3C//DTD HTML 4.01 Frameset//EN"
"http://www.w3.org/TR/html4/frameset.dtd">
```



### 2.4 <noscript\>元素

`<noscript>`标签显示的条件：1、浏览器不支持脚本。2、浏览器对脚本的支持被关闭。

```html
<body>
    <noscript>
    	<p>This page requires a JavaScript-enabled browser.</p>
    </noscript>
</body>
```



## 第三章 语言基础

### 3.1 var关键字

> var 关键字的变量可以在该作用域中被优先声明，但存在作用域。

```js
function test(){
   var msg = "hi";   // 局部变量
}
test();
console.log(msg);  // 出错！！！
```

> 未被任何关键字修饰的变量将被绑定在`window`上，为全局变量，任何地方都可使用。（不推荐使用，在`"use strict"`作用域中会报错。）

```js
function test(){
    msg = "hi";   // 全局变量，等同于 window.msg = "hi";
}
test();
console.log(msg); // "hi"
```

### 3.2 var与let声明

> var声明的范围是函数作用域，let声明的范围是块级作用域。

```js
if(true){
   var a = 123;
}
console.log(a);  // 123

if(true){
   let a = 123;
}
console.log(a);  // a is not defined
```

### 3.3 数据类型

​		ESMAScript有6种简单数据类型（也成为**原始类型**）：Undefined、Null、Boolean、Number、String和Symbol。

#### 3.3.1 Undefined 类型

被声明或未被声明且未赋值的变量的初始字面量都为undefined。

#### 3.3.2 Null 类型

1. Null类型同样只有一个值，即特殊值`null`。逻辑上讲，`null`值表示一个空对象指针，这也是给`typeof`传一个`null`会返回"object"的原因。

```js
let car = null;
console.log(typeof car);  // "object"
```

2. `undefined`值是由`null`值派生而来的，因此ECMA-262将它们定义为表面上相等。

```js
console.log(null == undefined); // true
```

3. `undefined`与`null`均为假值。

```js
if (undefined) {
    console.log(1);   // 不会执行
}
if (null) {
    console.log(2);  // 不会执行
}
```

#### 3.3.3 Boolean 类型

| 数据类型  |     转化为true的值     | 转换为false的值 |
| :-------: | :--------------------: | :-------------: |
|  Boolean  |          true          |      false      |
|  String   |       非空字符串       | ""（空字符串）  |
|  Number   | 非零数值（包括无穷值） |     0、NaN      |
|  Object   |        任意对象        |      null       |
| Undefined |     N/A（不存在）      |    undefined    |

#### 3.3.4 Number 类型

​		isNaN()函数：该函数接收一个参数，可以是任意数据类型，然后判断这个参数是否“不是数值”。把一个值传给isNaN()后，该函数会尝试把它转换为数值。==任何不能转换为数值的值都会导致这个函数返回true。==

```js
console.log(isNaN(NaN)); // true
console.log(isNaN(10)); // false, 10是数值
console.log(isNaN("10")); // false, 可以转换为数值10
console.log(isNaN("blue")); // true，不可以转换为数值
console.log(isNaN(true)); // false，可以转换为数值1
```



```js
parseInt("1234blue");  // 1234
parseInt("");  // NaN
parseInt("0xA"); // 10，解释为十六进制整数
parseInt(22.5); // 22
parseInt("70"); // 70, 解释为十进制值
parseInt("0xf");  // 15，解释为十六进制整数
```

```js
parseInt("10", 2);  // 二进制
parseInt("10", 8);  // 八进制
parseInt("10", 10); // 十进制
parseInt("10", 16); // 十六进制
```

#### 3.3.5 String 类型

1. **字符字面量**

| 字面量 | 含义        |
| :----- | ----------- |
| \n     | 换行        |
| \t     | 制表        |
| \b     | 退格        |
| \r     | 回车        |
| \f     | 换页        |
| \\\    | 反斜杠（\） |
| \\'    | 单引号（'） |

2. **String函数**遵循以下原则：

   - 如果值有toString()方法，则调用该方法（不传参数）并返回结果。

   - 如果值为null，返回"null"。

   - 如果值为undefined，返回"undefined"。

```js
console.log( String(10) ); // "10"
console.log( String(true) ); // "true"
console.log( String(null) ); // "null"
console.log( String(undefined) ); // "undefined"
```

3. **模板字符串**

```js
let template = `
    first code
    second code
`;
console.log(template[0] === '\n');  // true

template = template.trim();
console.log(template[0] === '\n');  // false

let template = `
    first code
    second code
`.trim();
console.log(template[0] === '\n');  // false
```

4. **模板字面量标签函数**

> 模板字面量也支持定义**标签函数**，而通过标签函数可以自定义插值行为。标签函数会接收被插值记号分割后的模板和对每个表达式求值的结果。

```js
let a1 = 6;
let b1 = 9;

function simpleTag(strings, aValExpression, bValExpression, sumExpression) {
    console.log(strings);
    console.log(aValExpression, bValExpression, sumExpression);
    return 'foobar'
}

let untaggedResult = `${a1} + ${b1} = ${a1 + b1}`; 
console.log('untaggedResult ===> ' + untaggedResult); // untaggedResult ===> 6 + 9 = 15 

let taggedResult = simpleTag`${a1} + ${b1} = ${a1 + b1}`;
console.log('taggedResult ===> ' + taggedResult);
/*
    [ '', ' + ', ' = ', '' ]  <=== 将标签函数的字符串提取出来放在一个数组里，每隔一个${}占位符就提取一个字符串存放在数组里，如果中间没有${}将会被当成一个字符串放入数组。       
   	6 9 15 <=== ${}中的数据对应着函数的参数                               
    taggedResult ===> foobar  <=== 函数返回值
*/
```

```js
let a = 1, b = 2;

function simpleTag2(strings, ...arg) {
    console.log(strings);  // [ '', '+', '=', '' ]
    console.log(arg);  // [1, 2, 3]
}

simpleTag2`${a}+${b}=${a + b}`
```

#### 3.3.6 Symbol 类型

​	Symbol（符号）是ECMAScript6新增的数据类型。符号是原始值，且符号实例是唯一、不可变的。符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险。

- **`Symbol.asyncIterator`**

  - > ​		根据ECMAScript规范，这个符号作为一个属性表示“一个方法，该方法返回对象默认的`AsyncIterator`。由`for-await-of`语句使用”。简言之，这个符号表示实现==**异步迭代器API**==的函数。
    >
    > ​		技术上，这个由`Symbol.asyncIterator`函数生成的对象应该通过`next()`方法路线返回`Promise`实例。可以通过显示地调用`next()`方法返回，也可以隐式地通过异步生成器函数返回。

  - ```js
    class Emitter {
        constructor(max) {
            this.max = max;
            this.asyncIdx = 0;
        }
    
        async* [Symbol.asyncIterator]() {
            while (this.asyncIdx < this.max) {
                yield new Promise((resolve => resolve(this.asyncIdx++)));
            }
        }
    }
    
    async function asyncCount() {
        let emitter = new Emitter(5);
        for await (const x of emitter) {
            console.log(x);
        }
    }
    
    asyncCount();  // 0 \n 1 \n 2 \n 3 \n 4
    
    ```

- **`Symbol.iterator`**

  - > 操作与`Symbol.asyncIterator`一致，不同是它不是异步迭代。

  - ```js
    class Emitter {
        constructor(max){
           this.max = max;
           this.idx = 0;
        }
        *[Symbol.iterator](){
            while(this.idx < this.max){
                yield this.idx++;  // 配合生成器重构迭代器API
            }
        }
    }
    
    (()=>{
        let emitter = new Emitter(5);
        for(const e of emitter){
            console.log(e);
        }
    })
    ```

- **`Symbol.hasInstance`**

  - > ​		根据ECMAScript规范，这个符号作为一个属性表示“一个方法，该方法决定一个构造器对象是否认可一个对象是它的实例。由`instanceof`操作符使用”。`instanceof`操作符可以用来确定一个对象实例的原型链上是否有原型。

  - ```js
    // 一般用法
    function Foo(){}
    let f = new Foo();
    console.log(f instanceof Foo); // true
    
    class Bar{}
    let b = new Bar();
    console.log(b instanceof Bar); // true
    
    =====================================================================
    
    // 在ES6中
    function Foo(){}
    let f = new Foo();
    console.log(Foo[Symbol.hasInstance](f));  // true
    
    class Bar{}
    let b = new Bar();
    console.log(Bar[Symbol.hasInstance](b)); // true
    
    =====================================================================
        
    // 通过静态方法重新定义这个函数
    class Baz extends Bar {
        static [Symbol.hasInstance]() {
            return false
        }
    }
    
    let b2 = new Baz();
    console.log(Baz[Symbol.hasInstance](b2));  // false
    ```

- **`Symbol.isConcatSpreadable`**

  - > ​		根据ECMAScript规范，这个符号作为一个属性表示“一个布尔值，如果是true，则意味着对象应该用`Array.prototype.concat()`打平其数组元素”。ES6中的`Array.prototype.concat()`方法会根据接收到的对象类型选择如何将一个类数组对象拼接成数组实例。

  - ```js
    // Symbol.isConcatSpreadable
    let initial = ['foo'];
    let array = ['bar'];
    
    console.log(array[Symbol.isConcatSpreadable]);  // undefined
    console.log(initial.concat(array)); // ['foo', 'bar']
    array[Symbol.isConcatSpreadable] = false;
    console.log(initial.concat(array)); // [ 'foo', [ 'bar', [Symbol(Symbol.isConcatSpreadable)]: false ] ]
    
    let newArr = initial.concat(array);
    // array的Symbol.isConcatSpreadable属性被设置为false后，合并数组时，它始终会被当作一个数组对象合并。
    // 因为它从数组被打平成一个元素
    console.log(Array[Symbol.hasInstance](newArr[0])); // false
    console.log(Array[Symbol.hasInstance](newArr[1])); // true
    ```

- **`Symbol.match`**

  - > ​		根据ECMAScript规范，这个符号作为一个属性表示“一个正则表达式方法，该方法用正则表达式去匹配字符串。由`String.prototype.match()`方法使用”。

  - ```js
    // 直接调用match它将返回一个RegExp对象。如果想改变这种行为，使用重新定义Symbol.match函数，以取代默认对正则表达式求值的行为。
    console.log(RegExp.prototype[Symbol.match]); // [Function: [Symbol.match]]
    console.log('foobar'.match(/bar/)); // [ 'bar', index: 3, input: 'foobar', groups: undefined ]
    
    // 通过静态方法重新定义
    class FooMatcher {
    	static [Symbol.match](target){
            return target.includes('foo');
        }
    }
    console.log('foobar'.match(FooMatcher)); // true
    console.log('barbaz'.match(FooMatcher)); // false
    
    
    class StringMatcher {
        constructor(str) {
            this.str = str;
        }
    
        [Symbol.match](target) {
            return target.includes(this.str)
        }
    }
    
    console.log('foobar'.match(new StringMatcher('foo'))); // true
    console.log('barbaz'.match(new StringMatcher('foo'))); // false
    ```

- **`Symbol.replace`**

  - > ​		根据ECMAScript规范，这个符号作为一个属性表示“一个正则表达式方法，该方法替换一个字符串中匹配的子串。由`String.prototype.replace()`方法使用”。用法同上。

- **`Symbol.search`**

  - > ​		根据ECMAScript规范，这个符号作为一个属性表示“一个正则表达式方法，该方法返回字符串中匹配正则表达式的索引。由`String.prototype.search()`方法使用”。用法同上。

- **`Symbol.split`**

  - > ​		根据ECMAScript规范，这个符号作为一个属性表示“一个正则表达式方法，该方法在匹配正则表达式的索引位置拆分字符串。由`String.prototype.split()`方法使用”。用法同上。

- **`Symbol.toPrimitive`**

  - > ​		根据ECMAScript规范，这个符号作为一个属性表示“一个方法，该方法将对象转换为相应的原始值。由ToPrimitive抽象操作使用”。
    >
    > ​		根据提供这个函数的参数（string、number或default），可以控制返回的原始值。

  - ```js
    let foo3 = new Foo3();
    console.log(3 + foo3); // 3[object Object]
    console.log(3 - foo3); // NaN
    console.log(String(foo3)); // [object Object]
    
    class Bar3 {
        constructor() {
            this[Symbol.toPrimitive] = function(hint){
                switch (hint) {
                    case 'number':
                        return 3;
                    case 'string':
                        return 'String bar';
                    case 'default':
                    default:
                        return 'Default bar';
                }
            }
        }
    }
    
    let bar3 = new Bar3();
    console.log(3 + bar3); // 3Default bar
    console.log(3 - bar3);  // 0
    console.log(String(bar3));  // String bar
    ```


#### 3.3.7 Object 类型

- 每个`Object`实例都有如下属性和方法：
  - `constructor`：用于创建当前对象的函数。这个属性的值接收Object()函数。
  - `hasOwnProperty(propertyName)`：用于判断当前对象实例（不是原型）上是否存在给定的属性。要检查的属性名不行是字符串（如`obj.hasOwnProperty("name")`）或符号。
  - `isPrototypeOf(Object)`：用于判断当前对象是否为另一个对象的原型。
  - `propertyIsEnumerable(propertyName)`：用于判断给定的属性是否可以使用`for-in`语句枚举。与`hasOwnProperty()`一样，属性名必须是字符串。
  - `toLocaleString()`：返回对象的字符串表示，该字符串反映对象所在的本地化执行环境。
  - `toString()`：返回对象的字符串表示。
  - `valueOf()`：返回对象对应的字符串、数值或布尔值表示。通常与`toString()`的返回值相同。



### 3.4 操作符

#### 3.4.1 逻辑非

```js
console.log(!false);  // true
console.log(!0);  // true
console.log(!NaN); // true
console.log(!""); // true
console.log(!undefined); // true

console.log(!Infinity); // false
console.log(!12345); // false
console.log(!'blue');  // false
console.log(!{}); // false
console.log(![])  // false
```

#### 3.4.2 关系操作符

- 如果操作数都是数值，则执行数值比较。
- 如果操作数都是字符串，则逐个比较字符串中对应字符的编码。
- 如果有任一操作数是数值，则将另一个操作数转换为数值，执行数值比较。
- 如果有任一操作数是对象，则调用其`valueOf()`方法，取得结果后再根据前面的规则执行比较。如果没有`valueOf()`方法，则调用`toString()`方法，取得结果后再根据前面的规则执行比较。
- 如果有任一操作数是布尔值，则将其转换为数值再执行比较。

#### 3.4.3 相等操作符

> ​		从逻辑上将，`null`是一个空指针对象，而`undefined`是`null`的派生类型，因此ECMA-262将它们定义为表面上相等。

```js
console.log(null == undefined); // true
console.log(null === undefined); // false
```

- 如果任一操作数是布尔值，则将其转换为数值再比较是否相等。`false`转换为0，`true`转换为1。
- 如果一个操作数是字符串，另一个操作数是数值，则尝试将字符串转换为数值，再比较是否相等。
- 如果一个操作数是对象，另一个操作数不是，则调用对象的`valueOf()`方法取得其原始值，再根据前面的规则进行比较。
- 在进行比较时，这两个操作符会遵循如下规则：
  - `null`和`undefined`形式上相等，但不全等。因为它们不是相同的数据类型。
  - `null`和`undefined`不能转换为其他类型的值再进行比较。
  - 如果有任一操作数是`NaN`，则相等操作数返回`false`，不相等操作数返回`true`。==记住：即使两个操作数都是`NaN`，相等操作符返回`false`，因为按照规则，`NaN`不等于`NaN`==。(若要判断一个数是否为`NaN`，可用使用`isNaN()`方法)
  - 如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回`true`。否则，两者不相等。（==比较两个对象的指针指向的地址是否为同一个==）

<!-- 由于相等和不相等操作符存在类型转换问题，因此推荐使用全等和不全等操作符。这样有助于在代码中报错数据类型的完整性。 -->



### 3.5 语句

#### 3.5.1 for-in语句

> ​		`for-in`语句是一种严格的迭代语句，用于==枚举对象==中的非符号==键属性==。如果`for-in`循环要迭代的变量是`null`或`undefined`，则不执行循环体。

#### 3.5.2 for-of语句

> `for-of`语句是一种严格的迭代语句，用于遍历==可迭代对象==的元素。（Set、Array、String）



## 第四章 变量、作用域与内存

### 4.1 原始值与引用值

​		ECMAScript变量可用包含两种不同类型的数据：原始值和引用值。**原始值（primitive value）**就是最简单的数据，**引用值（reference value）**则是由多个值构成的对象。

​		在操作对象时，实际上操作的是对该对象的**引用**而非实际的对象本身。为此，保存引用值的变量是**按引用**访问的。

#### 4.1.1 动态属性

​		原始值和引用值的定义方式很类似。不过，变量保存了这个值之后，可以对这个值做什么，则大有不同。对于引用值而言，可以随时添加、修改和删除其属性和方法。而原始值不能有属性，尽管尝试给原始值添加属性不会报错。

```js
let person = new Object();
person.name = 'zhangsan';
console.log(person.name); // "zhangsan"

let name = "zhangsan";
name.age = 20;
console.log(name.age);  // undefined

// 使用new关键字创建一个Object类型的实例，其行为类似原始值。
let name1 = new String('zhangsan');
name1.age = 20;
console.log(name1.toString(), name1.age); // zhangsan 20
```



#### 4.1.2 const声明与对象

> ​		关于`const`声明与对象，被const声明后必须有初始化值，原始值被`const`声明后，不能再被修改值。而引用值被`const`声明后只能保证它的指针不被修改，其对象的属性不受限制。若要让整个对象不被修改，可以使用`Object.freeze()`方法冻结对象，这样即使给该对象的属性进行操作也会被忽略，但不报错。

```js
const obj = {
    name: '张三',
    age: 20
}
obj.name = '李四';
console.log(obj); // { name: '李四', age: 20 }  

Object.freeze(obj);  // 冻结对象
obj.name = '王五';
console.log(obj); // { name: '李四', age: 20 }  
```



### 4.2 作用域链

#### 4.2.1 标识符查找

​		如果在局部上下文中找到该标识符，则搜索停止，变量确定；如果没有找到变量名，则继续沿作用域链搜索。（注意，作用域链中的对象也有一个原型链，因此搜索可能涉及每个对象的原型链。）这个过程一直持续到搜索至全局上下文的变量对象。如果仍然没有找到标识符，则说明其未声明。（**简单来说，当你要用一个变量时，首先会在局部作用域中查找是否有这个变量，如果找到就停止，反之就向更大的作用域中查找同名变量，直至找到。若不存在，则返回该变量未被声明。该查找是一个由内向外的。**）

```js
let color = 'blue';
function getColor(){
    return color;
}

console.log(getColor()); // "blue"

=========================================

let color = 'blue';
function getColor(){
    let color = 'red';
    return color;
}

console.log(getColor()); // "red"
```



### 4.3 垃圾回收

​		JavaScript是使用垃圾回收的语言，也就是说执行环境负责在代码执行时管理内存。基本思路：确定哪个变量不会再使用，然后释放它占用的内存。这个过程是周期性的，即垃圾回收程序每隔一定时间（或者说在代码执行过程中某个预定的收集时间）就会自动运行。

#### 4.3.1 标记清理

​		JavaScript最常用的垃圾回收策略是**标记清理（mark-and-sweep）**。当变量进入上下文，比如在函数内部声明一个变量时，这个变量会被加上存在于上下文中的标记。而在上下文中的变量，逻辑上讲，永远不应该释放它们的内存，因为只要上下文中的代码在执行，就有可能用到它们。当变量离开上下文时，也会被加上离开上下文的标记。

#### 4.3.2 引用计数

​		另一种没那么常用的垃圾回收策略是**引用计数（reference counting）**。

​		其思路是对每个值都记录它被引用的次数。声明变量并给它赋一个引用值，这个值的引用数为1。如果同一个值又被赋给另一个变量，那么引用数加1。

​		类似地，如果保存对该值引用的变量被其他值给覆盖了，那么引用数减1.当一个值的引用数为0时，就说明没法再访问到这个值了，因此可以安全地收回其内存了。垃圾回收程序下次运行的时候就会释放引用数为0的值的内存。

​		引用计数最早由Netscape Navigator 3.0 采用，但很快就遇到了严重的问题：循环引用。所谓**循环引用**，就是对象A有一个指针指向对象B，而对象B也引用了对象A。

```js
function problem(){
    let objA = new Object();
    let objB = new Object();
    
    objA.someOtherObject = objB;
    objB.anotherObject = objA;
}
```



## 第五章 基本引用类型

### 5.1 RegExp

- g：全局模式，表示查找字符串的全部内容，而不是找到第一个匹配的内容就结束。
- i：不区分大小写，表示在查找匹配时忽略pattern和字符串的大小写。
- m：多行模式，表示查找到一行文本末尾时会继续查找。
- y：粘附模式，表示只查找从`lastIndex`开始及之后的字符串。
- u：Unicode模式，启用Unicode匹配。
- s：`dotAll`模式，表示元字符`.`匹配任何字符（包括`\n`或`\r`）。

|     全名     | 简写 |                  说明                  |
| :----------: | :--: | :------------------------------------: |
|    input     |  $_  |     最后搜索的字符串（非标准特性）     |
|  lastMatch   |  $&  |             最后匹配的文本             |
|  lastParen   |  $+  |     最后匹配的捕获组（非标准特性）     |
| leftContext  |  $`  | input字符串中出现在lastMatch前面的文本 |
| rightContext |  $'  | input字符串中出现在lastMatch后面的文本 |



### 5.2 String

#### 5.2.1 字符串提取方法

​		ECMAScript提供了3个从字符串中提取子字符串的方法：`slice()`、`substr()`、`substring()`。（`strstr()`不推荐使用，已被废弃。）

```js
let str = 'hello world';
console.log(str.slice(3)); // lo world
console.log(str.substring(3)); // lo world
console.log(str.substr(3)); // lo world

console.log(str.slice(3, 7)); // lo w
console.log(str.substring(3, 7)); // lo w
console.log(str.substr(3, 7));  // lo worl

============================================================

console.log(str.slice(-3)); // rld
console.log(str.substring(-3)); // hello world
console.log(str.substr(-3)); // rld

console.log(str.slice(3, -4)); // lo w
console.log(str.substring(3, -4)); // hel 
console.log(str.substr(3, -4));  // '' (empty string)
```

#### 5.2.2 字符串位置方法

​		用于在字符串中定位子字符串：`indexOf()`和`lastIndexOf()`。区别在于`indexOf()`从头开始查找子字符串，`lastIndexOf()`从末尾查找子字符串。返回-1表示未找到。

```js
let str = 'hello world';
console.log(str.indexOf('o'));  // 4
console.log(str.lastIndexOf('o')); // 7

console.log(str.indexOf('o', 6)); // 7
console.log(str.lastIndexOf('o', 6)); // 4
```

#### 5.2.3 padStart() 和 padEnd() 方法

```js
let s = 'foo';
console.log(s.padStart(4)); //  " foo"
console.log(s.padStart(4, 'a')); // "afoo"

console.log(s.padEnd(4)); // "foo "
console.log(s.padEnd(4, 'a')); // "fooa"
```

#### 5.2.4 字符串迭代与解构

> 注意：字符串迭代器生成后，无论是手动`next()`方法迭代，还是`...`解构，字符串的迭代都是一次性的。然而`msg[Symbol.iterator]()`有点多余了，直接解构也可以，它会调用原型上的`@@iterator`方法。

```js
let msg = 'hello world';

// 字符串迭代
let strIterator = msg[Symbol.iterator]();
console.log(strIterator.next()); // { value: 'h', done: false }
console.log(strIterator.next()); // { value: 'e', done: false }

// 字符串遍历
for (const s of msg) {
    console.log(s)
}

// 字符串解构
let strIterator2 = msg[Symbol.iterator]();
console.log(...strIterator2); // h e l l o   w o r l d
console.log(...msg); // h e l l o   w o r l d
console.log([...strIterator2]) // []
console.log([...msg]); // ['h', 'e', 'l', 'l', ' ', 'w', 'o', 'r', 'l', 'd']
```



## 第六章 集合引用类型

### 6.1 Array

#### 6.1.1 创建数组的静态方法

​		Array构造函数有两个ES6新增的用于创建数组的静态方法：`from()`和`of()`。`from()`用于将类数组结构转换为数组实例，而`of()`用于将一组参数转换为数组实例。

> `from()`方法：
>
> ​	参数一：对象。
>
> ​	参数二：回调函数。
>
> ​	参数三：对象。该对象中的值可以在参数二中通过`this`获取。
>
> 最终返回的对象始终为数组对象。

```js
let arr = [1, 2, 3];
console.log(Array.from(arr, x => x * 2));  // [ 2, 4, 6 ]
// [ 1, 4, 9 ]
console.log(Array.from(arr, function(x) {return x**this.exponent}, {exponent: 2}));
```

- 字符串转换数组

  - ```js
    let msg = 'hello';
    console.log(Array.from(msg)); // [ 'h', 'e', 'l', 'l', 'o' ]
    console.log(Array.of(msg)); // [ 'hello' ]
    ```

- Map集合转换数组

  - ```js
    let map = new Map();
    map.set('name', '张三');
    map.set('age', 20);
    map.set('map2', new Map().set('hobby', '打游戏'));
    
    // 将map转为二维数组，只转换第一层map
    // [ [ 'name', '张三' ], [ 'age', 20 ], [ 'map2', Map(1) { 'hobby' => '打游戏' } ] ]
    console.log(Array.from(map)); 
    
    
    // 将map直接放入数组中
    // [ Map(2) { 'name' => '张三', 'age' => 20 }, 'map2' => Map(1) { 'hobby' => '打游戏' }]
    console.log(Array.of(map)); 
    
    
    /*
    	将map的键值对合成了一个数组，作为回调函数的参数一，参数二为数量。
    	[                                                 
          { key: 'name', value: '张三', order: 0 },       
          { key: 'age', value: 20, order: 1 },
          { key: 'map2', value: Map(1) { 'hobby' => '打游戏' }, order: 2 }
        ]
    
    */
    console.log(Array.from(map, function ([keyObj, val], index) {
        return {key: keyObj, value: val, order: index};
    }));
    ```

- Set集合转换数组

  - ```js
    let set = new Set();
    set.add('张三');
    set.add('李四');
    set.add(new Set().add('王五'));
    
    console.log(Array.from(set)); // [ '张三', '李四', Set(1) { '王五' } ]
    console.log(Array.of(set)); // [ Set(3) { '张三', '李四', Set(1) { '王五' } } ]
    
    /*
    	[
          { value: '张三', order: 0 },
          { value: '李四', order: 1 },
          { value: Set(1) { '王五' }, order: 2 }
        ]
    
    */
    console.log(Array.from(set, function (val, index) {
        return {value: val, order: index}
    }));
    ```

- Objcet对象

  - ```js
    let obj = {
        0: '张三', 
        1: 20, 
        2: '男', 
        length: 3  // 必要属性
    };
    console.log(Array.from(obj)); // [ '张三', 20, '男' ]   
    ```

#### 	6.1.2 数组的迭代

​		在ES6中，Array的原型上暴露了3个用于检索数组内容的方法：`keys()`、`values()`和`entries()`。

​		`keys()`返回数组索引的迭代器

​		`values()`返回数组元素的迭代器

​		`entries()`返回索引/值对的迭代器

```js
let arr2 = ['foo', 'bar', 'baz'];
console.log(Array.from(arr2.keys())); // [ 0, 1, 2 ]
console.log(Array.from(arr2.values())); // [ 'foo', 'bar', 'baz' ]
console.log(Array.from(arr2.entries())); // [ [ 0, 'foo' ], [ 1, 'bar' ], [ 2, 'baz' ] ]

// 使用ES6的解构配合for-of遍历数组
/*
    0 foo
    1 bar
    2 baz
*/
for (const [idx, ele] of arr2.entries()) {
    console.log(idx, ele); 
}
```



#### 6.1.3 数组的填充和复制

​		ES6新增了两个方法：批量复制方法`copyWithin()`，以及填充数组方法`fill()`。这两个方法的函数签名类似，都需要指定既有数组实例上的一个范围，包含开始索引，不包含结束索引。使用这个方法不会改变数组的大小。

- `fill()`填充

```js
let arr3 = [0, 0, 0, 0, 0]
// 用5填充整个数组
console.log(arr3.fill(5)); // [ 5, 5, 5, 5, 5 ]

arr3.fill(0);
// 用6填充索引大于等于3的元素
console.log(arr3.fill(6, 3)); // [ 0, 0, 0, 6, 6 ]

arr3.fill(0);
// 用7填充索引大于等于1且小于3的元素
console.log(arr3.fill(7, 1, 3)); // [ 0, 7, 7, 0, 0 ]

arr3.fill(0);
// 用8填充索引大于等于1且小于4的元素
// (-4 + arr3.length = 1)
// (-1 + arr3.length = 4)
console.log(arr3.fill(8, -4, -1)); // [ 0, 8, 8, 8, 0 ]
```

- `copyWithin()`复制

```js
let getArr = () => {return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
// 复制索引0开始的内容，插入到索引5开始的位置。
console.log(getArr().copyWithin(5)); // [0, 1, 2, 3, 4, 0, 1, 2, 3, 4]

// 复制索引5开始的内容，插入到索引0开始的位置
console.log(getArr().copyWithin(0, 5)); // [5, 6, 7, 8, 9, 5, 6, 7, 8, 9]

// 复制索引0开始到索引3结束的内容，插入到索引4开始的位置
console.log(getArr().copyWithin(4, 0, 3)); // [0, 1, 2, 3, 0, 1, 2, 7, 8, 9]
```

#### 6.1.4 splice方法

- 删除。`splice(0, 2)`删除前两个元素。
- 插入。`splice(2, 0, 'red', 'green')`从数组索引2开始插入字符串"red"和"green"。
- 替换。`splice(2, 1, 'red', 'green')`会在数组索引2的位置删除一个元素，然后从该位置开始向数组中插入"red"和"green"。

#### 6.1.5 迭代方法

- `every()`：如果每一项函数都返回true，则这个方法返回true。
- `some()`：如果有一项函数返回true，则这个方法返回true。
- `filter()`：函数返回true的项会组成数组后返回一个新数组。
- `map()`：返回由每次函数调用的结果构成的数组。

#### 6.1.6 归并方法

​		ECMAScript为数组提供了两个归并方法：`reduce()`和`reduceRight()`。这两个方法都会迭代数组的所有项，并在此基础上构建一个最终返回值。

​		`reduce()`方法从数组第一项开始遍历到最后一项。

​		`reduceRight()`方法从最后一项开始遍历至第一项。

> `reduce()`与`reduceRight()`都是柯里化函数。其回调函数有四个参数。
>
> ​		参数一：prev。它的初始值是数组的第一个元素。第二次迭代开始它的值就是回调函数的返回值。
>
> ​		参数二：curr。它的初始值是数组的第二个元素。它的值从第二个元素开始直至最后一个元素。
>
> ​		参数三：index。数组的索引。
>
> ​		参数四：array。数组本身。

```js
let arr5 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let result = arr5.reduce((prev, curr, index, array)=> {
    return prev + curr;
});
console.log(result); // 55
```



### 6.2 Map

#### 6.2.1 基本API

```js
const m = new Map([
    ['key1', '张三'],
    ['key2', '李四'],
    ['key3', '王五']
]);
console.log(m); // Map(3) { 'key1' => '张三', 'key2' => '李四', 'key3' => '王五' }
console.log([...m[Symbol.iterator]()]); // [ [ 'key1', '张三' ], [ 'key2', '李四' ], [ 'key3', '王五' ] ]

console.log(...m.entries()); // [ 'key1', '张三' ] [ 'key2', '李四' ] [ 'key3', '王五' ]
console.log(Array.from(m.entries())); // [ [ 'key1', '张三' ], [ 'key2', '李四' ], [ 'key3', '王五' ] ]

// 自定义迭代器初始化映射
const m2 = new Map({
    [Symbol.iterator]: function* () {
        yield ['key1', '张三'];
        yield ['key2', '李四'];
        yield ['key3', '王五'];
    }
});
console.log(m2); // Map(3) { 'key1' => '张三', 'key2' => '李四', 'key3' => '王五' }
console.log(...m2); // [ 'key1', '张三' ] [ 'key2', '李四' ] [ 'key3', '王五' ]
```

#### 6.2.2 Object与Map的选择

> ​		对于多数Web开发任务来说，选择`Object`还是`Map`只是个人偏好问题，影响不大。不过对于在乎内存和性能的开发者来说，对象和映射之间确实存在显著的差别。（总结以下内容：`Map`比`Object`性能更佳）

1. **内存占用**

​		`Object`和`Map`的工程级实现在不同浏览器间存在明显差异，但存储单个键/值对所占用的内存数量都会随键的数量线性增加。批量添加或删除键/值对则取决于各浏览器对该类型内存分配的工程实现。不同浏览器的情况不同，**但给定固定大小的内存，`Map`大约可以比`Object`多存储50%的键/值对。**

2. **插入性能**

​		向`Object`和`Map`中插入新键/值对的消耗大致相当，不过插入`Map`在所有浏览器中一般会稍微快一点儿。对这两个类型来说，插入速度并不会随着键/值对数量而线性增加。**如果代码涉及大量插入操作，那么显然`Map`的性能更佳。**

3. **查找速度**

​		与插入不同，从大型`Object`和`Map`中查找键/值对的性能差异极小，但如果只包含少量键/值对，则`Object`有时候速度更快。在把`Object`当成数组使用的情况下（比如使用连续整数作为属性），浏览器引擎可以进行优化，在内存中使用更高效的布局。这对`Map`来说是不可能的。对这两个类型而言，查找速度不会随着键/值对数量增加而线性增加。**如果代码涉及大量查找操作，那么某些情况下可能选择`Object`更好一些。**

4. **删除性能**

​		使用`delete`删除`Object`属性的性能一直以来饱受诟病，目前在很多浏览器中仍然如此。为此，出现了一些伪删除对象属性的操作，包括把属性值设置为`undefined`或`null`。但很多时候，这都是一种讨厌的或不适宜的折中。而对大多数浏览器引擎来说，`Map`的`delete()`操作都比插入和查找更快。**如果代码涉及大量的删除操作，那么毫无疑问应该选择`Map`**。

### 6.3 WeakMap

​		ES6 新增的“弱映射”(WeakMap) 是一种新的集合类型，为这门语言带来了增强的键/值对存储机制。`WeakMap`是`Map`的“兄弟”类型，其API也是`Map`的子集。`WeakMap`中的"weak"（弱），描述的是JavaScript垃圾回收程序对待“弱映射”中键的方式。

​		弱映射中的键只能是`Object`或者继承自`Object`的类型。即：引用类型作为键。

#### 6.3.1 基本API

```js
const wm = new WeakMap();
const key1 = {id: 1},
    key2 = {id: 2},
    key3 = {id: 3};
wm.set(key1, '张三');
wm.set(key2, '李四');
wm.set(key3, '王五');
console.log(wm.get(key1)); // 张三
console.log(wm.has(key2)); // true
console.log(wm.delete(key3)); // true

const k2 = new String('key2');
const wm2 = new WeakMap([
    [key1, 'val1'],
    [k2, 'val2'],
    [key3, 'val3']
]);
console.log(wm2.get(k2)); // val2
```

#### 6.3.2 弱键

​		`WeakMap`中“weak”表示弱映射的键是不属于正式的引用，不会阻止垃圾回收。但要注意的是，弱映射中值的引用，只要键存在，键/值对就会存在于映射中，并被当作对值的引用，因此就不会被当作垃圾回收。





