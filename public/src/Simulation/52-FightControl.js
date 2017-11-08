
(function(Sim){
  
  if (Sim.Opts.Kampfmodus)
    document.addEventListener("keypress", keypresshandler)
  
  function keypresshandler(e){
    
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
      
    if (e.charCode == 115) // s
      Sim.Fight.spawnUnit("Albinomeise", 0)
    if (e.charCode == 107) // k
      Sim.Fight.spawnUnit("Albinomeise", 1)
      
    if (e.charCode == 100) // d
      Sim.Fight.spawnUnit("Räubermeise", 0)
    if (e.charCode == 108) // l
      Sim.Fight.spawnUnit("Räubermeise", 1)
  }


})(AntIT._rawsim)
