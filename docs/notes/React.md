# React

## React CDN

>如果需要加载指定版本的 `react` 和 `react-dom`，可以把 `16` 替换成所需加载的版本号。

- **开发环境**
  - react.development.js：它是React的核心库，需要提前引入。
  - react-dom.development.js：它是React操作dom的库，在核心库后引入。

```js
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

- **生产环境**

```js
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

- **支持jsx**
  - jsx是js的一种拓展语法，而babel支持jsx与js，es6与es5直接的语法转换。

```js
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```



## 第一个demo

> 虚拟DOM：在script的type中设置babel属性值，使用变量存储虚拟DOM。
>
> > const VDOM = ( \<h1>我是Virtual DOM\</h1> );
>
> 节点渲染：ReactDOM.render(虚拟DOM, 容器节点);
>
> > ReactDOM.render( VDOM, document.getElementById('test') );

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<!-- 准备一个容器 -->
		<div id="test"></div>

		<!-- 引入react核心库 -->
		<script src="../js/react.development.js"></script>
		<!-- 用于支持react操作dom -->
		<script src="../js/react-dom.development.js"></script>
		<!-- 用于将jsx转换为js -->
		<script src="../js/babel.js"></script>

		<script type="text/babel">
			// 获取容器
			const root = document.getElementById("test");

			// 1、创建Virtual DOM
			const VDOM = <h1>Hello, React</h1>;

			// 2、渲染Virtual DOM到页面
			ReactDOM.render(VDOM, root); // 
		</script>
	</body>
</html>

```



## 创建Virtual DOM的两种方式

> 以下两种方法实现的效果一样，但区别在于VDOM的创建。原生js更繁琐，拓展语法jsx更人性化。

### 1、使用js创建Virtual DOM

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<!-- 准备一个容器 -->
		<div id="test"></div>

		<!-- 引入react核心库 -->
		<script src="../js/react.development.js"></script>
		<!-- 用于支持react操作dom -->
		<script src="../js/react-dom.development.js"></script>
		<!-- 用于将jsx转换为js -->
		<!-- <script src="../js/babel.js"></script> -->

		<script type="text/javascript">
			// 获取容器
			const root = document.getElementById("test");

			// 1、创建Virtual DOM
          // React.createElement(节点名称， 节点属性[使用json格式], 节点文本)
			const VDOM = React.createElement("h1", { id: "title" }, React.createElement("span", {}, "Hello React！"));

			// 2、渲染Virtual DOM到页面
			ReactDOM.render(VDOM, root);
		</script>
	</body>
</html>
```



### 2、使用jsx创建Virtual DOM

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<!-- 准备一个容器 -->
		<div id="test"></div>

		<!-- 引入react核心库 -->
		<script src="../js/react.development.js"></script>
		<!-- 用于支持react操作dom -->
		<script src="../js/react-dom.development.js"></script>
		<!-- 用于将jsx转换为js -->
		<script src="../js/babel.js"></script>

		<script type="text/babel">
			// 获取容器
			const root = document.getElementById("test");

			// 1、创建Virtual DOM
			const VDOM = (
				<h1 id="title">
					<span>Hello, React</span>
				</h1>
			);

			// 2、渲染Virtual DOM到页面
			ReactDOM.render(VDOM, root);
		</script>
	</body>
