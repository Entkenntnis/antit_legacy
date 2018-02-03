 

// ----------------------------
// level







// ----------------------------
// route helper

const queryCache = {}


route({name:"/doku"}, function(req, res) {
  res.render('doku', {
    user: req.user,
    highlightElement:2,
    prefix: req.curHome })
})

route({name:"/guide"}, function(req, res) {
  res.render('guide', {
    user: req.user,
    highlightElement:1,
    prefix: req.curHome })
})




/*
route({name:"/debug", login:true, superuser:true}, function(req, res) {
  App.colo.get(req.params.colony).debugging = true
  res.redirect(req.curHome)
})

route({name:"/nodebug", login:true, superuser:true}, function(req, res) {
  App.colo.get(req.params.colony).debugging = false
  res.redirect(req.curHome)
})*/


