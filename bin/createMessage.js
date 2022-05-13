#!/usr/bin/env node
'use strict'

const fs = require('fs')

const fileContent = fs.readFileSync('./CHANGELOG.md', 'utf8').toString()

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

const title = `Livraison de l'API en PRODUCTION, version ${versions[0][1]} (ancienne ${versions[1][1]}) :\n\n`

console.log(title + changes)
