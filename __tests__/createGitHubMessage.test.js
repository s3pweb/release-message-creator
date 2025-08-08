'use strict'

const { execSync } = require('child_process')
const fs = require('fs')

describe('createGitHubMessage', () => {
  const changelogContent = `
# Changelog

## [1.1.0] - 2021-08-01
### Added
- A new feature
`

  it('should output the latest release notes as a JSON string', () => {
    fs.writeFileSync('CHANGELOG.md', changelogContent)
    const output = execSync('node bin/createGitHubMessage.js -f CHANGELOG.md').toString()
    const expected = '## [1.1.0] - 2021-08-01\n### Added\n- A new feature'
    expect(output.trim()).toBe(JSON.stringify(expected))
    fs.unlinkSync('CHANGELOG.md')
  })
})
