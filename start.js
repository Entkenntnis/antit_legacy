if (require('fs').existsSync('./LEGACY')) {
  require('./server.js')
} else {
  require('./new-server.js')
}
