#!/usr/bin/env node
const path = require('path')
const cli = require('cac')()

cli
  .command('<target-folder>', 'Generate Yox project to target folder')
  .action(async targetFolder => {
    const sao = require('sao')

    const app = sao({
      generator: path.join(__dirname, '../generator'),
      outDir: targetFolder
    })

    await app.run().catch(sao.handleError)
  })

cli.help()

cli.version(require('../package.json').version)

cli.parse()
