(function(Sim){

  // Helper functions
  var Util = {}

  Util.dist = function(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }

  Util.closest = function(pos, objs, range, f) {
    var best = Infinity;
    var bestobj = undefined;
    objs.forEach(function(obj) {
      if (f && f(obj))
        return
      var d = Util.dist(obj.getPos(), pos);
      if (d < best) {
        bestobj = obj;
        best = d;
      }
    });
    if (best <= range) {
      return bestobj;
    }
    return undefined;
  }
  
  Util.inRange = function(pos, objs, range, f) {
    var res = []
    objs.forEach(function(obj) {
      if (f && f(obj))
          return
      if (Util.dist(obj.getPos(), pos) <= range) {
        res.push(obj)
      }
    })
    return res
  }

  Util.getDir = function(pos, des) {
    var d = Util.dist(pos, des);
    var dx = des.x - pos.x;
    var angle = 0;
    if (des.y < pos.y) {
      angle = (360-Math.acos(dx/d)/Math.PI*180.0)%360;
    } else {
      angle = (Math.acos(dx/d)/Math.PI*180.0)%360;
    }
    return Math.round(angle);
  }

  Util.getRotation = function(heading, angle) {
    var rotation = angle - (heading%360);
    if (rotation > 180) {
      rotation -= 360;
    }
    if (rotation < -180) {
      rotation += 360;
    }
    return rotation;
  }

  Util.moveDir = function(pos, heading, dist) {
    return {
      x:pos.x + dist*Math.cos(heading/180*Math.PI),
      y:pos.y + dist*Math.sin(heading/180*Math.PI)
    };
  }

  Util.removeIf = function(arr, f) {
    var i = arr.length;
    while (i--) {
        if (f(arr[i], i)) {
            arr.splice(i, 1);
        }
    }
  }

  Util.capitalize = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  Util.makeAttributes = function(obj, opts) {
    var output = {}
    for (var k in opts) {
      output[k] = opts[k]
      obj['get' + Util.capitalize(k)] = Util.makeGetter(output, k)
    }
    return output
  }

  Util.makeGetter = function(output, key) {
    return function(){
      return output[key]
    }
  }
  
  Util.roundTo = function(num, digits) {
    var factor = Math.pow(10, digits)
    return Math.round(num * factor) / factor
  }
  
  Sim.Util = Util

})(AntIT._rawsim)
