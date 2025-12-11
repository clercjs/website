---
title: 快速开始
---

# 快速开始

:::warning

Clerc 仅支持 ESM！

:::

## 安装

:::info

`clerc` 包重新导出了一个经过拓展的 `Clerc` 类，它内置了 `@clerc/plugin-help` 和 `@clerc/plugin-version` 插件。如果您只需要核心功能，可以安装 `@clerc/core` 包，或者使用导出的 `BaseClerc` 类。

同时，`clerc` 包的体积可能会较大，因为它重新导出了所有官方插件。但如果您的打包工具支持 tree-shaking，则影响不大。若想减小体积，请按需安装 `@clerc/core` 和所需插件。

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
Clerc.create() // 创建一个新的 Clerc 实例
	.name("foo") // 可选，CLI 名称，用于生成帮助文本
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
