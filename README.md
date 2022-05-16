[![npm (scoped)](https://img.shields.io/npm/v/@s3pweb/release-message-creator)](https://www.npmjs.com/package/@s3pweb/release-message-creator)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Release message creator

Create a formatted release message from a [standard-release](https://github.com/conventional-changelog/standard-version) changelog.

## Installation

```shell
npm install -g @s3pweb/release-message-creator
```

## Usage

The `create-release-message` takes 3 arguments:

- `-f` The path to the changelog file.
- `-m` A message template with 2 placeholders (`%s`) for the new version and the old version (in that order).
- `-w` The path part of a discord webhook (e.g. `/api/webhooks/123456789/abcdefghijklmnopqrstuvwxyz`).

```shell
create-release-message -f <changelog location> -m <message> -w <webhook discord>
```

```shell
create-release-message -f ./CHANGELOG.md -m "Release API X, version %s (replacing %s) :" -w ${WEBHOOK}
```
