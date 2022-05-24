#!/usr/bin/env node
'use strict'

const fs = require('fs')
const util = require('util')
const https = require('https')
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
    describe: 'The webhook to send the message to, only the path.',
    nargs: 1,
    type: 'string'
  })

function run () {
  const { file, message, webhook } = argv

  const { title, changes } = extractTitleAndChanges(file, message)
  const messageToSend = `${title}\n\n${changes}`

  if (webhook) {
    // Call the webhook only if we have it in the args
    callDiscordWebhook(webhook, messageToSend)
  } else {
    // Print the title and the changes, if no webhook is provided
    console.log(messageToSend)
  }
}

function extractTitleAndChanges (filePath, titleMessage) {
  const fileContent = fs.readFileSync(filePath, 'utf8').toString()

  // Get the content between the first and the second releases
  const regex = /## \[.+?## \[/s
  const reducedContent = fileContent.match(regex)

  // Extract all the versions from the changelog
  const versions = [...fileContent.matchAll(/## \[(.*)]/gm)]

  const changes = reducedContent[0]
    // Remove the last line
    .replace(/\n.*$/, '').trim()
    // Remove the commits links
    .replace(/\(\[.*/g, '')
    // Remove the bitbucket version link
    .replace(/\(.*\) /, ' ')
    // Reduce double line returns to a single one
    .replace(/\n\n/g, '\n')

  // Count the number of %s in the title message
  const count = (titleMessage.match(/%s/g) || []).length

  let title = titleMessage
  if (count === 1) {
    // Format title by adding only the current version
    title = util.format(titleMessage, versions[0][1])
  } else if (count > 1) {
    // Format title by adding the current version and the old one
    title = util.format(titleMessage, versions[0][1], versions[1][1])
  }

  return { title, changes }
}

function callDiscordWebhook (url, content) {
  const data = JSON.stringify({
    content
  })

  const options = {
    hostname: 'discord.com',
    port: 443,
    path: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Call the discord API with the data
  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      process.stdout.write(d)
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.write(data)
  req.end()
}

run()
