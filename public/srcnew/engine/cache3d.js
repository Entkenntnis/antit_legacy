
(function(){
  
  function Cache3d(proto, scene){
    var cache = {};
    var ready = [];
    var prefix = 'cachekey:';
    
    this.has = function(id){
      return (prefix + id) in cache;
    }
    
    this.get = function(id){
      if (this.has(id))
        return cache[prefix + id];
      else {
        if (ready.length > 0) {
          var next = ready.pop()
          next.visible = true;
          cache[prefix + id] = next;
          return next;
        } else {
          var newUnit = proto.clone();
          scene.add(newUnit);
          cache[prefix+id] = newUnit;
          return newUnit;
        }
      }
    }
    
    this.remove = function(id){
      var obj = cache[prefix + id];
      if (obj !== undefined) {
        obj.visible = false;
        delete cache[prefix + id];
        ready.push(obj);
      }
    }
  }
  
  AntIT.AddProp("Cache3d", Cache)

})()
