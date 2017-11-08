
(function(Sim){
  
  if (Sim.Opts.Kampfmodus)
    document.addEventListener("keypress", keypresshandler)
  
  function keypresshandler(e){
    
    //console.log(e.charCode)
    if (e.charCode == 113) // q
      Sim.Fight.spawnUnit("Arbeitermeise", 0)
    if (e.charCode == 117) // u
      Sim.Fight.spawnUnit("Arbeitermeise", 1)
      
    if (e.charCode == 119) // w
      Sim.Fight.spawnUnit("Kampfmeise", 0)
    if (e.charCode == 105) // i
      Sim.Fight.spawnUnit("Kampfmeise", 1)
      
    if (e.charCode == 101) // e
      Sim.Fight.spawnUnit("Riesenmeise", 0)
    if (e.charCode == 111) // o
      Sim.Fight.spawnUnit("Riesenmeise", 1)
      
    if (e.charCode == 97) // a
      Sim.Fight.spawnUnit("Giftmeise", 0)
    if (e.charCode == 106) // j
      Sim.Fight.spawnUnit("Giftmeise", 1)
  }


})(AntIT._rawsim)
