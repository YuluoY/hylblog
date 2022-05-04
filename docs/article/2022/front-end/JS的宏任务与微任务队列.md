# JS的宏任务与微任务队列

> ​		首先，明确一点。`JavaScript`是单线程，可以理解为公司领导给你分配一系列任务，需要你一个人单独完成，这时候一般来说就是从上自下的完成。
>
> ​		而主线程、微任务和宏任务就是你将这一系列任务分析后，对有些重要任务要先执行，其他的任务向后推，任务间有了主次之分。优先级：主线程任务 ---> 微任务 ---> 宏任务。
>
> ​		废话不多说，直接上代码！

## 主线程任务

> ​	以下代码为仅有主线程任务，属于最高级别，依次自上而下执行。你只要改变它们的行的顺序即可改变输出顺序。

```javascript
console.log(1);
console.log(2);
console.log(3);

// out：1 2 3
```



## 主线程任务 + 微任务

> ​		重点：`Promise.resolve()` 开启微任务队列。
>
> ​		当主线程中的任务执行完毕后，去微任务队列中查看是否存在未执行的任务，存在就转移到主线程中执行。

```javascript
Promise.resolve().then(() => { // 使用Promise.resolve()开启一个微任务队列
    console.log(2);
});
console.log(1); // 主线程任务

// out：1 2
```



## 主线程任务 + 微任务 + 宏任务

> ​		重点：`setTimeout()` 开启宏任务队列。
>
> ​		当主线程中的任务执行完毕后，查看微任务队列中是否有任务，存在任务就转移至主线程执行；微任务队列中的任务执行完毕后，查看宏任务队列中是否有任务，存在任务就转移至主线程执行。以下三个类型的任务无论怎样将代码位置变动都不会影响最后输出：1 2 3。

```javascript
setTimeout(() => {  // 宏任务
    console.log(3);
});
Promise.resolve().then(() => { // 微任务
    console.log(2);
});
console.log(1);  // 主任务

// out：1 2 3
```



## 练习

> ​		如下代码注释可知，我们将主任务队列定义为1，微任务队列定义为2，宏任务队列定义为3，其队列中的任务以小数点后的的数字计数。这时我们可以很快的得出程序执行顺序。

```javascript
console.log("script start"); // 1.1

setTimeout(() => { // 3.1
    console.log("setTimeout1");
}, 0);

new Promise((resolve, reject) => {
    setTimeout(() => {  // 3.2
        console.log("setTimeout2");
        resolve(); // 3.3
    }, 100);
}).then(() => {
    console.log("promise1");
});

Promise.resolve() //  2.1
    .then(() => {
        console.log("promise2");
    })
    .then(() => {
        console.log("promise3");
    });

console.log("script end"); // 1.2

/*
	out: "script start"
		"script end"
		"promise2"
		"promise3"
		"setTimeout1"
		"setTimeout2"
		"promise1"
*/
```



## 如何解决递归栈溢出问题？

> ​		递归也称为递回，就是说程序通过不断的压栈，只有当达到某个确定的条件后，继而对栈内中的方法进行逐个弹出调用。但是内存是有限的，假如我们不设置确定的条件或条件不能被栈满足，就会报`Uncaught RangeError: Maximum call stack size exceeded`栈溢出异常。

### 模拟

> ​		如下代码所示，我们通过递归，当`num <= targetNum`条件满足时，我们通过`callback`函数打印出`num`的值。但是，`targetNum`的值为10000，也就是说`num`每自增一次，就得向栈内压入一个`sum`函数。而10000个`sum`函数足以使栈溢出报错。

```javascript
function sum(num, targetNum, callback) {
    if (num <= targetNum) {
       sum(++num, targetNum, () => console.log(num));
       if (typeof callback === "function") callback();
    }
}
sum(0, 10000, null);
```

### 解决

> ​		我们将递归代码使用`setTimeout`包裹，放入宏任务队列中，然后主线程对宏任务队列中的任务逐个调度执行，这样就可以保证栈不会溢出。
>
> ​		但是，存在一个性能上的问题，就是速度太慢了。假设`setTimeout`设定每10ms调度一个到栈内执行，现在有10000个宏任务。
>
> ​		抛开网络环境、硬件配置等因素，在最为理想的状态下延时为：(10 * 100000) / 1000 = 1000s

```javascript
function sum(num, targetNum, callback) {
    if (num <= targetNum) {
        setTimeout(() => {
            sum(++num, targetNum, () => console.log(num));
            if (typeof callback === "function") callback();
        });
    }
}
sum(0, 10000, null);
```

### 优化

> ​		如以下代码所示，定义了一个`part`变量，赋值为1000，目的是让以1000为一个组为单位，将它放入宏任务队列中，等待第一次压栈（也就是1-1000）执行完毕后，主线程再将宏任务队列中的1000个调度过来执行，如此反复。当主线程执行的过程中，宏队列中的任务也在增加。
>
> ​		这时候我们的延时为：10 * (100000 / 1000) = 1s

```javascript
let part = 1000;
function sum(num, targetNum, callback) {
    if (num <= targetNum) {
        if (num % part === 0) {
            setTimeout(() => {
                sum(++num, targetNum, () => console.log(num));
            });
        } else {
            sum(++num, targetNum, () => console.log(num));
        }
        if (typeof callback === "function") callback();
    }
}
sum(0, 10000, null);
```