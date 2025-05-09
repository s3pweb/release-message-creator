# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [1.1.0](https://github.com/s3pweb/release-message-creator/compare/v1.0.3...v1.1.0) (2025-04-11)


### Features

* add user arg to create-release-message ([c1b79da](https://github.com/s3pweb/release-message-creator/commit/c1b79da86e59bcce448c84e1111788ffcd65975b))

## [1.0.3](https://github.com/s3pweb/release-message-creator/compare/v1.0.2...v1.0.3) (2025-03-21)

## [1.0.2](https://github.com/s3pweb/release-message-creator/compare/v1.0.1...v1.0.2) (2024-07-31)

### [1.0.1](https://github.com/s3pweb/release-message-creator/compare/v1.0.0...v1.0.1) (2022-11-25)


### Bug Fixes

* **discord:** avoid losing the last line of the last message ([6fdc799](https://github.com/s3pweb/release-message-creator/commit/6fdc799c0c15e6d23dff2073d4368c770846d543))

## [1.0.0](https://github.com/s3pweb/release-message-creator/compare/v0.1.2...v1.0.0) (2022-11-25)


### Features

* **discord:** send multiple messages if the changelog is too long ([d79e3ca](https://github.com/s3pweb/release-message-creator/commit/d79e3ca0c7f3083a741afa1fef058094946ca529))

### [0.1.2](https://github.com/s3pweb/release-message-creator/compare/v0.1.1...v0.1.2) (2022-05-31)


### Bug Fixes

* **changes:** fix the regex to correctly match for the first release ([8c6429f](https://github.com/s3pweb/release-message-creator/commit/8c6429fe6e35f57f25aa7f9863af68350383da1a))
* **versions:** fix the regex to correctly match for the first release ([0da21d8](https://github.com/s3pweb/release-message-creator/commit/0da21d8d1e3180b928fc26517887ca6f1c132b1e))

### [0.1.1](https://github.com/s3pweb/release-message-creator/compare/v0.1.0...v0.1.1) (2022-05-31)


### Bug Fixes

* **changes:** use another regex when no changes are found ([62ac426](https://github.com/s3pweb/release-message-creator/commit/62ac42692aa1ba52c429eb0fbc8ad81e9f581605))
* **github:** use another regex when no changes are found ([91950d3](https://github.com/s3pweb/release-message-creator/commit/91950d3c07f43f4d93ee92872fc63d1d04e480ad))
* **versions:** check if we have a previous version before using it ([029b4ef](https://github.com/s3pweb/release-message-creator/commit/029b4ef88ddb9157181a48148337a2a3ef94612c))

## [0.1.0](https://github.com/s3pweb/release-message-creator/compare/v0.0.5...v0.1.0) (2022-05-25)


### Features

* **bin:** add a new bin to create a release message compatible with GitHub API ([dfc734d](https://github.com/s3pweb/release-message-creator/commit/dfc734d9b3798356acb34b5ffe0e57a0c6622d4f))

### [0.0.5](https://github.com/s3pweb/release-message-creator/compare/v0.0.4...v0.0.5) (2022-05-24)


### Features

* **actions:** add an automatic release action ([5589f88](https://github.com/s3pweb/release-message-creator/commit/5589f88366c2690c1648fb8d82b70affac1c1904))
* **webhook:** add axios to call the webhook ([830adb9](https://github.com/s3pweb/release-message-creator/commit/830adb9afb61dbd33823f31e8606525c9d59999f))

### [0.0.4](https://github.com/s3pweb/release-message-creator/compare/v0.0.3...v0.0.4) (2022-05-24)


### Features

* **title:** count the number of %s in the message before formatting ([317e9f7](https://github.com/s3pweb/release-message-creator/commit/317e9f72ed6d9c321d61ed534425b009c734684c))

### [0.0.3](https://github.com/s3pweb/release-message-creator/compare/v0.0.2...v0.0.3) (2022-05-16)


### Features

* **cli:** add yargs to better manage arguments ([1551c25](https://github.com/s3pweb/release-message-creator/commit/1551c254e7437bcb13e5d57f2d17c837680551af))


### Bug Fixes

* **discord:** call the webhook only if we have it in the args ([4f907f7](https://github.com/s3pweb/release-message-creator/commit/4f907f7d794f4a1a342c7dd966eb45b5a518fd57))
* **discord:** remove the Content-Length header ([e6ec1fa](https://github.com/s3pweb/release-message-creator/commit/e6ec1fadb1eafc6fe850af5b9fd77eb19ea158b0))

### [0.0.2](https://github.com//s3pweb/release-message-creator/compare/v0.0.1...v0.0.2) (2022-05-13)


### Features

* **discord:** send extracted content to the discord API ([d31f03c](https://github.com//s3pweb/release-message-creator/commit/d31f03cc2d17273e2b1dd1ffe7522824d4058a9b))

### [0.0.1]() (2022-05-13)


### Features

* **message:** add file location and title as arguments ([255f684](https://github.com//s3pweb/release-message-creator/commit/255f6844556698dce753702f9932abdcfdb2f1b8))
* **message:** print the formatted message in the console ([5066faf](https://github.com//s3pweb/release-message-creator/commit/5066faf4ba589196b56f4a01ff2747ddee9fe180))
