---
title: 快速开始
---

# 快速开始

:::warning

Clerc 仅支持 ESM！

:::

## 安装

:::info

`clerc` 包重新导出了 `@clerc/core` 和所有插件，因此可能会增加您的捆绑包大小，不过如果你的打包器支持摇树优化（tree-shaking），则不会有太大影响。如需减小大小，请按需安装 `@clerc/core` 和插件。

:::

:::code-group

```sh [npm]
$ npm install clerc
```

```sh [yarn]
$ yarn add clerc
```

```sh [pnpm]
$ pnpm add clerc
```

:::

## 最简单的 CLI 示例

安装 clerc，并创建一个名为 `cli.mjs` 的文件：

```ts
import { Clerc } from "clerc";

Clerc.create() // 创建一个新的 Clerc 实例
	.scriptName("foo") // CLI 脚本名称
	.description("一个 foo CLI") // CLI 描述
	.version("0.0.0") // CLI 版本
	.command(
		"bar", // 命令名称
		"A bar command", // 命令描述
	)
	.on(
		"bar",
		(
			_ctx, // 命令上下文，但我们还没有使用它
		) => {
			console.log("Hello, world from Clerc.js!");
		},
	)
	.parse(); // 解析参数并运行！
```

然后运行：`node cli.mjs bar`。它应该在您的 shell 中输出：`Hello, world from Clerc.js!`
