'use strict'

const fs = require('fs')
const util = require('util')

function extractTitleAndChanges (filePath, titleMessage) {
  const fileContent = fs.readFileSync(filePath, 'utf8').toString()

  // Get the content between the first and the second releases
  const regex = /## \[.+?## \[/s
  let reducedContent = fileContent.match(regex)

  // Try another regex if the first one doesn't work (for the first release)
  if (!reducedContent) {
    reducedContent = fileContent.match(/## .+/s)
  }

  if (!reducedContent) {
    throw new Error('Could not find a release in the changelog.')
  }

  const changes = reducedContent[0]
    // Remove the last line
    .replace(/\n.*$/, '').trim()
    // Remove the commits links
    .replace(/\(\[.*/g, '')
    // Remove the bitbucket version link
    .replace(/\(.*\) /, ' ')
    // Reduce double line returns to a single one
    .replace(/\n\n/g, '\n')

  // Extract all the versions from the changelog
  let versions = [...fileContent.matchAll(/## \[(.*)]/gm)]

  // Try another regex if the first one doesn't work (for the first release)
  if (versions.length === 0) {
    versions = [...fileContent.matchAll(/## (.*) \(/gm)]
  }

  // Count the number of %s in the title message
  const count = (titleMessage.match(/%s/g) || []).length

  let title = titleMessage
  if (count === 1) {
    // Format title by adding only the current version
    title = util.format(titleMessage, versions[0][1])
  } else if (count > 1) {
    let previousVersion = '-'
    // Check if we have a previous version
    if (versions?.[1]?.[1]) {
      previousVersion = versions[1][1]
    }
    // Format title by adding the current version and the old one
    title = util.format(titleMessage, versions[0][1], previousVersion)
  }

  return { title, changes }
}

function extractRawChanges (filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8').toString()

  // Get the content between the first and the second releases
  const regex = /## \[.+?## \[/s
  let reducedContent = fileContent.match(regex)

  // Try another regex if the first one doesn't work (for the first release)
  if (!reducedContent) {
    reducedContent = fileContent.match(/## .+/s)
  }

  if (!reducedContent) {
    throw new Error('Could not find a release in the changelog.')
  }

  return reducedContent[0]
    // Remove the last line
    .replace(/\n.*$/, '')
    // Reduce double line returns to a single one
    .replace(/\n\n/g, '\n')
    .trim()
}

module.exports = {
  extractTitleAndChanges,
  extractRawChanges
}
