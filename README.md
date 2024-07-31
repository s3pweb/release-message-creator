[![npm (scoped)](https://img.shields.io/npm/v/@s3pweb/release-message-creator)](https://www.npmjs.com/package/@s3pweb/release-message-creator)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Release message creator

Create a formatted release message from a [standard-release](https://github.com/conventional-changelog/standard-version) changelog.

## Installation

```shell
npm install -g @s3pweb/release-message-creator
```

## Usage

### create-release-message

The `create-release-message` command creates a release message with a title and the last version changes. 
It takes 3 optionals arguments:

- `-f` The path to the changelog file.
- `-m` A message template with up to 2 placeholders (`%s`) for the new version and the old version (in that order).
- `-w` The full webhook url to send the message to. (e.g. `https://discord.com/api/webhooks/123456789/abcdefghijklmnopqrstuvwxyz`).

```shell
create-release-message -f <changelog location> -m <message> -w <webhook discord>
```

```shell
create-release-message -f ./CHANGELOG.md -m "Release API X, version %s (replacing %s) :" -w ${WEBHOOK}
```

Result:

```
Release API X, version 0.0.5 (replacing 0.0.4):

## [0.0.5] (2022-05-24)

### Features
* **actions:** add an automatic release action 
* **webhook:** add axios to call the webhook 
```

### create-github-message

The `create-release-message` command creates a JSON string compatible with GitHub API. 
It takes 1 optional argument:

- `-f` The path to the changelog file.

```shell
create-github-message -f <changelog location>
```

```shell
create-github-message -f ./CHANGELOG.md
```

Result:

```shell
"## [0.0.5](https://github.com/s3pweb/release-message-creator/compare/v0.0.4...v0.0.5) (2022-05-24)\n\n### Features\n* **actions:** add an automatic release action ([5589f88](https://github.com/s3pweb/release-message-creator/commit/5589f88366c2690c1648fb8d82b70affac1c1904))\n* **webhook:** add axios to call the webhook ([830adb9](https://github.com/s3pweb/release-message-creator/commit/830adb9afb61dbd33823f31e8606525c9d59999f))"
```
