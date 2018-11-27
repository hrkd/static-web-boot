var env = require('./release-version')

module.exports =
  env.NAME + ' v' +  env.VERSION + '\n' +
  '#rev(' + env.GIT_BRANCH + ':' + env.GIT_REVISION + ') \n' +
  'Build on ' + env.BUILD_ON
