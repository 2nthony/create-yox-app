const path = require('path')

module.exports = {
  actions() {
    return [
      {
        type: 'add',
        templateDir: 'templates/main',
        files: '**'
      },
      {
        type: 'modify',
        files: 'package.json',
        handler: () => {
          return {
            name: this.outFolder,
            private: true,
            scripts: {
              build: 'parcel build index.html',
              serve: 'parcel index.html'
            },
            dependencies: {
              yox: 'latest'
            },
            devDependencies: {
              'parcel-bundler': '^1.12.3'
            }
          }
        }
      },
      {
        type: 'move',
        patterns: {
          _gitignore: '.gitignore'
        }
      }
    ]
  },

  async completed() {
    this.gitInit()
    await this.npmInstall()
    this.showProjectTips()

    const logCd = () => {
      if (this.outDir !== process.cwd()) {
        console.log(
          `${this.chalk.bold('cd')} ${this.chalk.cyan(
            path.relative(process.cwd(), this.outDir)
          )}`
        )
      }
    }

    this.logger.tip(`To start dev server, run following commands:`)
    logCd()
    console.log(
      `${this.chalk.bold(this.npmClient)} ${this.chalk.cyan('run dev')}`
    )

    this.logger.tip(`To build for production, run following commands:`)
    logCd()
    console.log(
      `${this.chalk.bold(this.npmClient)} ${this.chalk.cyan('run build')}`
    )
  }
}
