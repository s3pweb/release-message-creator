#!/usr/bin/env node
'use strict'

const fs = require('fs')
const { argv } = require('yargs')
  .scriptName('create-github-message')
  .usage('Usage: $0 -f <PathToChangelog> -m <message>')
  .example(
    '$0 -f ./CHANGELOG.md',
    'Extract the latest changes from a changelog.'
  )
  .option('f', {
    alias: 'file',
    describe: 'The changelog to parse.',
    nargs: 1,
    type: 'string',
    default: './CHANGELOG.md'
  })

function run () {
  const { file } = argv

  const message = extractTitleAndChanges(file)
  // Print the title and the changes
  console.log(JSON.stringify(message))
}

function extractTitleAndChanges (filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8').toString()

  // Get the content between the first and the second releases
  const regex = /## \[.+?## \[/s
  const reducedContent = fileContent.match(regex)

  return reducedContent[0]
    // Remove the last line
    .replace(/\n.*$/, '')
    // Reduce double line returns to a single one
    .replace(/\n\n/g, '\n')
    .trim()
}

run()