</html>
```



## JSX语法规则

1. 定义虚拟DOM时，不需要写引号

2. 标签中混入js表达式时使用{}

3. 样式的类名指定不要用class，用className。因为class是保留关键字。

4. 内联样式要使用style={{key : value}}的形式写。

5. 只能有一个根标签。
6. 标签首字母
   1. 若小写字母开头，则当成html标签渲染。
   2. 若大写字母开头，则当成react组件渲染。

## JSX小练习

> 使用map函数遍历数组，由于diff算法的原因，需要给遍历的数据添加上唯一的key属性和属性值。
>
> 这里使用的是map自带的index，如果数据在生成后需要增删，则使用自定义的id使key值保持唯一，否则diff算法将出错。

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<!-- 准备一个容器 -->
		<div id="test"></div>

		<!-- 引入react核心库 -->
		<script src="../js/react.development.js"></script>
		<!-- 用于支持react操作dom -->
		<script src="../js/react-dom.development.js"></script>
		<!-- 用于将jsx转换为js -->
		<script src="../js/babel.js"></script>

		<script type="text/babel">
			const data = ["Angular", "React", "Vue"];
			// 1、创建Virtual DOM
			const VDOM = (
				<div>
					<h1>前端js框架列表</h1>
					<ul>
						{data.map((e, i) => {
							return <li key={i}>{e}</li>;
						})}
					</ul>
				</div>
			);

			// 2、渲染Virtual DOM到页面
			ReactDOM.render(VDOM, document.getElementById("test"));
		</script>
	</body>
</html>
```



## React组件

### 函数式组件

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<!-- 准备一个容器 -->
		<div id="test"></div>

		<!-- 引入react核心库 -->
		<script src="../js/react.development.js"></script>
		<!-- 用于支持react操作dom -->
		<script src="../js/react-dom.development.js"></script>
		<!-- 用于将jsx转换为js -->
		<script src="../js/babel.js"></script>

		<script type="text/babel">
			// 1、创建函数式组件
			function MyComponent() {
                console.log(this); // 此处的this是undefined，因为babel编译后开启了严格模式，禁止指向window
				return <h2>我是用函数定义的组件（适用于【简单组件】的定义）</h2>;
			}
			// 2、渲染
			ReactDOM.render(<MyComponent />, document.getElementById("test"));
            /**
             *  React解析组件标签，找到MyComponent组件。
             *  发现组件是使用函数定义的，随后调用该函数，将返回的 Virtual DOM ==> Real DOM，随后呈现在页面中。
            */
		</script>
	</body>
</html>
```



### 类式组件

> 在React中，继承React.Component的类即为组件实例。
>
> 继承React.Component后将获得三大核心属性：state、props、refs

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<!-- 准备一个容器 -->
		<div id="test"></div>

		<!-- 引入react核心库 -->
		<script src="../js/react.development.js"></script>
		<!-- 用于支持react操作dom -->
		<script src="../js/react-dom.development.js"></script>
		<!-- 用于将jsx转换为js -->
		<script src="../js/babel.js"></script>

		<script type="text/babel">
			class MyComponent extends React.Component {
				render() {
                    // render方法放在类的原型对象上，供实例使用。
					return (
						<div>
							<h1>我是用类定义的组件（适用于【复杂组件】的定义）</h1>
						</div>
					);
				}
			}
			// 渲染
			ReactDOM.render(<MyComponent />, document.getElementById("test"));
		</script>
	</body>
</html>
```



## 组件三大核心属性

### state

>1. state可在类中直接更改状态，以==键值对==的方式。
>
>2. React提供的setState方法进行更改state中的数据，这样React能**重新再调用类组件的render方法**，进行重新渲染视图。同样以键值对的方式更改，是==替换名称相同键的值==。 `setState({ isHot: !isHot })`
>3. 在类组件中，创建方法使用的是，==【赋值语句 + 箭头函数】==。原因：因为`babel`编译后，让类中的所有方法开启了严格模式，导致方法的this指向为undefined。而通过【赋值语句 + 箭头函数】使得this重新指向类组件。而不必说再使用原生的`bind、apply、call`这三种方法进行更改this指向。
>4. React将所有标签上原生的事件名都进行了更改，以==小驼峰方式命名==。如：onclick => onClick，onblur => onBlur。

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<!-- 准备一个容器 -->
		<div id="test"></div>

		<!-- 引入react核心库 -->
		<script src="../js/react.development.js"></script>
		<!-- 用于支持react操作dom -->
		<script src="../js/react-dom.development.js"></script>
		<!-- 用于将jsx转换为js -->
		<script src="../js/babel.js"></script>

		<script type="text/babel">
			class MyComponent extends React.Component {
				state = { isHot: true };
				render() {
					// 因为babel，类中函数局部开启了严格模式，导致this指向丢失，即：undefined。所以这里通过bind改变函数的this指向。
					return <h1 onClick={this.change}>今天天气很{this.state.isHot ? "炎热" : "凉爽"}</h1>;
				}
				// 这里使用赋值语句+箭头函数的原因是：改变函数的this指向。
				change = () => {
					const { isHot } = this.state;
					this.setState({ isHot: !isHot });
				};
			}
			ReactDOM.render(<MyComponent />, document.getElementById("test"));
		</script>
	</body>
