
(function(){

  function dist(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
  }
  
  function inRange(pos, objs, range) {
    var x = []
    objs.forEach(function(obj){
      if (dist(obj.getPos(), pos) <= range)
        x.push(obj)
    })
    return x
  }

  function closest(pos, objs, range) {
    var best = Infinity
    var bestobj = undefined
    objs.forEach(function(obj) {
      var d = dist(obj.getPos(), pos)
      if (d < best) {
        bestobj = obj
        best = d
      }
    });
    if (best <= range) {
      return bestobj
    }
    return undefined;
  }

  function getDir(pos, des) {
    var d = dist(pos, des)
    var dx = des.x - pos.x
    var angle = 0
    if (des.y < pos.y) {
      angle = (360-Math.acos(dx/d)/Math.PI*180.0)%360
    } else {
      angle = (Math.acos(dx/d)/Math.PI*180.0)%360
    }
    return Math.round(angle)
  }

  function getRotation(heading, angle) {
    var rotation = angle - (heading%360);
    if (rotation > 180) {
      rotation -= 360
    }
    if (rotation < -180) {
      rotation += 360
    }
    return rotation
  }

  function moveDir(pos, heading, dist) {
    return {
      x:pos.x + dist*Math.cos(heading/180*Math.PI),
      y:pos.y + dist*Math.sin(heading/180*Math.PI)
    }
  }

  AntIT.AddProp("Util2d", {
    dist: dist,
    inRange: inRange,
    closest: closest,
    getDir: getDir,
    getRotation: getRotation,
    moveDir: moveDir,  
  })

})()








