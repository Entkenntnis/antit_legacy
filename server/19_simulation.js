
function flattenQuery(query) {
  var antIds = []
  for (var i = 1; i <= 8; i++) {
    var val = query['team' + i]
    if (val && val != "none")
      antIds.push(val)
  }
  return antIds
}

function findAnts(users, userid, ids) {
  var ants = {}
  if (users) {
    users.forEach(function(user){
      user.ants.forEach(function(a){
        if (ids.indexOf(a.antid) >= 0) {
          if (a.published || user._id.toString() == userid) {
            ants[a.antid] = a
          }
        }
      })
    })
  }
  return ids.map(function(id){
    return ants[id]
  }).filter(function(ant){
    return ant !== undefined
  })
}

const co = require('co')

module.exports = function(App) {
  
  var simDB = App.db.get('simStats')
  simDB.createIndex({ expires: 1 }, { expireAfterSeconds: 0 })
  
  function setSimulation(req, ants) {
    return new Promise(ful => {
      var date = Date.now()
      var userid = req.user ? req.user._id : undefined
      var hash = date + "-" + userid + "-" + Math.floor(Math.random()*100000)
      var s = {
        antsID:ants.map(function(a){return a.antid}),
        antsName:ants.map(function(a){return a.name}),
        userid:userid,
        username:req.user?req.user.displayName : undefined,
        start:date,
        expires: new Date(date + 10 * 60 * 1000), // 10 minutes
        hash:hash,
        colony:req.session.colony
      }
      simDB.insert(s).then(() => {
        ful(hash)
      })
    })
  }

  function submitSimulation(hash, points, colony) {
    return new Promise(ful => {
      co(function*(){
        var s = yield simDB.find({hash:hash, colony:colony})
        if (s && s.length == 1) {
          var results = points.split(",")
          if (results.length == s[0].antsName.length) {
            yield simDB.update({_id: s[0]._id}, {$set :
              { result : results,
                expires: new Date(new Date(s[0].expires).getTime() + 7 * 24 * 60 * 60 * 1000 )}}) // store one week
            ful(true)
          } else
            ful(false)
        } else
          ful(false)
      })
    })
  }
  
  App.express.get('/simulation', App.users.auth, co.wrap(function*(req, res) {
    if (req.query.fight == 1) {
      res.render('__old/simulation', {
        code:["", ""],
        hash:"",
        seed:undefined,
        repeat:undefined,
        prefix:req.curHome,
        devMode:false,
        fightMode:true,
        level:NaN
      })
      return
    }
    if (req.user)
      req.session.cachedQuery = req.query
    var antIds = flattenQuery(req.query)
    var users = yield App.colo.getCol(req.session.colony).find({"ants.antid" : {$in:antIds}})
    var ants = findAnts(users, req.user?req.user._id.toString():"", antIds)
    var hash = yield setSimulation(req, ants)
    var seed = req.query.seedon == 1 ? JSON.stringify(req.query.seed).slice(1, -1) : undefined
    var repeat = req.query.batchon == 1 ? parseInt(req.query.repeat) : undefined
    if (repeat == NaN) repeat = undefined
    res.render(repeat ? '__old/batch' : '__old/simulation', {
      code:ants,
      hash:hash,
      seed:seed,
      repeat:repeat,
      prefix:'/',
      devMode:false,
      fightMode:false,level:NaN})
  }))
  
  
  App.express.get('/submit', App.users.auth, co.wrap(function*(req, res) {
    var r = yield submitSimulation(req.query.hash, req.query.points, req.session.colony)
    res.send(r?"ok":"fail")
  }))
  
  App.express.get('/stats', App.users.auth, co.wrap(function*(req, res) {
    var data = yield simDB.find({})
    if (req.user.superuser)
      res.render('__old/stats', {data:data, prefix:"", col: req.session.colony})
    else
      res.redirect('/')
  }))
  
  App.express.get('/clearstats', App.users.auth, co.wrap(function*(req, res) {
    yield simDB.remove({colony: req.session.colony})
    res.redirect('/stats')
  }))
}