</html>
```



### props

>1. 在类组件上设置的属性都将被React收集在`props`中。
>2. 如果需要对props进行类型限制，则需要引入`props-types`包。引入后将有`propTypes`与`defaultProps`，可在类组件中通过`static`修饰定义使用。
>3. 批量设置组件属性传值，可使用{...p1}，使用三点扩展运算符，babel将对组件上的花括弧进行编译展开。

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<!-- 准备一个容器 -->
		<div id="test"></div>
		<div id="test2"></div>

		<!-- 引入react核心库 -->
		<script src="../js/react.development.js"></script>
		<!-- 用于支持react操作dom -->
		<script src="../js/react-dom.development.js"></script>
		<!-- 引入类型包 -->
		<script src="../js/prop-types.js"></script>

		<!-- 用于将jsx转换为js -->
		<script src="../js/babel.js"></script>

		<script type="text/babel">
			class Person extends React.Component {
				// 1、类型限制
				static propTypes = {
					name: PropTypes.string.isRequired, // 字符串类型，且必须
					age: PropTypes.number,
					sex: PropTypes.string,
					speak: PropTypes.func, // 限制speak的属性值为函数
				};
				// 2、默认值
				static defaultProps = {
					sex: "男",
					age: 18,
				};
				render() {
					// this.props.speak instanceof Function && this.props.speak();
					return (
						<ul>
							<li>姓名：{this.props.name}</li>
							<li>性别：{this.props.sex}</li>
							<li>年龄：{this.props.age + 1}</li>
						</ul>
					);
				}
			}
			function speak() {
				console.log("哈哈哈");
			}
			const p1 = { name: "Tom", sex: "男", speak: speak };
			// 批量设置组件属性传值
			ReactDOM.render(<Person {...p1} />, document.getElementById("test"));
			ReactDOM.render(<Person name="Jack" sex="女" age={19} />, document.getElementById("test2"));
		</script>
	</body>
</html>
```



### refs

#### 字符串refs形式

> 字符串Refs形式很简单，只要在Virtual DOM的节点上添加ref属性，React将收集被标识的Real DOM全部存入refs中。
>
> 优点：开发效率快，简单。
>
> 缺点：内部效率低。

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<!-- 准备一个容器 -->
		<div id="test"></div>

		<!-- 引入react核心库 -->
		<script src="../js/react.development.js"></script>
		<!-- 用于支持react操作dom -->
		<script src="../js/react-dom.development.js"></script>
		<!-- 用于将jsx转换为js -->
		<script src="../js/babel.js"></script>

		<script type="text/babel">
			class Demo extends React.Component {
				render() {
					return (
						<div>
							<input ref="input1" type="text" placeholder="点击按钮后提示" />
							<button onClick={this.tip}>点击提示</button>
							<br />
							<br />
							<input ref="input2" type="text" placeholder="焦点消失后提示" onBlur={this.tip2} />
						</div>
					);
				}
				tip = () => {
					alert(this.refs.input1.value);
					this.refs.input1.value = "";
				};
				tip2 = () => {
					alert(this.refs.input2.value);
					this.refs.input2.value = "";
				};
			}

			ReactDOM.render(<Demo />, document.getElementById("test"));
		</script>
	</body>
