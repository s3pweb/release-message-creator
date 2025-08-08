'use strict'

const fs = require('fs')
const path = require('path')
const axios = require('axios')

jest.mock('axios')

describe('createMessage', () => {
  const changelogPath = path.resolve(__dirname, '../CHANGELOG.md')

  beforeEach(() => {
    jest.clearAllMocks()
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

    const expectedContent = 'New release 1.1.0\n\n## [1.1.0] (2025-04-11)\n\n### Features\n* add user arg to create-release-message \n\nRelease created by test-user.'

    expect(axios.post).toHaveBeenCalledWith(webhookUrl, {
      content: expectedContent
    })
  })
})
