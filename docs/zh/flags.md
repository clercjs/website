---
title: 选项
---

# 选项

选项用于为命令提供额外的配置和参数。Clerc 支持多种类型的选项，包括 JavaScript 内置的类型，如布尔值、字符串、数字等，也支持自定义类型。

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

## 基本用法

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

			any: {
				type: Boolean as any,
				description: "一个任意类型选项，值会被解析为 any。",
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

## 内置的高级类型

Clerc 提供了一些内置的高级选项类型，方便处理常见的需求：

- `Choices`: 限制选项值为预定义的集合。

```ts
import { Choices } from "clerc";

Clerc.create()
	.command("serve", "启动服务器", {
		flags: {
			mode: {
				type: Choices("development", "production", "test"),
				default: "development" as const,
				description: "设置应用程序模式",
			},
		},
	})
	.on("serve", (ctx) => {
		ctx.flags.mode;
		//        ^?
	})
	.parse();
```

## 自定义选项类型

您可以通过提供自定义的类型函数来创建自定义选项类型。类型函数接受一个字符串参数并返回解析后的值。

```ts
// 自定义类型函数，将逗号分隔的字符串解析为字符串数组
const CommaSeparatedList = (value: string): string[] =>
	value.split(",").map((item) => item.trim());

const cli = Clerc.create()
	.scriptName("custom-cli")
	.description("一个使用自定义选项类型的 CLI")
	.version("1.0.0")
	.command("list", "显示列表", {
		flags: {
			items: {
				type: CommaSeparatedList,
				default: [] as string[],
				description: "逗号分隔的字符串列表",
			},
		},
	})
	.on("list", (ctx) => {
		console.log("Items:", ctx.flags.items);
		//                              ^?
	})
	.parse();
```
