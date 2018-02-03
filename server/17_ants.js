 
const co = require('co')
 
 
function prepareAnts(users, myid) {
  var result = {ants:[], globals:[]}
  users.forEach(function(v){
    if (v._id.toString() == myid) {
      result.ants = v.ants
      result.ants.forEach(function(a){
        a._id = a.antid
      })
    } else {
      v.ants.forEach(function(w){
        if (w.published) {
          w.publicName = "@" + v.displayName + "/" + w.name
          w._id = w.antid
          result.globals.push(w)
        }
      })
    }
  })
  return result
}


function maximumAnts(level) {
  var maximum = 10
  if (level >= 3) { maximum = 20 }
  if (level >= 5) { maximum = 30 }
  if (level >= 7) { maximum = 40 }
  if (level >= 9) { maximum = 50 }
  return maximum
}

function getName(data) {
  var eofl = data.indexOf("\n");
  if (eofl >= 0) {
    data = data.substring(0, eofl);
  }
  var namestart = data.indexOf("\"");
  var nameend = data.lastIndexOf("\"");
  var name = data.substring(namestart + 1, nameend);
  if (namestart < 0 || nameend < 0) {
    name = "[ohne Namen]";
  }
  return name;
}

function updateName(code) {
  var index = code.indexOf("\"") + 1;
  return code.slice(0, index) + "[Kopie] " + code.slice(index)
}
 
 
 
 module.exports = function(App) {

  function insertAnt(code, req) {
    var antName = getName(code)
    var antId = Math.floor(Date.now()*1000 + Math.random()*999).toString(16);
    return App.colo.getCol(req.session.colony).update({_id:req.session.userid},
        {$push: {ants: {antid:antId, name:antName, published:false,code:code}}})
  }

  function saveCode(antid, data, req) {
    return App.colo.getCol(req.session.colony).update({_id:req.session.userid, "ants.antid" : antid},
      {$set : {"ants.$.code" : data, "ants.$.name": getName(data)}})
  }

  function setPublished(antid, val, req) {
    return App.colo.getCol(req.session.colony).update({_id:req.session.userid, "ants.antid" : antid},
      {$set : {"ants.$.published": val}})
  }

  function deleteAnt(antid, req) {
    return App.colo.getCol(req.session.colony).update({_id:req.session.userid},
      {$pull : {ants: {antid:antid}}})
  }
   
  App.ants = {
    prepareAnts : prepareAnts,
    maximumAnts: maximumAnts,
  }

  App.express.get('/edit', App.users.auth, App.csurf, co.wrap(function*(req, res) {
    var users = yield App.colo.getCol(req.session.colony).find({
      _id: req.user._id, "ants.antid": req.query.id}, {"ants.$": 1})
    if (users && users.length == 1) {
      res.render('ants/edit', {
        data: users[0].ants[0].code,
        id: req.query.id,
        user: req.user,
        csrf: req.csrfToken(),
      })
    } else
      res.redirect('/')
  }))

  App.express.post('/save', App.users.auth, App.csurf, co.wrap(function*(req, res) {
  if (req.body.duplicate) {
    yield insertAnt(updateName(req.body.data), req)
  }
    yield saveCode(req.query.id, req.body.data, req)
  res.redirect('/')
  }))

  
  App.express.get('/new', App.users.auth, co.wrap(function*(req, res) {
    var val = yield App.colo.getCol(req.session.colony).find({_id: req.user._id}, {"ants.code":false})
    if (val[0].ants.length < maximumAnts(req.user.level)) {
      var codeString = `var Ameise = AntIT.NeueAmeise("` + req.query.name + `")

Ameise.wenn("", function(){
    
})`
      yield insertAnt(codeString, req)
    }
    res.redirect('/')
  }))
  
  App.express.get('/delete', App.users.auth, co.wrap(function*(req, res) {
    yield deleteAnt(req.query.id, req)
    res.redirect('/')
  }))
  
  App.express.get('/publish', App.users.auth, co.wrap(function*(req, res) {
    yield setPublished(req.query.id, true, req)
    res.redirect('/')
  }))
  
  App.express.get('/unpublish', App.users.auth, co.wrap(function*(req, res) {
    yield setPublished(req.query.id, false, req)
    res.redirect('/')
  }))
}
