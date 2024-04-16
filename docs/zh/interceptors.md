---
title: 拦截器
---

# 拦截器

拦截器是在调用命令处理程序之前或之后运行的函数，类似于 koa 中的中间件。

## 用法

可以使用 `interceptor` 方法将拦截器添加到命令行界面 (CLI) 中：

```ts
import { Clerc } from "clerc";

const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("一个简单的命令行界面")
	.version("1.0.0")
	.command("foo", "一个 foo 命令")
	.interceptor((context, next) => {
		console.log("在 foo 之前");
		// 您可以向上下文中添加一些内容，或修改上下文
		context.foo = "bar";
		next(); // 调用 next 继续执行
	})
	.parse();
```

## 顺序

`interceptor` 方法接受一个函数或一个对象：

```ts
import { Clerc } from "clerc";

const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("一个简单的命令行界面")
	.version("1.0.0")
	.command("foo", "一个 foo 命令")
	.interceptor({
		enforce: "normal", // 默认值，或者 'pre', 'post'
		fn: (context, next) => {
			console.log("在 foo 之前");
			// 您可以向上下文中添加一些内容，或修改上下文
			context.foo = "bar";
			next(); // 调用 next 继续执行
		},
	})
	.parse();
```

因此，执行顺序如下：

1. 预拦截器（Pre interceptors）
2. 正常拦截器（Normal interceptors）
3. 后拦截器（Post interceptors）

## 在命令处理程序之后调用

通过在调用 `next()` 之后进行操作，您可以在调用命令处理程序之后执行一些操作：

```ts
import { Clerc } from "clerc";

const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("一个简单的命令行界面")
	.version("1.0.0")
	.command("foo", "一个 foo 命令")
	.interceptor((context, next) => {
		console.log("在 foo 之前");
		// 您可以向上下文中添加一些内容，或修改上下文
		context.foo = "bar";
		next(); // 调用 next 继续执行
		console.log("在 foo 之后");
	})
	.on("foo", (context) => {
		console.log("它运行了！");
	})
	.parse();

// 输出结果为：
// 在 foo 之前
// 它运行了！
// 在 foo 之后
```
