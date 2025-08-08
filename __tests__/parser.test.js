'use strict'

const { extractTitleAndChanges, extractRawChanges } = require('../lib/parser')
const fs = require('fs')

describe('Parser', () => {
  beforeAll(() => {
    // Create a dummy changelog file
    fs.writeFileSync('CHANGELOG.md', `
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2021-08-01
### Added
- A new feature

## [1.0.0] - 2021-07-01
### Added
- Initial release
`)
  })

  afterAll(() => {
    // Remove the dummy changelog file
    fs.unlinkSync('CHANGELOG.md')
  })

  describe('extractRawChanges', () => {
    it('should extract the latest release notes from the changelog', () => {
      const changes = extractRawChanges('CHANGELOG.md')
      expect(changes).toBe('## [1.1.0] - 2021-08-01\n### Added\n- A new feature')
    })
  })

  describe('extractTitleAndChanges', () => {
    it('should extract the title and changes from the changelog', () => {
      const { title, changes } = extractTitleAndChanges('CHANGELOG.md', 'Release %s')
      expect(title).toBe('Release 1.1.0')
      expect(changes).toBe('## [1.1.0] - 2021-08-01\n### Added\n- A new feature')
    })

    it('should extract the title and changes from the changelog with two versions', () => {
      const { title, changes } = extractTitleAndChanges('CHANGELOG.md', 'Release %s (was %s)')
      expect(title).toBe('Release 1.1.0 (was 1.0.0)')
      expect(changes).toBe('## [1.1.0] - 2021-08-01\n### Added\n- A new feature')
    })
  })
})
