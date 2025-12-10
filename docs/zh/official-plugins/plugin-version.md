---
title: 版本信息插件
---

# @clerc/plugin-version

为您的 CLI 添加版本命令的插件。

## 📦 安装

:::code-group

```sh [npm]
$ npm install @clerc/plugin-version
```

```sh [yarn]
$ yarn add @clerc/plugin-version
```

```sh [pnpm]
$ pnpm add @clerc/plugin-version
```

:::

## 🚀 使用方法

### 基本用法

```ts
import { versionPlugin } from "@clerc/plugin-version"; // 或者直接从 clerc 导入
import { Clerc } from "clerc";

const cli = Clerc.create()
	.scriptName("my-cli")
	.description("我的 CLI 应用程序")
	.version("1.0.0")
	.use(versionPlugin()) // 添加版本插件
	.parse();
```

### 运行效果

```bash
# 显示版本信息
$ node my-cli --version
# 或
$ node my-cli version

# 输出: v1.0.0
```
