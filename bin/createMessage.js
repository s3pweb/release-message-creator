#!/usr/bin/env node
'use strict'

const fs = require('fs')
const util = require('util')
const https = require('https')
const { argv } = require('yargs')
  .scriptName('create-release-message')
  .usage('Usage: $0 -f <path to changelog> -m <message>')
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
    describe: 'A message template with 2 placeholders (`%s`) for the new version and the old version (in that order). To display before the changelog.',
    nargs: 1,
    type: 'string',
    default: 'Release API X, version %s (replacing %s):'
  })
  .option('w', {
    alias: 'webhook',
    describe: 'The webhook to send the message to, only the path.',
    nargs: 1,
    type: 'string',
  })

const { file, message, webhook } = argv

console.log(argv)

const fileContent = fs.readFileSync(file, 'utf8').toString()

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

// Format title by adding the current version and the old one
const title = util.format(message, versions[0][1], versions[1][1])

// Call the webhook only if we have it in the args
if (webhook) {
  const data = JSON.stringify({
    content: title + '\n\n' + changes
  })

  console.log(data)

  const options = {
    hostname: 'discord.com',
    port: 443,
    path: webhook,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length + 1
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
} else {
  // Print the title and the changes, if no webhook is provided
  console.log(title + '\n\n' + changes)
}
