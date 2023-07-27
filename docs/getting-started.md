---
title: Getting Started
---

# Getting Started

## Installation

:::info

The `clerc` packages re-exports `@clerc/core` and all plugins, so it may increase your bundle size. To reduce, please install `@clerc/core` and plugins on demand.

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

## Usage

First, create a file called `foo-cli.mjs`:

```js
import { Clerc } from "clerc";

const cli = Clerc.create()
	.name("Foo CLI") // Optional, defaults to scriptName
	.scriptName("foo-cli")
	.description("A simple cli")
	.version("1.0.0") // You can use Clerc.create(name, description, version) instead
	.command("foo", "A foo command")
	.on("foo", (context) => {
		console.log("It works!");
	})
	.parse();
```

Then, run it:

```sh
$ node ./foo-cli.mjs foo
```

This logs `"It works!"`.
