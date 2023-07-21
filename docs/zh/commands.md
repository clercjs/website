---
title: 命令
---

# 命令

:::info

本页面的大部分内容来自 [Cleye](https://github.com/privatenumber/cleye)。感谢！

:::

## 选项

我们在[快速开始](./getting-started)中创建了一个名为 "foo" 的命令，它的描述是 "foo command"。我们使用 `on()` 来注册一个**命令处理程序**。现在我们将学习如何为命令添加**选项**。

选项作为第三个参数传递给 `command(name, description, options?)`。

### 别名

你可以为你的命令添加一个别名：

```js
import { Clerc } from "clerc";

const cli = Clerc.create()
  .scriptName("foo-cli")
  .description("一个简单的命令行界面")
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

```js
import { Clerc } from "clerc";

const cli = Clerc.create()
  .scriptName("foo-cli")
  .description("一个简单的命令行界面")
  .version("1.0.0")
  .command("foo", "一个 foo 命令", {
    alias: ["bar", "baz"],
  })
  .on("foo", (ctx) => {
    console.log("It works!");
  })
  .parse();
```

### 参数

#### 通用

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
import { Clerc } from "clerc";

const cli = Clerc.create()
  .scriptName("foo-cli")
  .description("一个简单的命令行界面")
  .version("1.0.0")
  .command("foo", "一个 foo 命令", {
    parameters: [
      "<required parameter>",
      "[optional parameter]",
      "[optional spread...]",
    ],
  })
  .on("foo", (ctx) => {
    ctx.parameters.requiredParameter; // => "a" (字符串)
    ctx.parameters.optionalParameter; // => "b" (字符串 | undefined)
    ctx.parameters.optionalSpread; // => ["c", "d"] (字符串数组)
  })
  .parse();
```

#### 结束标志

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
import { Clerc } from "clerc";

const cli = Clerc.create()
  .scriptName("foo-cli")
  .description("一个简单的命令行界面")
  .version("1.0.0")
  .command("echo", "回显", {
    parameters: ["<script>", "--", "[arguments...]"],
  })
  .on("echo", (ctx) => {
    ctx.parameters.script; // => "echo" (字符串)
    ctx.parameters.arguments; // => ["hello", "world"] (字符串数组)
  })
  .parse();
```

### 标志

_Clerc_ 的标志解析由 [`type-flag`](https://github.com/privatenumber/type-flag) 提供支持，并具有许多功能：

- 数组和自定义类型
- 标志分隔符：`--flag value`、`--flag=value`、`--flag:value` 和 `--flag.value`
- 组合别名：`-abcd 2` → `-a -b -c -d 2`
- [选项结束符](https://unix.stackexchange.com/a/11382)：传递 `--` 来结束标志解析
- 未知标志：未预期的标志存储在 `unknownFlags` 中

阅读 [_type-flag_ 文档](https://github.com/privatenumber/type-flag) 以了解更多信息。

可以在 `flags` 对象属性中指定标志，其中键是标志名称，值是标志类型函数或描述标志的对象。

建议使用驼峰命名法作为标志名称，因为它将被解释为解析短横线分隔的等效标志。

标志类型函数可以是任何接受字符串并返回解析后的值的函数。默认的 JavaScript 构造函数应该涵盖大多数用例：[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String)、[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number)、[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean/Boolean) 等。

标志描述对象可用于存储有关标志的其他信息，例如 `alias`、`default` 和 `description`。要接受标志的多个值，请将类型函数包装在数组中。

所有提供的信息将用于生成更好的帮助文档。

示例：

```ts
// $ node ./foo-cli.mjs echo --some-boolean --some-string hello --some-number 1 -n 2
import { Clerc } from "clerc";

const cli = Clerc.create()
  .scriptName("foo-cli")
  .description("一个简单的命令行界面")
  .version("1.0.0")
  .command("echo", "回显", {
    flags: {
      someBoolean: {
        type: Boolean,
      },

      someString: {
        type: String,
        description: "一些字符串标志",
        default: "n/a",
      },

      someNumber: {
        // 将类型函数包装在数组中以允许多个值
        type: [Number],
        alias: "n",
        description: "数字数组。 (例如 -n 1 -n 2 -n 3)",
      },
    },
  })
  .on("echo", (ctx) => {
    ctx.flags.someBoolean; // => true (布尔值 | undefined)
    ctx.flags.someString; // => "hello" (字符串)
    ctx.flags.someNumber; // => [1, 2] (数字数组)
  })
  .parse();
```

## 高级用法

为了将处理程序与 cli 定义分离，可以使用 `defineCommand` 实用函数：

```ts
import { Clerc, defineCommand } from "clerc";

const command = defineCommand(
  {
    name: "test",
    description: "测试",
    flags: {},
    parameters: [],
  },
  (ctx) => {
    // 处理程序
  },
);

const cli = Clerc.create()
  .scriptName("foo-cli")
  .description("一个简单的命令行界面")
  .version("1.0.0")
  .command(command)
  .parse();
```
