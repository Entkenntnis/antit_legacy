
(function(){
  
  var unitTypes = []
  var unitAttributes = {}
  var unitFunctions = {}
  var unitStore = {}
  var id = 1
  var bus = Minibus.create()
  
  function addUnitType(name) {
    if (name in unitAttributes) {
      console.log("Warning: type already defined " + name)
    } else {
      unitTypes.push(name)
      unitAttributes[name] = {}
      unitFunctions[name] = {}
      unitStore[name] = []
    }
  }
  
  function addAttribute(type, name, initVal) {
    unitAttributes[type][name] = initVal
  }
  
  function addFunction(type, name, f) {
    unitFunctions[type][name] = f
  }
  
  function createNewUnit(type, pos) {
    if (unitTypes.indexOf(type) >= 0) {
      var newUnit = new Unit(id++, type, pos)
      bus.emit("new-" + type, newUnit)
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
    addFunction: addFunction,
    create: createNewUnit,
    Bus: bus
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
    
    for (key in unitAttributes[type]) {
      attributes[key] = unitAttributes[type][key]
    }
    
    for (key in unitFunctions[type]) {
      this[key] = unitFunctions[type][key].bind(this)
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
      //bus.emit("remove-" + type, this)
      dead = true
    }
    
    this.isDead = function() {
      return dead
    }
  
  }

})()
