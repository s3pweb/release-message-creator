#!/usr/bin/env node
'use strict'

const fs = require('fs')
const util = require('util')
const https = require('https')

const args = process.argv.slice(2)

const fileContent = fs.readFileSync(args[0], 'utf8').toString()

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
const title = util.format(args[1], versions[0][1], versions[1][1])

// Call the webhook only if we have it in the args
if (args[2]) {
  const data = JSON.stringify({
    content: title + '\n\n' + changes
  })

  const options = {
    hostname: 'discord.com',
    port: 443,
    path: args[2],
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
