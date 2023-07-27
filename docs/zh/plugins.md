---
title: plugins
---

# 插件

插件是一个接受 `Clerc` 实例并返回 `Clerc` 实例的函数。

:::info

从技术上讲，返回值并不是必需的，但建议返回 `Clerc` 实例以获得更好的类型推断。

:::

## 使用方法

```ts
import { Clerc, definePlugin } from "clerc";

const plugin = definePlugin({
	setup: (cli) =>
		cli.command("foo", "一个 foo 命令").on("foo", (context) => {
			console.log("It works!");
		}),
});

const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("一个简单的命令行界面")
	.version("1.0.0")
	.use(plugin)
	.parse();
```
