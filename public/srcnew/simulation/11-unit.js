
(function(){
  
  var unitTypes = []
  var unitAttributes = {}
  var unitStore = {}
  var id = 1
  
  function addUnitType(name) {
    if (name in unitAttributes) {
      console.log("Warning: type already defined " + name)
    } else {
      unitTypes.push(name)
      unitAttributes[name] = {}
      unitStore[name] = []
    }
  }
  
  function addAttribute(type, name, initVal) {
    unitAttributes[type][name] = initVal
  }
  
  function createNewUnit(type, pos) {
    if (unitTypes.indexOf(type) >= 0) {
      var newUnit = new Unit(id++, type, pos)
      unitStore[type].push(newUnit)
      return newUnit
    }
  }
  
  var dieDirty = {}
  
  AntIT.Bus.on('tick', function(){
    unitTypes.forEach(function(type){
      if (!dieDirty[type])
        return
      var arr = unitStore[type]
      var i = arr.length;
      while (i--) {
          if (arr[i].isDead()) {
              arr.splice(i, 1)
          }
      }
    })
  })
  
  AntIT.AddProp("Units", unitStore)
  
  AntIT.AddProp("Unit", {
    addType: addUnitType,
    addAttribute: addAttribute,
    create: createNewUnit,
  })
  
  function Unit(id, type, pos) {
    
    var pos = pos
    var dead = false
    
    this.getId = function() {
      return id
    }
    
    this.getType = function() {
      return type
    }
    
    this.getPos = function() {
      return pos
    }
    
    this.setPos = function(val) {
      pos = val
    }
    
    var attributes = {}
    
    for (key in unitAttributes) {
      attributes[key] = unitAttributes[key]
    }
    
    this.getAttr = function(name) {
      return attributes[name]
    }
    
    this.setAttr = function(name, val) {
      if (name in attributes)
        attributes[name] = val
    }
    
    this.die = function() {
      dieDirty[type] = true
      dead = true
    }
    
    this.isDead = function() {
      return dead
    }
  
  }

})()
