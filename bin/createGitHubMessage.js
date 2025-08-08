#!/usr/bin/env node
'use strict'

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
const { extractRawChanges } = require('../lib/parser')

function run () {
  const { file } = argv

  const message = extractRawChanges(file)
  // Print the title and the changes
  console.log(JSON.stringify(message))
}

run()
