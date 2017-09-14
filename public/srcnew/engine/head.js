
var AntIT = {}
var AntJS = AntIT

AntIT.Bus = Minibus.create()

AntIT.Options = {}

AntIT.AddOptions = function(options) {
  for (key in options) {
    if (AntIT.Options[key])
      console.log("Warning: Overwriting option " + key)
    AntIT.Options[key] = options[key]
  }
  return AntIT.Options
}

AntIT.AddProp = function(name, value) {
  if (name in AntIT)
    console.log("Warning: redefining property " + name)
  Object.defineProperty(AntIT, name, {
    get: function() { return value },
    set: function() { },
  })
}

// patch
AntIT.NeueAmeise = function(){
  return {}
}
