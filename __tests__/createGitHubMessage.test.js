'use strict'

const { execSync } = require('child_process')

describe('createGitHubMessage', () => {
  it('should output the latest release notes as a JSON string', () => {
    const output = execSync('node bin/createGitHubMessage.js -f CHANGELOG.md').toString()
    const expected = '## [1.1.0](https://github.com/s3pweb/release-message-creator/compare/v1.0.3...v1.1.0) (2025-04-11)\n\n### Features\n* add user arg to create-release-message ([c1b79da](https://github.com/s3pweb/release-message-creator/commit/c1b79da86e59bcce448c84e1111788ffcd65975b))'
    expect(JSON.parse(output.trim())).toBe(expected)
  })
})
