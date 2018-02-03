 
var exercises = {}
var exIndex = {}
var tutorials = {}
var tutIndex = {}

function initExercises() {
  exercises = require('./exercises').exercises
  exIndex = {}
  for (var i = 1; i <= 9; i++) exIndex [i] = []
  for (var id in exercises) {
    var ex = exercises[id]
    exIndex[ex.level].push(id)
  }
  for (var id in exIndex) {
    exIndex[id].sort((a,b)=>a-b)
  }
  tutorials = require('./tutorials').tutorials
  tutIndex = {}
  for (var i = 1; i <= 9; i++) tutIndex [i] = []
  for (var id in tutorials) {
    var ex = tutorials[id]
    tutIndex[ex.level].push(id)
  }
  for (var id in tutIndex) {
    tutIndex[id].sort((a,b)=>a-b)
  }
}
