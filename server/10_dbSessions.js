
// Own implementation of mongodb sessions with monk

const session = require('express-session')

module.exports = function(App) {
  
  
  const sessionDB = App.db.get('sessions')
  sessionDB.createIndex({ expires: 1 }, { expireAfterSeconds: 0 })
  
  function DBStore() {
    session.Store.call(this)
  }
  
  require('util').inherits(DBStore, session.Store)

  DBStore.prototype.set = function set(sessionId, session, callback) {
    console.log('set session ' + sessionId + JSON.stringify(session))
    if (session && session.cookie && session.cookie.expires) {
      var s = {
        sid:sessionId,
        session:JSON.stringify(session),
        expires:new Date(session.cookie.expires)
      }
      return sessionDB.update({sid:sessionId}, s, {upsert: true}, () => {
        console.log('done')
        callback()
      })
    } else
    callback && setImmediate(callback, sessionId)
  }

  DBStore.prototype.get = function get(sessionId, callback) {
    console.log('get session ' + sessionId)
    sessionDB.findOne({sid:sessionId}).then((doc) => {
      if (!doc || !doc.session || !doc.expires)
        callback()
      else {
        var sess = JSON.parse(doc.session)
        sess.expires = doc.expires
        callback(null, sess)
      }
    })
  }

  DBStore.prototype.destroy = function destroy(sessionId, callback) {
    sessionDB.remove({sid:sessionId}).then(callback)
  }

  DBStore.prototype.touch = function touch(sessionId, session, callback) {
    if (session && session.expires) {
      if (new Date(session.expires).getTime() <= Date.now() + (1000 * 60 * 60 * 2))
        return DBStore.prototype.set(sessionId, session, callback)
    }
    callback && setImmediate(callback)
  }
  
  App.express.use(session({
    name: 'base.session',
    secret: 'the ant is near',
    resave: false,
    saveUninitialized: false,
    cookie : { maxAge : 1000 * 60 * 60 * 3 /* 3 hours */ },
    store : new DBStore(),
  }))
  
  App.express.use(function(req, res, next) {
    // overwrite redirect and save session before redirect ...
    var origRed = res.redirect
    res.redirect = function(){
      if (req.session.save) {
        req.session.save(() => {
          origRed.apply(this, arguments)
        })
      } else
        origRed.apply(this, arguments)
    }
    
    next()
  })
}
