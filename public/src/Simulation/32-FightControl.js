
(function(Sim){
  
  document.addEventListener("keypress", keypresshandler);
  
  function keypresshandler(e){
    if (Sim.players.length < 2)
      return
    
    console.log(e.charCode)
    if (e.charCode == 113) { // q, Arbeiter rot
      Sim.hills[0].spawnAnt()
    }
    if (e.charCode == 117) // u, Arbeiter grün
      Sim.hills[1].spawnAnt()
  }


})(AntIT._rawsim)
