module.exports.demos = [
  {
    id :  "demoant194398",
    name : "Einfache Sammelmeise",
    code : `
var Ameise = AntIT.NeueAmeise("Einfache Sammelmeise")

Ameise.wenn("IstUntätig", function(){
    Gehe(200)
    Drehe(20)
    Warte(20)
})

Ameise.wenn("SiehtZucker", function(zuc){
    GeheZuZielDirekt(zuc)
    NimmZucker()
    GeheZuBauDirekt()
    LadeZuckerAb()
})

Ameise.wenn("SiehtApfel", function(apf){
    GeheZuZielDirekt(apf)
    TrageApfel()
    GeheZuBauDirekt()
})

Ameise.wenn("SiehtWanze", function(){
    SetzeGift()
    GeheZuBau()
    LadeZuckerAb()
})

Ameise.wenn("RandErreicht", function(){
    GeheZuBau()
})
    `,
    level : 5,
  }, 
]
