#!/usr/bin/env node
'use strict'

const fs = require('fs')
const util = require('util')

const args = process.argv.slice(2);

const fileContent = fs.readFileSync(args[0], 'utf8').toString()

const regex = new RegExp(/## \[.+?## \[/, 's')

const res = fileContent.match(regex)

// Extract all the versions from the changelog
const versions = [...fileContent.matchAll(new RegExp(/## \[(.*)\]/, 'gm'))]

const changes = res[0]
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

console.log(title + '\n\n' + changes)
