---
title: Interceptors
---

# Interceptors

An interceptor is a function that runs before or after calling the command handler, like middleware in koa.

## Usage

Interceptors are added to the cli using the `interceptor` method:

```ts
import { Clerc } from "clerc";

const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("A simple cli")
	.version("1.0.0")
	.command("foo", "A foo command")
	.interceptor((context, next) => {
		console.log("Before foo");
		// You can inject something into the context, or modify the context
		context.foo = "bar";
		next(); // Call next to continue
	})
	.parse();
```

## Order

The interceptor method accepts either a function or an object:

```ts
import { Clerc } from "clerc";

const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("A simple cli")
	.version("1.0.0")
	.command("foo", "A foo command")
	.interceptor({
		enforce: "normal", // default, or 'pre', 'post'
		fn: (context, next) => {
			console.log("Before foo");
			// You can inject something into the context, or modify the context
			context.foo = "bar";
			next(); // Call next to continue
		},
	})
	.parse();
```

So the order of execution is:

1. Pre interceptors
2. Normal interceptors
3. Post interceptors

## Call after command handler

You can do something after the command handler is called by doing things after calling `next()`:

```ts
import { Clerc } from "clerc";

const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("A simple cli")
	.version("1.0.0")
	.command("foo", "A foo command")
	.interceptor((context, next) => {
		console.log("Before foo");
		// You can inject something into the context, or modify the context
		context.foo = "bar";
		next(); // Call next to continue
		console.log("After foo");
	})
	.on("foo", (context) => {
		console.log("It works!");
	})
	.parse();

// The output is:
// Before foo
// It works!
// After foo
```
