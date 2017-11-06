(function(Sim){
  
  var View = {}
  View.Sim = Sim
  View.Opts = AntIT._optionen

  AntIT._view = View
  
  // sealing here
  delete AntIT._sim
  delete AntIT._optionen

})(AntIT._sim)
