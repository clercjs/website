---
title: flags
---

# Flags

Flags are used to provide additional configuration and parameters for commands. Clerc supports various types of options, including built-in JavaScript types such as Boolean, String, Number, and also custom types.

_Clerc_'s flag parsing is powered by [`@clerc/parser`](https://github.com/clercjs/clerc/blob/main/packages/parser) and has many features:

- Array and custom types
- Flag delimiters: `--flag value`, `--flag=value`, `--flag:value` and `--flag.value`
- Combined aliases: `-abcd 2` → `-a -b -c -d 2`
- [End-of-file](https://unix.stackexchange.com/a/11382): pass `--` to end parsing

Flags can be specified in the `flags` object property, where the key is the flag name and the value is either an flag type function or an object describing the flag.

It's recommended to use camelCase for flag names as it will be interpreted as parsing the equivalent kebab-case flag.

The flag type function can be any function that accepts a string and returns the parsed value. The default JavaScript constructors should cover most use cases: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String), [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number), [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean/Boolean), etc.

The flag description object can be used to store additional information about the flag, such as `alias`, `default`, and `description`. To accept multiple values for a flag, wrap the type function in an array.

All provided information will be used to generate better help documentation.

Example:

```ts
// $ node ./foo-cli.mjs echo --some-boolean --some-string hello --some-number 1 -n 2

const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("A simple CLI")
	.version("1.0.0")
	.command("echo", "Echo", {
		flags: {
			someBoolean: {
				type: Boolean,
				description: "Some boolean flag",
			},

			someString: {
				type: String,
				description: "Some string flag",
				default: "n/a",
			},

			someNumber: {
				// Wrap the type function in an array to allow multiple values
				type: [Number],
				alias: "n",
				description: "Array of numbers. (e.g. -n 1 -n 2 -n 3)",
			},

			object: {
				type: Object,
				description: "An object flag. (e.g. --object.key value)",
			},

			counter: {
				type: [Boolean],
				description: "A counter flag. (e.g. -c -c -c)",
			},
		},
	})
	.on("echo", (ctx) => {
		ctx.flags;
		//	^?
		ctx.flags.someBoolean; // => true
		ctx.flags.someString; // => "hello"
		ctx.flags.someNumber; // => [1, 2]
		ctx.flags.object; // => { key: "value" }
		ctx.flags.counter; // => 2
	})
	.parse();
```

## Built-in Advanced Types

Clerc provides some built-in advanced flag types to facilitate common needs:

- `Choices`: Restrict flag values to a predefined set.

```ts
import { Choices } from "clerc";

Clerc.create()
	.command("serve", "Start the server", {
		flags: {
			mode: {
				type: Choices("development", "production", "test"),
				default: "development" as const,
				description: "Set the application mode",
			},
		},
	})
	.on("serve", (ctx) => {
		ctx.flags.mode;
		//        ^?
	})
	.parse();
```

## Custom Flag Types

You can create custom flag types by providing a custom type function. The type function accepts a string argument and returns the parsed value.

```ts
// Custom type function that parses a comma-separated string into an array of strings
const CommaSeparatedList = (value: string): string[] =>
	value.split(",").map((item) => item.trim());

const cli = Clerc.create()
	.scriptName("custom-cli")
	.description("A CLI using a custom flag type")
	.version("1.0.0")
	.command("list", "Display list", {
		flags: {
			items: {
				type: CommaSeparatedList,
				default: [] as string[],
				description: "Comma-separated list of strings",
			},
		},
	})
	.on("list", (ctx) => {
		console.log("Items:", ctx.flags.items);
		//                              ^?
	})
	.parse();
```