</html>
```



#### 回调refs形式

>回调函数的refs有两种写法：
>
>1. `ref={ node => {this.input1 = node} }`，内联写法，将得到的节点直接挂在类组件身上。
>   - 缺点：在其他事件更新页面时，该内联写法将被执行两次，第一次为null，第二次才会给出当前节点实例。<!-- 官方说不影响 -->
>2. `ref={this.saveInput}`，外部写法，创建一个**saveInput**函数，该函数将会收到一个参数，也就是该节点实例，最后再通过`this`将该节点挂在类组件身上。

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<!-- 准备一个容器 -->
		<div id="test"></div>

		<!-- 引入react核心库 -->
		<script src="../js/react.development.js"></script>
		<!-- 用于支持react操作dom -->
		<script src="../js/react-dom.development.js"></script>
		<!-- 用于将jsx转换为js -->
		<script src="../js/babel.js"></script>

		<script type="text/babel">
			class Demo extends React.Component {
				render() {
					return (
						<div>
							{/*<input ref={(e)=>{this.input1 = e}} type="text" placeholder="点击按钮后提示" />*/}
							<input ref={this.saveInput} type="text" placeholder="点击按钮后提示" />
							<button onClick={this.tip}>点击提示</button>
							<br />
							<br />
							<input ref="input2" type="text" placeholder="焦点消失后提示" onBlur={this.tip2} />
						</div>
					);
				}
				saveInput = (e) => {
					this.input1 = e;
				};
				tip = () => {
					alert(this.input1.value);
					this.input1.value = "";
				};
				tip2 = () => {
					alert(this.refs.input2.value);
					this.refs.input2.value = "";
				};
			}

			ReactDOM.render(<Demo />, document.getElementById("test"));
		</script>
	</body>
</html>
```



#### createRef形式

> 通过`React.createRef`来创建一个ref容器，该容器包含被ref标识的节点。
>
> 容器只能装一个节点，如果复用，容器中只会存在最后一个节点。

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<!-- 准备一个容器 -->
		<div id="test"></div>

		<!-- 引入react核心库 -->
		<script src="../js/react.development.js"></script>
		<!-- 用于支持react操作dom -->
		<script src="../js/react-dom.development.js"></script>
		<!-- 用于将jsx转换为js -->
		<script src="../js/babel.js"></script>

		<script type="text/babel">
			class Demo extends React.Component {
				// React.createRef调用后返回一个容器，容器里包含被ref标识的节点。
				myRef = React.createRef();
				myRef2 = React.createRef();
				render() {
					return (
						<div>
							<input ref={this.myRef} type="text" placeholder="点击按钮后提示" />
							<button onClick={this.tip}>点击提示</button>
							<br />
							<br />
							<input ref={this.myRef2} type="text" placeholder="焦点消失后提示" onBlur={this.tip2} />
						</div>
					);
				}
				tip = () => {
					alert(this.myRef.current.value);
					this.myRef.current.value = "";
				};
				tip2 = () => {
					alert(this.myRef2.current.value);
					this.myRef2.current.value = "";
				};
			}

			ReactDOM.render(<Demo />, document.getElementById("test"));
		</script>
	</body>
