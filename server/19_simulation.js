
let simulations = []

function setSimulation(req, ants) {
  var date = Date.now()
  var userid = req.user ? req.user._id : undefined
  var hash = date + "-" + userid + "-" + Math.floor(Math.random()*100000)
  var s = {
    antsID:ants.map(function(a){return a.antid}),
    antsName:ants.map(function(a){return a.name}),
    userid:userid,
    username:req.user?req.user.displayName : undefined,
    start:date,
    hash:hash,
    colony:req.session.colony
  }
  simulations.push(s)
  return hash
}

function submitSimulation(hash, points, colony) {
  for (var i = 0; i < simulations.length; i++) {
    var s = simulations[i]
    var timePassed = (Date.now() - s.start) / 1000
    if (s.hash == hash && !s.result && timePassed < 600 && colony == s.colony) {
      var results = points.split(",")
      if (results.length == s.antsName.length) {
        s.result = results
        return true
      }
    }
  }
  return false
}

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
      req.session.queryCache = req.query
    var antIds = flattenQuery(req.query)
    var users = yield App.colo.getCol(req.session.colony).find({"ants.antid" : {$in:antIds}})
    var ants = findAnts(users, req.user?req.user._id.toString():"", antIds)
    var hash = setSimulation(req, ants)
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
  
  
  App.express.get('/submit', App.users.auth, function(req, res) {
    if (submitSimulation(req.query.hash, req.query.points, req.session.colony)) {
      res.send("ok")
    } else {
      res.send("fail")
    }
  })
  
  App.express.get('/stats', App.users.auth, function(req, res) {
    if (req.user.superuser)
      res.render('__old/stats', {data:simulations, prefix: req.curHome})
    else
      res.redirect('/')
  })
  
  App.express.get('/clearstats', App.users.auth, function(req, res) {
    if (req.user.superuser)
      simulations = []
    res.redirect('/clearstats')
  })
}














