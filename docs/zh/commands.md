---
title: 命令
---

# 命令

命令是 CLI 的核心组成部分。每个命令都有一个名称、描述、选项和参数。您可以使用命令来执行特定的任务或操作。

## 基础用法

```ts
import { Clerc } from "clerc";

const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("一个简单的 CLI")
	.version("1.0.0")
	.command("foo", "一个 foo 命令")
	.on("foo", (ctx) => {
		console.log("It works!");
	})
	.parse();
```

这将创建一个名为 `foo-cli` 的 CLI 应用程序，其中包含一个名为 `foo` 的命令。当用户运行 `foo-cli foo` 时，CLI 将输出 "It works!"。

## 别名

你可以为你的命令添加一个别名：

```ts
const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("一个简单的 CLI")
	.version("1.0.0")
	.command("foo", "一个 foo 命令", {
		alias: "bar",
	})
	.on("foo", (ctx) => {
		console.log("It works!");
	})
	.parse();
```

现在 `foo-cli foo` 和 `foo-cli bar` 都会输出 "It works!"。

你可以添加更多的别名：

```ts
const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("一个简单的 CLI")
	.version("1.0.0")
	.command("foo", "一个 foo 命令", {
		alias: ["bar", "baz"],
	})
	.on("foo", (ctx) => {
		console.log("It works!");
	})
	.parse();
```

## 子命令

你可以通过在命令名称中使用空格来定义子命令：

```ts
const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("一个简单的 CLI")
	.version("1.0.0")
	.command("parent child", "一个子命令")
	.on("parent child", (ctx) => {
		console.log("子命令被调用了！");
	})
	.parse();
```

## 根命令

你可以定义一个根命令（没有名称的命令）来处理没有指定子命令时的情况：

```ts
const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("一个简单的 CLI")
	.version("1.0.0")
	.command("", "根命令")
	.on("", (ctx) => {
		console.log("根命令被调用了！");
	})
	.parse();
```

## 参数

### 通用

参数（也称为 _位置参数_）是与参数值相对应的名称。将参数视为变量名，将参数值视为与变量关联的值。

可以在 `parameters` 数组属性中定义参数，以便通过名称访问特定的参数。这对于编写更可读的代码、强制验证和生成帮助文档非常有用。

参数可以按照以下格式进行定义：

- **必需参数**由尖括号表示（例如 `<parameter name>`）。
- **可选参数**由方括号表示（例如 `[parameter name]`）。
- **扩展参数**由 `...` 后缀表示（例如 `<parameter name...>` 或 `[parameter name...]`）。

注意，必需参数**不能在可选参数之后**，扩展参数必须放在最后。

可以在 `ctx.parameters` 属性上使用驼峰命名法来访问参数。

示例：

```ts
// $ node ./foo-cli.mjs a b c d

const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("一个简单的 CLI")
	.version("1.0.0")
	.command("foo", "一个 foo 命令", {
		parameters: [
			"<required parameter>",
			"[optional parameter]",
			"[optional spread...]",
		],
	})
	.on("foo", (ctx) => {
		ctx.parameters;
		//  ^?
		ctx.parameters.requiredParameter; // => "a"
		ctx.parameters.optionalParameter; // => "b"
		ctx.parameters.optionalSpread; // => ["c", "d"]
	})
	.parse();
```

### 结束标志

结束标志（`--`）（也称为 _选项结束符_）允许用户传递一部分参数。这对于将应该与其他参数分开解析的参数或看起来像选项的参数非常有用。