</html>
```



## React中表单数据收集

### 非受控组件

> 非受控是指只有在使用提交时表单时，才会对数据进行收集。

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<!-- 准备一个容器 -->
		<div id="test"></div>

		<!-- 引入react核心库 -->
		<script src="../js/react.development.js"></script>
		<!-- 用于支持react操作dom -->
		<script src="../js/react-dom.development.js"></script>
		<!-- 用于将jsx转换为js -->
		<script src="../js/babel.js"></script>

		<script type="text/babel">
			class Login extends React.Component {
				// userNameRef = React.createRef();
				// passwordRef = React.createRef();
				render() {
					return (
						<form action="http://www.atguigu.com" onSubmit={this.submit}>
							用户名：
							<input ref={(node) => (this.nameNode = node)} type="text" name="username" />
							密码：
							<input ref={(node) => (this.pwdNode = node)} type="password" name="password" />
							<button>登录</button>
						</form>
					);
				}
				submit = (event) => {
					event.preventDefault(); // 阻止表单默认提交行为
					const { nameNode, pwdNode } = this;
					alert(`用户名：${nameNode.value}，密码：${pwdNode.value}`);
					nameNode.value = "";
					pwdNode.value = "";
					// alert(`用户名：${this.userNameRef.current.value}，密码：${this.passwordRef.current.value}`);
					// this.userNameRef.current.value = "";
					// this.passwordRef.current.value = "";
				};
			}
			ReactDOM.render(<Login />, document.getElementById("test"));
		</script>
	</body>
</html>
```



### 受控组件

> 受控是指收集数据是实时的

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<!-- 准备一个容器 -->
		<div id="test"></div>

		<!-- 引入react核心库 -->
		<script src="../js/react.development.js"></script>
		<!-- 用于支持react操作dom -->
		<script src="../js/react-dom.development.js"></script>
		<!-- 用于将jsx转换为js -->
		<script src="../js/babel.js"></script>

		<script type="text/babel">
			class Login extends React.Component {
				// 初始化状态
				state = {
					username: "",
					password: "",
				};

				render() {
					return (
						<form action="http://www.atguigu.com" onSubmit={this.submit}>
							用户名：
							<input
								onChange={(event) => this.setState({ username: event.target.value })}
								value={this.state.username}
								type="text"
								name="username"
							/>
							密码：
							<input
								onChange={(event) => this.setState({ password: event.target.value })}
								value={this.state.password}
								type="password"
								name="password"
							/>
							<button>登录</button>
						</form>
					);
				}
				submit = (event) => {
					event.preventDefault();
					const { username, password } = this.state;
					alert(`用户名为：${username}, 密码为：${password}`);
					this.setState({ username: "", password: "" });
				};
			}
			ReactDOM.render(<Login />, document.getElementById("test"));
		</script>
	</body>
</html>
```



### 函数柯里化

>高阶函数：如果一个函数符合以下两个规范中的任何一个，那该函数称为高阶函数。
>		1、该函数，接收的参数是一个函数。
>		2、该函数，调用的返回值是一个函数。
>				常见的：Promise、setTimeout、map...
>
>函数的柯里化：通过函数调用继续返回函数的方式，实现多次接收函数最后统一处理的函数编码形式。
>
>`this.setState({ [dataType]: event.target.value });` 当键名为变量时，可利用中括号括起来使用。

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<!-- 准备一个容器 -->
		<div id="test"></div>

		<!-- 引入react核心库 -->
		<script src="../js/react.development.js"></script>
		<!-- 用于支持react操作dom -->
		<script src="../js/react-dom.development.js"></script>
		<!-- 用于将jsx转换为js -->
		<script src="../js/babel.js"></script>

		<script type="text/babel">
			
			class Login extends React.Component {
				// 初始化状态
				state = {
					username: "",
					password: "",
				};

				render() {
					return (
						<form action="http://www.atguigu.com" onSubmit={this.submit}>
							用户名：
							<input onChange={this.saveFormData("username")} type="text" name="username" />
							密码：
							<input onChange={this.saveFormData("password")} type="password" name="password" />
							<button>登录</button>
						</form>
					);
				}
				saveFormData = (dataType) => {
					return (event) => {
						this.setState({ [dataType]: event.target.value });
					};
				};
				// saveFormData = (event) => {
				// 	this.setState({ [event.target.name]: event.target.value });
				// };
				submit = (event) => {
					event.preventDefault();
					const { username, password } = this.state;
					alert(`用户名为：${username}, 密码为：${password}`);
					this.setState({ username: "", password: "" });
					event.target.children.username.value = "";
					event.target.children.password.value = "";
				};
			}
			ReactDOM.render(<Login />, document.getElementById("test"));
		</script>
	</body>
</html>
```



