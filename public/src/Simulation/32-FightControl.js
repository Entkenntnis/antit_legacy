
(function(Sim){
  
  document.addEventListener("keypress", keypresshandler);
  
  function keypresshandler(e){
    if (Sim.players.length < 2 || !Sim.Opts.Kampfmodus)
      return
    
    //console.log(e.charCode)
    if (e.charCode == 113) { // q, Arbeiter rot
      Sim.hills[0].spawnAnt()
    }
    if (e.charCode == 117) // u, Arbeiter blau
      Sim.hills[1].spawnAnt()
    if (e.charCode == 119) { // w, Kampfmeise rot
      Sim.hills[0].spawnUnit("Kampfmeise")
    }
    if (e.charCode == 105) // i, Kampfmeise blau
      Sim.hills[1].spawnUnit("Kampfmeise")
    if (e.charCode == 101) { // w, Riesenmeise rot
      Sim.hills[0].spawnUnit("Riesenmeise")
    }
    if (e.charCode == 111) // i, Riesenmeise blau
      Sim.hills[1].spawnUnit("Riesenmeise")
    if (e.charCode == 97) { // w, Riesenmeise rot
      Sim.hills[0].spawnUnit("Giftmeise")
    }
    if (e.charCode == 106) // i, Riesenmeise blau
      Sim.hills[1].spawnUnit("Giftmeise")
  }


})(AntIT._rawsim)
