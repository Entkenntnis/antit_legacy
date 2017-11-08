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
    , SpielerFarben : [0xff0000, 0x0000ff, 0x00ff00, 0x00ffff,
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
    
    , KampfModus : false
    , GrundEnergie : 0
    , EinheitenLimit : 500
    , Kampf : {
      Zucker : {
        Körper : 15,
        Energie : 25,
      },
      Bau : {
        Trefferpunkte : 5000,
        Trefferrate : 40,
        Schaden : 170,
        GGeschw : 10,
        Sichtweite : 250,
        Nahzone : 90,
        Körper : 50,
      },
      Arbeitermeise : {
        Trefferpunkte : 156,
        Körper : 1,
        Anzahl : 1,
        Kosten : 300,
        Sichtweite : 700,
        Geschwindigkeit : 1.0,
        Reichweite : 10,
      },
      Kampfmeise : {
        Trefferpunkte : 140,
        Trefferrate : 40,
        Schaden : 61,
        Anzahl : 3,
        Geschwindigkeit : 0.8,
        GGeschw : 3,
        Reichweite : 20,
        Sichtweite : 100,
        Kosten: 500,
        Körper : 10,
      },
      Riesenmeise : {
        Trefferpunkte : 1600,
        Trefferrate : 56,
        Schaden : 315,
        Anzahl : 1,
        Geschwindigkeit : 0.4,
        GGeschw : 3,
        Reichweite : 30,
        Sichtweite : 100,
        Kosten: 800,
        Körper : 20,
      },
      Giftmeise : {
        Trefferpunkte : 920,
        Trefferrate : 44,
        Schaden : 210,
        Anzahl : 1,
        Geschwindigkeit : 0.7,
        GGeschw : 3,
        Reichweite : 60,
        Sichtweite : 100,
        Kosten: 700,
        Körper : 15,
      },
      Albinomeise : {
        Trefferpunkte : 240,
        Trefferrate : 32,
        Schaden : 130,
        Anzahl : 4,
        Geschwindigkeit : 1.1,
        GGeschw : 4,
        Reichweite : 20,
        Sichtweite : 100,
        Kosten: 600,
        Körper : 9,
      },
      Räubermeise : {
        Trefferpunkte : 1200,
        Trefferrate : 32,
        Schaden : 90,
        Anzahl : 1,
        Geschwindigkeit : 0.7,
        GGeschw : 4,
        Reichweite : 25,
        Sichtweite : 150,
        Kosten: 900,
        Körper : 15,
      },
    }
  }
 
  //export
  AntIT._optionen = Optionen
})();