## React组件的生命周期

### 生命周期（旧）

> 1、初始化阶段：由`ReactDOM.render()`触发————初次渲染
>                     1、constructor()
>                     2、componentWillMount()
>                     3、render()
>                     4、componentDidMount()
> 2、更新阶段：由组件内部`this.setState()`或父组件render触发。
>                     1、shouldComponentUpdate()
>                     2、componentWillUpdate()
>                     3、render()
>                     4、componentDidUpdate()
> 3、卸载组件：由`ReactDOM.unmountComponentAtNode()`触发
>                     1、componentWillUnmount()
>
> 使用`forceUpdate()`钩子可以强制更新，它跳过了询问`shouldComponentUpdate()`是否能更新【==返回值为真即允许更新，反之不更新==】。
>
> 使用`componentWillReceiveProps()`钩子需要注意的是，它第一次渲染接收的props不会触发该钩子。

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<!-- 准备一个容器 -->
		<div id="test"></div>

		<!-- 引入react核心库 -->
		<script src="../js/react.development.js"></script>
		<!-- 用于支持react操作dom -->
		<script src="../js/react-dom.development.js"></script>
		<!-- 用于将jsx转换为js -->
		<script src="../js/babel.js"></script>

		<script type="text/babel">
			class Count extends React.Component {
				constructor(props) {
					super(props);
					this.state = { num: 0 };
					console.log("Count————constructor");
				}

				render() {
					console.log("Count————render");
					return (
						<div>
							<h2>当前求和为：{this.state.num}</h2>
							<button onClick={this.add}>点我+1</button>
							<button onClick={this.force}>强制更新</button>
						</div>
					);
				}
				add = () => {
					this.setState({ num: this.state.num + 1 });
				};
				force = () => {
					this.forceUpdate();
					/*
                        强制更新，将调用：
                            componentWillUpdate 钩子
                            render 钩子
                            componentDidUpdate 钩子
                        通过强制更新，程序的流程不再经过shouldComponentUpdate钩子，进行询问是否调用render渲染。
                    */
				};

				// 组件挂载前
				componentWillMount() {
					console.log("Count————componentWillMount");
				}
				// 组件挂载后
				componentDidMount() {
					console.log("Count————componentDidMount");
				}
				// 组件卸载前
				componentWillUnmount() {
					console.log("Count————componentWillUnmount");
				}

				// 是否允许更新组件
				shouldComponentUpdate() {
					console.log("Count————shouldComponentUpdate");
					return true; // 这里返回true则调用render，反之不渲染。render每次调用会通过这个钩子，默认是通过。
				}
				// 组件更新前
				componentWillUpdate() {
					console.log("Count————componentWillUpdate");
				}
				// 组件更新后
				componentDidUpdate() {
					console.log("Count————componentDidUpdate");
				}
			}

			class A extends React.Component {
				state = { carName: "奔驰" };
				render() {
					return (
						<div>
							<h1>我是A组件</h1>
							<button onClick={this.changeCar}>换车</button>
							<B carName={this.state.carName} />
						</div>
					);
				}
				changeCar = () => {
					this.setState({ carName: "劳斯莱斯" });
				};
			}

			class B extends React.Component {
				render() {
					return (
						<div>
							<h1>我是B组件，从A组件传过来的车是：{this.props.carName}</h1>
						</div>
					);
				}
				// 组件将要接收传来的props 【第一次不算，后续闯入将调用该钩子】
				componentWillReceiveProps() {
					console.log("B组件————componentWillReceiveProps");
				}
			}

			// ReactDOM.render(<Count />, document.getElementById("test"));
			ReactDOM.render(<A />, document.getElementById("test"));
		</script>
	</body>
</html>
```



### 生命周期（新）
