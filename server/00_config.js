module.exports = function(app) {
  try {
    app.config = require('../config')
  } catch (e) {
    console.log("config.js file not readable. Please configure the server first!")
    process.exit(1)
  }
}
