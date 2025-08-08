'use strict'

const fs = require('fs')
const path = require('path')
const axios = require('axios')

jest.mock('axios')

describe('createMessage', () => {
  const changelogContent = `
# Changelog

## [1.1.0] - 2021-08-01
### Added
- A new feature
`
  const changelogPath = path.resolve(__dirname, 'test-CHANGELOG.md')

  beforeEach(() => {
    fs.writeFileSync(changelogPath, changelogContent)
    jest.clearAllMocks()
  })

  afterEach(() => {
    fs.unlinkSync(changelogPath)
  })

  it('should send the release message to the webhook', async () => {
    const webhookUrl = 'https://release-message-creator.requestcatcher.com/'
    const message = 'New release %s'
    const user = 'test-user'

    // Mock argv
    process.argv = [
      'node',
      'bin/createMessage.js',
      '-f',
      changelogPath,
      '-m',
      message,
      '-w',
      webhookUrl,
      '-u',
      user
    ]

    // Mock axios.post
    axios.post.mockResolvedValue({ status: 200, statusText: 'OK' })

    // Run the script in isolation
    await jest.isolateModulesAsync(async () => {
      await require('../bin/createMessage.js')
    })

    expect(axios.post).toHaveBeenCalledWith(webhookUrl, {
      content: 'New release 1.1.0\n\n## [1.1.0] - 2021-08-01\n### Added\n- A new feature\n\nRelease created by test-user.'
    })
  })
})
