---
title: 快速开始
---

# 快速开始

## 安装

:::info

`clerc` 包重新导出了 `@clerc/core` 和所有插件，因此可能会增加您的捆绑包大小。为了减小大小，请按需安装 `@clerc/core` 和插件。

:::

:::code-group

```sh [npm]
$ npm install clerc
```

```sh [pnpm]
$ pnpm add clerc
```

```sh [yarn]
$ yarn add clerc
```

:::

## 使用方法

首先，创建一个名为 `foo-cli.mjs` 的文件：

```js
import { Clerc } from "clerc";

const cli = Clerc.create()
	.name("Foo CLI") // 可选，默认为 scriptName
	.scriptName("foo-cli")
	.description("一个简单的命令行界面")
	.version("1.0.0") // 您也可以使用 Clerc.create(name, description, version)
	.command("foo", "一个 foo 命令")
	.on("foo", (context) => {
		console.log("It works!");
	})
	.parse();
```

然后，运行它：

```sh
$ node ./foo-cli.mjs foo
```

这将输出 `"It works!"`。
