 
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
 
 
 
 module.exports = function(App) {
   
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
       })
     } else
       res.redirect('/')
   }))
   
   
   
 }
