
// Own implementation of mongodb sessions with monk

const session = require('express-session')
const util = 
const sessionDB = App.db.get('sessions')

function MemoryStore() {
  session.Store.call(this)
}

require('util').inherits(MemoryStore, session.Store)

MemoryStore.prototype.set = function set(sessionId, session, callback) {
  // console.log(`set session ${sessionId} / ${JSON.stringify(session)}`)
  
  if (!sessionID || !session || !session.cookie || !session.cookie.expires)
    return callback(sessionId)
  
  var s = {
    sid:sessionId,
    session:JSON.stringify(session),
    expires:new Date(session.cookie.expires)
  }
  sessionDB.update({sid:sessionId}, s, {upsert: true}).then(callback)
}

MemoryStore.prototype.get = function get(sessionId, callback) {
  // console.log(`get session ${sessionId}`)
  
  sessionDB.findOne({sed:sessionId}, (doc) => {
    if (!doc || !doc.session || !doc.expires)
      callback()
    
    var sess = JSON.parse(doc.session)
    sess.expires = doc.expires
    callback(null, sess)
  })
}

MemoryStore.prototype.destroy = function destroy(sessionId, callback) {
  // console.log(`destroy session ${sessionId}`)
  
  sessionDB.remove({sid:sessionId}).then(callback)
}

MemoryStore.prototype.touch = function touch(sessionId, session, callback) {
  //console.log(`touch session ${sessionId} / ${JSON.stringify(session)}`)  
  if (!session || !session.expires)
    setImmediate(callback)
  
  if (new Date(session.expires).getTime() <= Date.now() + (1000 * 60 * 30))
    MemoryStore.prototype.set(sessionId, session, callback)
  else
    setImmediate(callback)
}

module.exports = function(App) {
  
  
  sessionDB.createIndex({ expires: 1 }, { expireAfterSeconds: 0 })

  App.express.use(session({
    name: 'base.session',
    secret: 'the ant is near',
    resave: false,
    saveUninitialized: false,
    cookie : { maxAge :  60 * 6 * 1000 /* 3 hours */, },
    store : new MemoryStore(),
  }))
  
}
