#!/usr/bin/env node
'use strict'

const axios = require('axios').default
const { argv } = require('yargs')
  .scriptName('create-release-message')
  .usage('Usage: $0 -f <PathToChangelog> -m <message>')
  .example(
    '$0 -f ./CHANGELOG.md -m "Release %s replacing %s" -w /api/webhooks/123456789/abcdefghijklmnopqrstuvwxyz',
    'Create the release message for the latest version in CHANGELOG.md and send it to the given discord webhook or the console.'
  )
  .option('f', {
    alias: 'file',
    describe: 'The changelog to parse.',
    nargs: 1,
    type: 'string',
    default: './CHANGELOG.md'
  })
  .option('m', {
    alias: 'message',
    describe: 'A message template with up to 2 placeholders (`%s`) for the new version and the old version (in that order). To display before the changelog.',
    nargs: 1,
    type: 'string',
    default: 'Release API X, version %s (replacing %s):'
  })
  .option('w', {
    alias: 'webhook',
    describe: 'The full webhook url to send the message to.',
    nargs: 1,
    type: 'string'
  })
  .option('u', {
    alias: 'user',
    describe: 'The user that created the release.',
    nargs: 1,
    type: 'string'
  })

const { extractTitleAndChanges } = require('../lib/parser')

async function run () {
  const { file, message, webhook, user } = argv

  const { title, changes } = extractTitleAndChanges(file, message)
  let messageToSend = `${title}\n\n${changes}`

  if (user) {
    // Add the user to the message
    messageToSend = `${messageToSend}\n\nRelease created by ${user}.`
  }

  if (webhook) {
    // Call the webhook only if we have it in the args
    await callDiscordWebhook(webhook, messageToSend)
  } else {
    // Print the title and the changes, if no webhook is provided
    console.log(messageToSend)
  }
}

async function callDiscordWebhook (url, content) {
  let index = 0
  // Discord max length is 2000
  const maxLength = 1990
  let lastLineReturn = 1

  while (lastLineReturn > 0) {
    // Reduce message size to be under Discord's maximum
    let slicedContent = content.slice(index, index + maxLength)
    // Find the last \n to cleanly cut the message after it
    lastLineReturn = slicedContent.lastIndexOf('\n')

    // If the last \n is not the start of the slice
    if (lastLineReturn > 0) {
      // If we are at the last loop, avoid re-cutting (and losing the last line)
      if (index + maxLength < content.length) {
        // Re-cut the message
        slicedContent = slicedContent.slice(0, lastLineReturn)
      }
      try {
        const response = await axios.post(url, { content: slicedContent })
        console.log(`Successfully sent the message to the webhook: HTTP ${response.status} - ${response.statusText}.`)
      } catch (error) {
        if (error.response) {
          console.error(`Error while sending the message to the webhook: HTTP ${error.response.status} - ${error.response.statusText}`)
        } else {
          console.error(`Error while sending the message to the webhook: ${error.message}`)
        }
      }
    }
    index += lastLineReturn
    // Add a delay after the first message to avoid HTTP 429
    if (index > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
}

run()
