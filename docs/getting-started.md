---
title: Getting Started
---

# Getting Started

:::warning

Clerc only supports ESM!

:::

## Installation

:::info

The `clerc` package re-exports an extended `Clerc` class with built-in `@clerc/plugin-help` and `@clerc/plugin-version` plugins. If you only need the core functionality, you can install the `@clerc/core` package or use the exported `BaseClerc` class.

Note that the `clerc` package may be larger in size since it re-exports all official plugins. However, if your bundler supports tree-shaking, this shouldn't be an issue. To reduce bundle size, consider installing only `@clerc/core` and the plugins you need.

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

## Simplest CLI Example

Install clerc, and create a file named `cli.mjs`:

```ts
Clerc.create() // Create a new Clerc instance
	.name("foo") // Optional, CLI name, used to generate help text
	.scriptName("foo") // CLI script name
	.description("A foo CLI") // CLI description
	.version("0.0.0") // CLI version
	.command(
		"bar", // Command name
		"A bar command", // Command description
	)
	.on(
		"bar",
		(
			_ctx, // Command context, but we're not using it yet
		) => {
			console.log("Hello, world from Clerc.js!");
		},
	)
	.parse(); // Parse arguments and run!
```

Then run: `node cli.mjs bar`. It should output in your shell: `Hello, world from Clerc.js!`
