
function flattenQuery(query) {
  var antIds = []
  var antColors = []
  for (var i = 1; i <= 8; i++) {
    var val = query['team' + i]
    if (val && val != "none") {
      antIds.push(val)
      antColors.push(i-1)
    }
  }
  return {antIds,antColors}
}

function findAnts(users, userid, ids) {
  var ants = {}
  if (users) {
    users.forEach(function(user){
      user.ants.forEach(function(a){
        if (ids.indexOf(a.antid) >= 0) {
          if (a.published || user._id.toString() == userid) {
            ants[a.antid] = a
            ants[a.antid].username = user.username
            ants[a.antid].level = user.level
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
      var allpub = true
      var alldifferent = true
      for (var i = 0; i < ants.length; i++) {
        if (!ants[i].published) allpub = false
        for (var j = i + 1; j < ants.length; j++) {
          if (ants[i].username == ants[j].username)
            alldifferent = false
        }
      }
      var s = {
        antsID:ants.map(function(a){return a.antid}),
        antsName:ants.map(function(a){return a.name}),
        userNames:ants.map(a => a.username),
        userid:userid,
        countable: /*allpub &&*/ ants.length >= 2 && /*ants.length <= 8 &&*/ alldifferent,
        toCount: false,
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
                toCount : s[0].countable,
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
    if (req.user)
      req.session.cachedQuery = req.query
    var query = flattenQuery(req.query)
    var antIds = query.antIds
    var users = yield App.colo.getCol(req.session.colony).find({"ants.antid" : {$in:antIds}})
    var ants = findAnts(users, req.user?req.user._id.toString():"", antIds)
    var hash = yield setSimulation(req, ants)
    var seed = req.query.seedon == 1 ? JSON.stringify(req.query.seed).slice(1, -1) : undefined
    var repeat = req.query.batchon == 1 ? parseInt(req.query.repeat) : undefined
    if (repeat == NaN) repeat = undefined
    res.render('ants/simulation', {
      code:ants,
      hash:hash,
      seed:seed,
      repeat:repeat,
      prefix:'/wettbewerb',
      devMode:req.user.level == 10,
      fightMode:false,
      level:NaN,
      title:"Wettbewerb",
      colors:query.antColors,
    })
  }))
  
  
  App.express.get('/submit', App.users.auth, co.wrap(function*(req, res) {
    var r = yield submitSimulation(req.query.hash, req.query.points, req.session.colony)
    res.send(r?"ok":"fail")
  }))
  
  App.express.get('/stats', App.users.auth, co.wrap(function*(req, res) {
    var data = yield simDB.find({})
    if (req.user.superuser)
      res.render('admin/stats', {data:data, prefix:"", col: req.session.colony})
    else
      res.redirect('/')
  }))
  
  App.express.get('/clearstats', App.users.auth, co.wrap(function*(req, res) {
    if (req.user.superuser) {
      yield simDB.remove({colony: req.session.colony})
      res.redirect('/stats')
    } else {
      res.redirect('/')
    }
  }))
  
  App.express.get('/ranking', App.users.auth, co.wrap(function*(req, res) {
    let users = yield App.colo.getCol(req.session.colony).find({}, {ants: false})
    let results = yield simDB.find({colony:req.session.colony, toCount:true})
    let stats = users.map(u => {
      var sum = 0
      var count = 0
      for (var i = 0; i < results.length; i++) {
        var r = results[i]
        var ind = r.userNames.indexOf(u.username)
        if (ind >= 0) {
          sum += parseInt(r.result[ind])
          count++
        }
      }
      return {name:u.username,points:count>0?sum/count:0,count:count}
    })
    stats.sort((a,b) => a.points < b.points ? 1 : -1)
    stats = stats.filter(s => s.points > 0 || s.count > 0)
    results.sort((a,b) => a.start < b.start ? 1 : -1)
    results.length = Math.min(results.length, 20)
    let log = results.map(r => {
      var t = []
      for (var i = 0; i < r.userNames.length; i++) {
        t.push(`${r.antsName[i]} (${r.userNames[i]}): ${r.result[i]}`)
      }
      return t.join(' / ')
    })
    res.send(JSON.stringify({stats:stats,log:log}))
  }))
}














