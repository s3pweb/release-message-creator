'use strict'

const { extractTitleAndChanges, extractRawChanges } = require('../lib/parser')

describe('Parser', () => {
  const changelogPath = 'CHANGELOG.md'

  describe('extractRawChanges', () => {
    it('should extract the latest release notes from the changelog', () => {
      const changes = extractRawChanges(changelogPath)
      const expectedChanges = '## [1.1.0](https://github.com/s3pweb/release-message-creator/compare/v1.0.3...v1.1.0) (2025-04-11)\n\n### Features\n* add user arg to create-release-message ([c1b79da](https://github.com/s3pweb/release-message-creator/commit/c1b79da86e59bcce448c84e1111788ffcd65975b))'
      expect(changes).toBe(expectedChanges)
    })
  })

  describe('extractTitleAndChanges', () => {
    it('should extract the title and changes from the changelog', () => {
      const { title, changes } = extractTitleAndChanges(changelogPath, 'Release %s')
      const expectedChanges = '## [1.1.0] (2025-04-11)\n\n### Features\n* add user arg to create-release-message '
      expect(title).toBe('Release 1.1.0')
      expect(changes).toBe(expectedChanges)
    })

    it('should extract the title and changes from the changelog with two versions', () => {
      const { title, changes } = extractTitleAndChanges(changelogPath, 'Release %s (was %s)')
      const expectedChanges = '## [1.1.0] (2025-04-11)\n\n### Features\n* add user arg to create-release-message '
      expect(title).toBe('Release 1.1.0 (was 1.0.3)')
      expect(changes).toBe(expectedChanges)
    })
  })
})
