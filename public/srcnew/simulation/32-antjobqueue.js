
(function(){

  var Opts = AntIT.AddOptions({
    JobLimit : 100,
  })

  AntIT.Unit.addAttribute('Ant', 'jobs')
  AntIT.Unit.addAttribute('Ant', 'insertionPoint', 0)
  
  AntIT.Unit.Bus.on('create-ant', function(ant){
    ant.setAttr('jobs', [])
    
    AntIT.Bus.on('tick', function(){
      ant.refreshInsertionPoint()
      var jobs = ant.getAttr('jobs')
      if (jobs.length > 0) {
        var curJob = jobs[jobs.length - 1];
        var finished = curJob.callback.bind(this)();
        if (finished) {
          var index = jobs.indexOf(curJob);
          if (index >= 0) {
            jobs.splice(index, 1);
            if (ant.getAttr('insertionPoint') > index) {
              ant.setAttr('insertionPoint', ant.getAttr('insertionPoint') - 1)
            }
          }
        }
      } else {
        AntIT.Unit.Bus.emit('ant-waiting', ant)
      }
    })
  })
  
  AntIT.Unit.addFunction('Ant', 'addJob', function(name, val, cb){
    if (this.getAttr('jobs').length > Opts.JobLimit) {
      AntIT.Bus.emit('error', "Warteschlange der Ameise ist vollgelaufen!")
      return
    }
    this.getAttr('jobs').splice(this.getAttr('insertionPoint'), 0, new Job(name, val, cb))
  })
  
  AntIT.Unit.addFunction('Ant', 'addSimpleJob', function(f, val) {
    this.addJob("SIMPLE", val, function(){
      f.apply(this)
      return true
    })
  })
  
  AntIT.Unit.addFunction('Ant',  'removeOldJobs', function() {
    this.getAttr('jobs').splice(0, this.getAttr('insertionPoint'))
    this.setAttr('insertionPoint', 0)
  })
  
  AntIT.Unit.addFunction('Ant', 'refreshInsertionPoint', function(){
    this.setAttr('insertionPoint', this.getAttr('jobs').length)
  })
  
  function Job(type, value, cb) {
    this.type = type;
    this.value = value;
    this.callback = cb;
  }



})()
