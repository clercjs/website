---
title: Getting Started
---

# Getting Started

:::warning

Clerc only supports ESM!

:::

## Installation

:::info

The `clerc` package re-exports `@clerc/core` and all plugins, which may increase your bundle size, though it won't have much impact if your bundler supports tree-shaking. To reduce size, please install `@clerc/core` and plugins as needed.

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
import { Clerc } from "clerc";

Clerc.create() // Create a new Clerc instance
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
