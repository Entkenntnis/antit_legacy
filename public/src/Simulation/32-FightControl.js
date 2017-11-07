
(function(Sim){
  
  document.addEventListener("keypress", keypresshandler);
  
  function keypresshandler(e){
    if (Sim.players.length < 2 || !Sim.Opts.Kampfmodus)
      return
    
    //console.log(e.charCode)
    if (e.charCode == 113) { // q, Arbeiter rot
      Sim.hills[0].spawnAnt()
    }
    if (e.charCode == 117) // u, Arbeiter grün
      Sim.hills[1].spawnAnt()
    if (e.charCode == 119) { // w, Kampfmeise rot
      Sim.hills[0].spawnUnit()
    }
    if (e.charCode == 105) // i, Kampfmeise grün
      Sim.hills[1].spawnUnit()
  }


})(AntIT._rawsim)