一个例子是 [`npm run`](https://docs.npmjs.com/cli/v8/commands/npm-run-script)：

```sh
$ npm run <script> -- <script arguments>
```

`--` 表示之后的所有参数应该传递给 _script_ 而不是 _npm_。

你可以在 `parameters` 数组中指定 `--` 来解析选项结束符参数。

示例：

```ts
// $ node ./foo-cli.mjs echo -- hello world

const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("一个简单的 CLI")
	.version("1.0.0")
	.command("echo", "回显", {
		parameters: ["<script>", "--", "[arguments...]"],
	})
	.on("echo", (ctx) => {
		ctx.parameters;
		//  ^?
		ctx.parameters.script; // => "echo"
		ctx.parameters.arguments; // => ["hello", "world"]
	})
	.parse();
```

## 选项

_Clerc_ 的选项解析由 [`@clerc/parser`](https://github.com/clercjs/clerc/blob/main/packages/parser) 提供支持，并具有许多功能：

- 数组和自定义类型
- 选项分隔符：`--flag value`、`--flag=value`、`--flag:value` 和 `--flag.value`
- 组合别名：`-abcd 2` → `-a -b -c -d 2`
- [选项结束符](https://unix.stackexchange.com/a/11382)：传递 `--` 来结束选项解析

可以在 `flags` 对象属性中指定选项，其中键是选项名称，值是选项类型函数或描述选项的对象。

建议使用驼峰命名法作为选项名称，因为它将被解释为解析短横线分隔的等效选项。

选项类型函数可以是任何接受字符串并返回解析后的值的函数。默认的 JavaScript 构造函数应该涵盖大多数用例：[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String)、[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number)、[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean/Boolean) 等。

选项描述对象可用于存储有关选项的其他信息，例如 `alias`、`default` 和 `description`。要接受选项的多个值，请将类型函数包装在数组中。

所有提供的信息将用于生成更好的帮助文档。

示例：

```ts
// $ node ./foo-cli.mjs echo --some-boolean --some-string hello --some-number 1 -n 2

const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("一个简单的 CLI")
	.version("1.0.0")
	.command("echo", "回显", {
		flags: {
			someBoolean: {
				type: Boolean,
				description: "一些布尔选项",
			},

			someString: {
				type: String,
				description: "一些字符串选项",
				default: "n/a",
			},

			someNumber: {
				// 将类型函数包装在数组中以允许多个值
				type: [Number],
				alias: "n",
				description: "数字数组。 (例如 -n 1 -n 2 -n 3)",
			},

			object: {
				type: Object,
				description: "一个对象选项。 (例如 --object.key value)",
			},

			counter: {
				type: [Boolean],
				description: "一个计数器选项。 (例如 -c -c -c)",
			},
		},
	})
	.on("echo", (ctx) => {
		ctx.flags;
		//  ^?
		ctx.flags.someBoolean; // => true
		ctx.flags.someString; // => "hello"
		ctx.flags.someNumber; // => [1, 2]
		ctx.flags.object; // => { key: "value" }
		ctx.flags.counter; // => 2
	})
	.parse();
```

## 忽略

有时，您可能希望在命令行输入中忽略某些参数或选项。例如 `deno` 的这个用法：

```sh
deno run --allow-read script.ts --flag
```

其中， `--flag` 被直接传递给脚本，而不是 `deno`。

您可以使用 `ignore` 属性来指定要忽略的参数或选项，从而实现这种用法。

```ts
import { Clerc, PARAMETER } from "clerc";

let encounteredParameter = false;

const cli = Clerc.create()
	.scriptName("deno")
	.description("Deno CLI")
	.version("1.0.0")
	.command("run", "运行脚本", {
		flags: {
			allowRead: {
				type: Boolean,
				description: "允许读取文件系统",
			},
		},
		parameters: ["<script>", "[args...]"],
		ignore: (type) => {
			if (type === PARAMETER && !encounteredParameter) {
				encounteredParameter = true;

				return false; // 不要忽略第一个参数（脚本名称）
			}

			// 忽略其余的参数
			return encounteredParameter;
		},
	})
	.on("run", (ctx) => {
		// 处理脚本运行
		ctx.ignored; // => ["--flag"]
		//	^?
	})
	.parse();
```

## 高级用法

为了将处理程序与 cli 定义分离，可以使用 `defineCommand` 实用函数：

```ts
import { Clerc, defineCommand } from "clerc";

const command = defineCommand({
	name: "test",
	description: "测试",
	flags: {},
	parameters: [],
	handler: (ctx) => {
		// 处理程序
	},
});

const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("一个简单的 CLI")
	.version("1.0.0")
	.command(command)
	.parse();
```
