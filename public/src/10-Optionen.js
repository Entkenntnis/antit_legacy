// File 1: exports SimOpts with static parameters

// TONS OF options to tune

var AntIT = {};

(function(){
  "use strict";
  
 var Optionen = {
      MaximaleSpieler : 8
    , Runden : 7500
    , SpielfeldVerhältnis : 4.0/3.0
    , SpielfeldGrundGröße : 600000
    , HügelAbstand : 500
    , HügelRandAbstand : 200
    , HügelStreifenBreite : 100
    , EckenAbstand : 300
    , HügelRadius : 40
    , BauErreichtRadius : 10
    , SpielerFarben : [0xff0000, 0x00ff00, 0x0000ff, 0x00ffff,
                       0xffff00, 0xff00ff, 0xffffff, 0x000000]
    , ZuckerGröße : 250
    , ZuckerVergrößerung : 0.1
    , ApfelGröße : 2.0
    , HügelGröße : 1.0
    , AmeisenGröße : 2.5
    , WanzenGröße : 1.5
    , ZuckerBoxGröße : 3.0
    , MarkerGröße : 0.6
    , MarkerDauer : 25
    , MarkerVergrößerung : 1.04
    , MarkerDurchsichtigkeit : 0.3
    , MarkerFading : 0.92
    , ZuckerStückchenHöhe : 7.3
    , NahrungMindestEntfernung : 450
    , NahrungMaximalEntfernung : 1000
    , NahrungAbstand : 150
    , NahrungsWartezeit : 450
    , AmeiseWartezeit : 30
    , AmeisenMaximum : 100
    , AmeiseGeschwindigkeit : 5
    , AmeiseDrehgeschwindigkeit : 8
    , AmeiseSichtweite : 70
    , AmeiseTragkraft : 5
    , PunkteProZucker : 5
    , ZuckerVerlangsamung : 0.75
    , TicksProSekunde : 40
    , MaximalÜbersprungeneFrames : 10
    , AmeisenFürApfel : 4
    , MaximumAmeisenFürApfel : 20
    , ApfelMinGeschwindigkeit : 0.2
    , ApfelMaxGeschwindigkeit : 2.0
    , ApfelRadius : 20
    , PunkteProApfel : 1000
    , AnfangsEnergie : 4000
    , EnergieFürAmeise : 200
    , EnergieProApfel : 2000
    , EnergieProZucker : 10
    , AmeisenReichweite : 3000
    , WanzenProSpieler : 1
    , WanzenWartezeit : 300
    , AmeisenEnergie : 60
    , WanzenKampfweite : 12
    , WanzenAngriff : 10
    , WanzeDrehgeschwindigkeit : 5
    , WanzeGeschwindigkeit : 3
    , WanzeSichtweite : 60
    , WanzenHügelAbstand : 250
    , ZufallRichtungsVerschiebung : 11
    , EntwicklerModus : false
    , Toleranz : 3
    , ZuckerRadius : 10
    , JobLimit : 100
  }
 
  //export
  AntIT._optionen = Optionen;
})();
