var childProcess = require('child_process')
var name = require('../package.json').name
var version = process.env.VERSION || require('../package.json').version

module.exports = {
	NAME: name,
	VERSION: version,
	GIT_BRANCH: exec('git rev-parse --abbrev-ref HEAD'),
	GIT_REVISION: exec('git rev-parse HEAD'),
	BUILD_ON: new Date().toISOString()
}

function exec (cmd) {
	return childProcess.execSync(cmd).toString().replace(/[\n\r]/, '')
}
