var users = undefined;
var ants = undefined;
var code = undefined;

exports.setDB = function(db) {
  users = db.collection("antmeUsers");
  ants = db.collection("antmeAnts");
  code = db.collection("antmeCode");
}

var ObjectID = require('mongodb').ObjectID;

exports.findById = function(id, cb) {
  users.findOne({_id:new ObjectID(id)}, function(err, user) {
    return cb(null, user);
  });
};

exports.findByUsername = function(username, cb) {
  users.findOne({username:username}, function(err, user) {
    return cb(null, user);
  });
}

exports.loadUserAnts = function(id, cb) {
  ants.find({userid:id}).toArray(function(err, docs){
    return cb(null, docs);
  });
}

exports.loadGlobalAnts = function(userid, cb) {
  var results = [];
  ants.find({published:true, userid:{$ne:userid}}).toArray(function(err, docs){
    docs.forEach(function(val){
      exports.findById(val.userid, function(err, user){
        val.publicName = "@" + user.displayName + "/" + val.name;
        results.push(val);
        if (results.length == docs.length) {
          return cb(null, results);
        }
      });
    });
    if (docs.length == 0) {
      return cb(null, []);
    }
  });
}

exports.loadCode = function(userid, id, cb) {
  ants.findOne({_id:new ObjectID(id), userid:new ObjectID(userid)}, function(err, ant) {
    if (!ant) return cb("ant is not accessible");
    code.findOne({_id:ant.codeid}, function(err, code) {
      return cb(null, code ? code.code : "");
    });
  });
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

exports.saveCode = function(userid, id, data, cb) {
  ants.findOne({_id:new ObjectID(id), userid:new ObjectID(userid)}, function(err, ant) {
    if (!ant) return cb("ant is not accessible");
    var name = getName(data);
    ants.updateOne({_id:new ObjectID(id)}, {$set:{name:name}}, function() {
      code.updateOne({_id:ant.codeid}, {$set:{code:data}}, function(){
        return cb();
      });
    });
  });
}

exports.loadCodeArray = function(user, ids, cb, results){ 
  results = results || [];
  if (ids.length == 0) {
    return process.nextTick(function(){cb(null, results)});
  }
  var curId = ids.shift();
  var cont = function(){
      return exports.loadCodeArray(user, ids, cb, results);
  }
  ants.findOne({_id:new ObjectID(curId)}, function(err, ant) {
    if (!ant)
      return cont();
    if (!ant.published && !(user && ant.userid == user._id.toHexString())) {
      return cont();
    }
    code.findOne({_id:ant.codeid}, function(err, code) {
      results.push(code);
      return cont();
    });
  });
}

exports.publishAnt = function(userid, id, val, cb) {
  ants.find({_id:new ObjectID(id), userid:new ObjectID(userid)}, function(err, ant) {
    if (!ant)
      return cb("Can't access ant");
    ants.updateOne({_id:new ObjectID(id)}, {$set:{published:val}}, function(){
      return cb();
    });
  });
};

var fs = require('fs');

exports.addAnt = function(userid, codeString, cb) {
  ants.find({userid:new ObjectID(userid)}).count(function(err, count){
    if (count < 20) {
      code.insert({code:codeString}, function(err, doc){
        var codeid = doc.insertedIds[0];
        var name = getName(codeString);
        ants.insert({codeid:codeid, published:false, name:name, userid:new ObjectID(userid)}, function(){
          return cb();
        })
      });
    } else {
      return cb();
    }
  });
}

exports.deleteAnt = function(userid, id, cb) {
  ants.findOne({_id: new ObjectID(id), userid: new ObjectID(userid)}, function(err, ant){
    if (err || !ant) return cb("unable to delete ant");
    ants.deleteOne({_id: ant._id}, function(err, val) {
      code.deleteOne({_id:ant.codeid}, function() {
        return cb();
      });
    });
  });
}

function findOrphanCodes(cb) {
  code.find({}).toArray(function(err, docs){
    var counter = docs.length;
    var orphanIds = [];
    if (counter == 0) {
      return cb(null, []);
    }
    docs.forEach(function(doc){
      ants.findOne({codeid:doc._id}, function(err, val){
        if (!val)
          orphanIds.push(doc._id);
        if (--counter == 0) {
          return cb(null, orphanIds);
        }
      });
    });
  });
}

function findOrphanAnts(cb) {
  ants.find({}).toArray(function(err, docs){
    var counter = docs.length;
    var orphanIds = [];
    if (counter == 0) {
      return cb(null, []);
    }
    docs.forEach(function(doc){
      users.findOne({_id:doc.userid}, function(err, val){
        if (!val)
          orphanIds.push(doc._id);
        if (--counter == 0) {
          return cb(null, orphanIds);
        }
      });
    });
  });
}

function deleteIds(ids, db, cb) {
  if (ids && ids.length > 0) {
    var counter = ids.length;
    ids.forEach(function(id){
      db.deleteOne({_id:new ObjectID(id)}, function(){
        if (--counter == 0)
          cb(null, ids.length + " entries deleted");
      });
    });
  } else {
    return cb(null, "nothing to do");
  }
}

exports.repairDB = function(cb) {
  findOrphanAnts(function(err, oAnts){
    deleteIds(oAnts, ants, function(err, msg1){
      findOrphanCodes(function(err, oCodes){
        deleteIds(oCodes, code, function(err, msg2){
          cb("ants: " + msg1 + "<br>code: " + msg2);
        });
      });
    });
  });
}

exports.userlist = function(cb) {
  users.find({}).toArray(function(err, docs){
    cb(null, docs);
  });
}

exports.addUser = function(query, cb){
  users.findOne({username:query.username}, function(err, user){
    if (!user) {
      users.insert({username:query.username, displayName:query.displayName, password:query.password, superuser:("superuser" in query)}, function(err, res){
        cb();
      });
    } else {
      users.updateOne({_id:user._id}, {$set:{displayName:query.displayName, password:query.password, superuser:("superuser" in query)}}, function(){
        cb();
      });
    }
  });
}

exports.deleteUser = function(id, cb){
  users.deleteOne({_id:new ObjectID(id)}, function(){
    exports.repairDB(function(){
      cb();
    });
  });
}




















