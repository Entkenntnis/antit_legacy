if (require('fs').existsSync('./LEGACY')) {
  require('./server.js')
} else {
  if (process.env.antit_srcnew == "1")
    console.log("serving new simulation")
  require('./new-server.js')
}
