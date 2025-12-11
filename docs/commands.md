---
title: Commands
---

# Commands

## Basic Usage

```ts
import { Clerc } from "clerc";

const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("A simple CLI")
	.version("1.0.0")
	.command("foo", "A foo command")
	.on("foo", (ctx) => {
		console.log("It works!");
	})
	.parse();
```

This creates a CLI application named `foo-cli` with a command called `foo`. When the user runs `foo-cli foo`, the CLI will output "It works!".

## Aliases

You can add an alias for your command:

```ts
const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("A simple CLI")
	.version("1.0.0")
	.command("foo", "A foo command", {
		alias: "bar",
	})
	.on("foo", (ctx) => {
		console.log("It works!");
	})
	.parse();
```

Now both `foo-cli foo` and `foo-cli bar` will output "It works!".

You can add more aliases:

```ts
const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("A simple CLI")
	.version("1.0.0")
	.command("foo", "A foo command", {
		alias: ["bar", "baz"],
	})
	.on("foo", (ctx) => {
		console.log("It works!");
	})
	.parse();
```

## Subcommands

You can define subcommands by using spaces in the command name:

```ts
const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("A simple CLI")
	.version("1.0.0")
	.command("parent child", "A subcommand")
	.on("parent child", (ctx) => {
		console.log("Subcommand was called!");
	})
	.parse();
```

## Root Command

You can define a root command (a command with no name) to handle cases when no subcommand is specified:

```ts
const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("A simple CLI")
	.version("1.0.0")
	.command("", "Root command")
	.on("", (ctx) => {
		console.log("Root command was called!");
	})
	.parse();
```

## Parameters

### General

Parameters (also known as _positional arguments_) are names that correspond to argument values. Think of parameters as variable names and argument values as values associated with variables.

You can define parameters in the `parameters` array property to access specific arguments by name. This is useful for writing more readable code, enforcing validation, and generating help documentation.

Parameters can be defined in the following formats:

- **Required parameters** are denoted by angle brackets (e.g., `<parameter name>`).
- **Optional parameters** are denoted by square brackets (e.g., `[parameter name]`).
- **Spread parameters** are denoted by the `...` suffix (e.g., `<parameter name...>` or `[parameter name...]`).

Note that required parameters **cannot come after optional parameters**, and spread parameters must be placed last.

Parameters can be accessed using camelCase notation on the `ctx.parameters` property.

Example:

```ts
// $ node ./foo-cli.mjs a b c d

const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("A simple CLI")
	.version("1.0.0")
	.command("foo", "A foo command", {
		parameters: [
			"<required parameter>",
			"[optional parameter]",
			"[optional spread...]",
		],
	})
	.on("foo", (ctx) => {
		ctx.parameters;
		//  ^?
		ctx.parameters.requiredParameter; // => "a"
		ctx.parameters.optionalParameter; // => "b"
		ctx.parameters.optionalSpread; // => ["c", "d"]
	})
	.parse();
```

### End-of-file

The end-of-file (`--`) (also known as _flag terminator_) allows users to pass a portion of arguments. This is useful for arguments that should be parsed separately from other arguments or arguments that look like flags.

An example is [`npm run`](https://docs.npmjs.com/cli/v8/commands/npm-run-script):

```sh
$ npm run <script> -- <script arguments>
```

The `--` indicates that all arguments after it should be passed to the _script_ rather than _npm_.

You can specify `--` in the `parameters` array to parse flag terminator arguments.

Example:

```ts
// $ node ./foo-cli.mjs echo -- hello world

const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("A simple CLI")
	.version("1.0.0")
	.command("echo", "Echo", {
		parameters: ["<script>", "--", "[arguments...]"],
	})
	.on("echo", (ctx) => {
		ctx.parameters;
		//  ^?
		ctx.parameters.script; // => "echo"
		ctx.parameters.arguments; // => ["hello", "world"]
	})
	.parse();
```

## Flags

Please refer to the [Flags Documentation](./flags).

## Ignore

Sometimes, you may want to ignore certain arguments or flags in the command line input. For example, this usage of `deno`:

```sh
deno run --allow-read script.ts --flag
```

Where `--flag` is passed directly to the script, not to `deno`.

You can achieve this usage by using the `ignore` property to specify which arguments or flags to ignore.

```ts
import { Clerc, PARAMETER } from "clerc";

let encounteredParameter = false;

const cli = Clerc.create()
	.scriptName("deno")
	.description("Deno CLI")
	.version("1.0.0")
	.command("run", "Run script", {
		flags: {
			allowRead: {
				type: Boolean,
				description: "Allow file system read",
			},
		},
		parameters: ["<script>", "[args...]"],
		ignore: (type) => {
			if (type === PARAMETER && !encounteredParameter) {
				encounteredParameter = true;

				return false; // Don't ignore the first parameter (script name)
			}

			// Ignore the rest of the parameters
			return encounteredParameter;
		},
	})
	.on("run", (ctx) => {
		// Handle script execution
		ctx.ignored; // => ["--flag"]
		//	^?
	})
	.parse();
```

## Advanced Usage

To separate the handler from the cli definition, you can use the `defineCommand` utility function:

```ts
import { Clerc, defineCommand } from "clerc";

const command = defineCommand({
	name: "test",
	description: "Test",
	flags: {},
	parameters: [],
	handler: (ctx) => {
		// Handler
	},
});

const cli = Clerc.create()
	.scriptName("foo-cli")
	.description("A simple CLI")
	.version("1.0.0")
	.command(command)
	.parse();
```
