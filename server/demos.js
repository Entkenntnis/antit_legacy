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
  {
    id : "demoant20324",
    name : "Crownfield",
    code : `
var Ameise = AntIT.NeueAmeise("Crownfield")
var limit = 0

Ameise.wenn("IstGeboren", function(){
	Gehe(150)
})

Ameise.wenn("IstUntätig", function(){
    if(SchrittZahl >= 1000){
   		GeheZuBau()
   	}
    else{
        Drehe(20)
        Gehe(150)
    }
})

Ameise.wenn("SiehtGegner", function(Ameise){
    SendeNachricht("gegnerGesehen",Ameise)
    SetzeGift()
    GeheZuBau()
})

Ameise.wenn(":gegnerGesehen", function(Am){
 	if(!Aktiv(Am)){
    	//console.log("<gegner tot>")
        return
    }
    GeheZuZiel(Am)
    SendeNachricht("gegnerGesehen",Am)
    SetzeGift()
    GeheZuBau()
})

Ameise.wenn("SiehtWanze", function(Wanze){
    limit = 0
    SendeNachricht("wanzeGesehen",Wanze)
    SetzeGift()
    GeheZuBau()
})
Ameise.wenn(":wanzeGesehen", function(Wan){
    limit++
    if (limit<5){
        GeheZuZiel(Wan)
        SetzeGift()
        GeheZuBau()
    }
})

Ameise.wenn("SiehtZucker", function(zucker){
    SendeNachricht("zuckerGesehen",zucker)
    NimmZucker()
    GeheZuBau()
    LadeZuckerAb()
})

Ameise.wenn(":zuckerGesehen", function(zuc){
	if (!Aktiv(zuc)) {
    	//console.log("<zuc inaktiv>")
    	return
    }
    GeheZuZielDirekt(zuc)
    SendeNachricht("zuckerGesehen",zuc)
    NimmZucker()
    GeheZuBauDirekt()
    LadeZuckerAb()
})

Ameise.wenn("SiehtApfel", function(apfel){
	limit = 0
    SendeNachricht("apfelGesehen",apfel)
    GeheZuZiel(apfel)
    TrageApfel()
   
})

Ameise.wenn(":apfelGesehen", function(apf){
    limit++
    if(limit < 8){
        GeheZuZielDirekt(apf)
        TrageApfel()
    }
})
    `,
    level : 5,
  },
  {
    id : "demoant30324",
    name : "Awesome",
    level : 6,
    code : `
let Ameise = AntIT.NeueAmeise("Awesome")

let AmeisenVerzeichnis = {}
let AktuelleAmeisenNummer = 1

function meinEintrag() {
    return AmeisenVerzeichnis[Gedächtnis.Nummer]
}

function bestimmeNächstenTyp() {
    // Mindestens 5 Späher
    // Maximal 20 Späher
    // Im Bereich 5 bis 20: 15% Späher
    // Im Bereich 20 bis 40: 20% Späher
    // Im Bereich 40 bis 60: 25% Späher
    
    let ids = Object.keys(AmeisenVerzeichnis)
    let späherAnzahl = 0
    let sammlerAnzahl = 0
    ids.forEach(id => {
        if (AmeisenVerzeichnis[id].Typ == "Späher")
            späherAnzahl++
        else
            sammlerAnzahl++
    })
    
    if (späherAnzahl < 5)
        return "Späher"
    if (späherAnzahl >= 20)
        return "Sammler"
    
    let ratio = 0.25
    if (ids.length <= 40)
        ratio = 0.2
    if (ids.length <= 20)
        ratio = 0.15
    return (späherAnzahl / ids.length <= ratio) ? "Späher" : "Sammler"
}

Ameise.wenn("IstGeboren", function(){
    Gedächtnis.Nummer = AktuelleAmeisenNummer++
    AmeisenVerzeichnis[Gedächtnis.Nummer] = {
        Typ: bestimmeNächstenTyp(),
    }
})

let EntfernungProRichtung = {}

function bestimmeNächsteRichtung() {
    let richtungen = Object.values(AmeisenVerzeichnis).filter(
        x => x.Typ == "Späher" && typeof x.Richtung == "number").map(x => x.Richtung)
    
    // Zufällige Richtung, wenn alle Richtungen frei
    if (richtungen.length == 0)
        return Zufall(0, 47)
    
    // Suche nach der größten Lücke
    let abdeckung = Array(48)
    for (let i = 0; i < 48; i++) {
        abdeckung[i] = Zufall(0,100) / 50
    }
    function zuRichtung(val) {
        while (val < 0)
            val += 48
        return val % 48
    }
    richtungen.forEach(richtung => {
        let distanz = 600
        if (EntfernungProRichtung[richtung] > 50) {
            distanz = EntfernungProRichtung[richtung]
        }
        let kern = richtung + 1
        let breite = Math.floor(Math.min(3000 / distanz, 10))
        for (let i = 1; i < breite; i++) {
            let wert = 100 - 100 * (i / breite)
            abdeckung[zuRichtung(kern + i)] += wert
            abdeckung[zuRichtung(kern - i)] += wert
        }
        abdeckung[zuRichtung(kern)] += 100
    })
    let minAbdeckung = 10000
    let minIndex = Zufall(0, 47)
    for (let i = 0; i < 48; i++) {
        if (richtungen.indexOf(i) < 0 && abdeckung[i] < minAbdeckung) {
            minAbdeckung = abdeckung[i]
            minIndex = i
        }
    }
    return minIndex
}

function bestimmeNahrungsmittel() {
    for (let nummer in ApfelVerzeichnis) {
        if (!Aktiv(ApfelVerzeichnis[nummer]))
            delete ApfelVerzeichnis[nummer]
    }
    for (let nummer in ZuckerVerzeichnis) {
        if (!Aktiv(ZuckerVerzeichnis[nummer]))
            delete ZuckerVerzeichnis[nummer]
    }
    
    // Punktzahlen verteilen:
    // Apfel unter 4: 200, Abzüglich 5 pro 100 Schritte Distanz
    // Apfel 4 bis 20 Arbeiter: 100 bis 0, abzüglich 5 pro 100 Schritte Distanz
    let bewertungen = []
    for (let nummer in ApfelVerzeichnis) {
        let arbeiter = 0
        for (let ameisennummer in AmeisenVerzeichnis) {
            let a = AmeisenVerzeichnis[ameisennummer]
            if (a.ZugeordnetTyp == "Apfel" && a.ZugeordnetNummer == nummer)
                arbeiter++
        }
        let t = {Typ:"Apfel", Nummer:nummer, Wert:0}
        if (arbeiter < 4)
            t.Wert += 200
        else if (arbeiter < 20) {
            t.Wert += (20-arbeiter) * 6
        }
        t.Wert -= 5 * Distanz(Position, ApfelVerzeichnis[nummer]) / 100
        bewertungen.push(t)
    }
    
    // Zucker: 100, abzüglich 5 pro 100 Schritte Distanz
    for (let nummer in ZuckerVerzeichnis) {
        let arbeiter = 0
        for (let ameisennummer in AmeisenVerzeichnis) {
            let a = AmeisenVerzeichnis[ameisennummer]
            if (a.ZugeordnetTyp == "Zucker" && a.ZugeordnetNummer == nummer)
                arbeiter++
        }
        let t = {Typ:"Zucker", Nummer:nummer, Wert:0}
        t.Wert += (20-arbeiter) * 5
        let distanz = Distanz(Position, ZuckerVerzeichnis[nummer])
        t.Wert -= 5 * distanz / 100
        /*if (distanz > 900) {
            t.Wert -= 5 * distanz / 100
        }
        for (let i = 0; i < TodesVerzeichnis.length; i++) {
            if (TodesVerzeichnis[i].ZugeordneterZucker == nummer) {
                t.Wert -= 20
            }
        }*/
        bewertungen.push(t)
    }
    
    let besteBewertung
    let besterWert = -100
    bewertungen.forEach(b => {
        if (b.Wert > besterWert) {
            besterWert = b.Wert
            besteBewertung = b
        }
    })
    return besteBewertung
}

Ameise.wenn("Tick", function*(){
    // Wenn ICH auf einen Todesort zulaufen, dann setze Gift und gehe zurück
    let rückzug = false
    TodesVerzeichnis.forEach(eintrag => {
        if (TickZahl - eintrag.Zeit < 120) { // innerhalb der letzten 3s
            let richtung = Richtung(Position, eintrag.Ort)
            let delta = Math.abs(Blickrichtung - richtung)
            if (delta > 180)
                delta = 360 - delta
            let entfernung = Distanz(Position, eintrag.Ort)
            if (entfernung < 40 || (delta < 45 && entfernung < 100)) {
                rückzug = true
            }
        }
    })
    if (rückzug && Gedächtnis.Rückzug != true) {
        Gedächtnis.Rückzug = true
        yield angriffUndZurück()
        Gedächtnis.Rückzug = false
    }
    
})

Ameise.wenn("IstUntätig", function*(){
    if (meinEintrag().Typ == "Späher") {
        // Späher
        yield GeheZuBau()
        let meineRichtung = bestimmeNächsteRichtung()
        meinEintrag().Richtung = meineRichtung
        DreheZuRichtung(meineRichtung * 7.5)
        yield Gehe(1200)
        EntfernungProRichtung[meineRichtung] = Distanz(Position, Bau)
        Drehe(90)
        Gehe(280)
        yield DreheZuObjekt(Bau)
        yield Gehe(Distanz(Bau, Position))
        meinEintrag().Richtung = undefined
        GeheZuBau()
    } else {
        // Sammler
        let auftrag = bestimmeNahrungsmittel()
        if (auftrag) {
            meinEintrag().ZugeordnetTyp = auftrag.Typ
            meinEintrag().ZugeordnetNummer = auftrag.Nummer
            if (auftrag.Typ == "Zucker") {
                GeheZuZiel(ZuckerVerzeichnis[auftrag.Nummer])
                NimmZucker()
                GeheZuBau()
                yield LadeZuckerAb()
                meinEintrag().ZugeordnetTyp = undefined
                meinEintrag().ZugeordnetNummer = undefined
            } else {
                GeheZuZiel(ApfelVerzeichnis[auftrag.Nummer])
                yield TrageApfel()
                meinEintrag().ZugeordnetTyp = undefined
                meinEintrag().ZugeordnetNummer = undefined
                GeheZuBau()
            }
        } else {
            meinEintrag().ZugeordnetTyp = undefined
            meinEintrag().ZugeordnetNummer = undefined
        }
    }
})

let TodesVerzeichnis = []

Ameise.wenn("IstGestorben", function(ursache){
    if (ursache == "Gift") {
        let daten = {Ort:Position, Zeit:TickZahl}
        if (meinEintrag().ZugeordnetTyp == "Zucker") {
            daten.ZugeordneterZucker = meinEintrag().ZugeordnetNummer
        }
        TodesVerzeichnis.push(daten)
    }
    delete AmeisenVerzeichnis[Gedächtnis.Nummer]
})

let ZuckerVerzeichnis = {}
let ApfelVerzeichnis = {}
let ZuckerZähler = 1
let ApfelZähler = 1

Ameise.wenn("SiehtZucker", function(zuc){
    if (Object.values(ZuckerVerzeichnis).every(x => Distanz(x, zuc) > 2)) {
        ZuckerVerzeichnis[ZuckerZähler++] = zuc
    }
})

Ameise.wenn("SiehtApfel", function(apf){
    let winkel = Richtung(Bau, apf)
    if (Object.values(ApfelVerzeichnis).every(x => Math.abs(winkel - Richtung(Bau, x)) > 2)) {
        ApfelVerzeichnis[ApfelZähler++] = apf
    }
})

function angriffUndZurück() {
    SetzeGift()
    meinEintrag().ZugeordnetTyp = undefined
    meinEintrag().ZugeordnetNummer = undefined
    GeheZuBau()
    return LadeZuckerAb()
}

Ameise.wenn("SiehtWanze", function(){
    angriffUndZurück()
})

Ameise.wenn("SiehtGegner", function(){
    angriffUndZurück()
})
    `
  },
  {
    id : "demoant45033",
    name : "Awesome Nur-Sammel",
    level : 6,
    code : `
/* jshint esversion:6 */ var Ameise = AntIT.NeueAmeise("Awesome Nur-Sammel")

let AmeisenVerzeichnis = {}
let AktuelleAmeisenNummer = 1

function meinEintrag() {
    return AmeisenVerzeichnis[Gedächtnis.Nummer]
}

function bestimmeNächstenTyp() {
    // Mindestens 5 Späher
    // Maximal 20 Späher
    // Im Bereich 5 bis 20: 40% Späher
    // Im Bereich 20 bis 40: 20% Späher
    // Im Bereich 40 bis 60: 25% Späher
    
    let ids = Object.keys(AmeisenVerzeichnis)
    let späherAnzahl = 0
    let sammlerAnzahl = 0
    ids.forEach(id => {
        if (AmeisenVerzeichnis[id].Typ == "Späher")
            späherAnzahl++
        else
            sammlerAnzahl++
    })
    
    if (späherAnzahl < 5)
        return "Späher"
    if (späherAnzahl >= 20)
        return "Sammler"
    
    let ratio = 0.25
    if (ids.length <= 40)
        ratio = 0.2
    if (ids.length <= 20)
        ratio = 0.40
    return (späherAnzahl / ids.length <= ratio) ? "Späher" : "Sammler"
}

Ameise.wenn("IstGeboren", function(){
    Gedächtnis.Nummer = AktuelleAmeisenNummer++
    AmeisenVerzeichnis[Gedächtnis.Nummer] = {
        Typ: bestimmeNächstenTyp(),
    }
})

let EntfernungProRichtung = {}

function bestimmeNächsteRichtung() {
    let richtungen = Object.values(AmeisenVerzeichnis).filter(
        x => x.Typ == "Späher" && typeof x.Richtung == "number").map(x => x.Richtung)
    
    // Zufällige Richtung, wenn alle Richtungen frei
    if (richtungen.length == 0)
        return Zufall(0, 47)
    
    // Suche nach der größten Lücke
    let abdeckung = Array(48)
    for (let i = 0; i < 48; i++) {
        abdeckung[i] = Zufall(0,100) / 50
    }
    function zuRichtung(val) {
        while (val < 0)
            val += 48
        return val % 48
    }
    richtungen.forEach(richtung => {
        let distanz = 600
        if (EntfernungProRichtung[richtung] > 50) {
            distanz = EntfernungProRichtung[richtung]
        }
        let kern = richtung + 1
        let breite = Math.floor(Math.min(3000 / distanz, 10))
        for (let i = 1; i < breite; i++) {
            let wert = 100 - 100 * (i / breite)
            abdeckung[zuRichtung(kern + i)] += wert
            abdeckung[zuRichtung(kern - i)] += wert
        }
        abdeckung[zuRichtung(kern)] += 100
    })
    let minAbdeckung = 10000
    let minIndex = Zufall(0, 47)
    for (let i = 0; i < 48; i++) {
        if (richtungen.indexOf(i) < 0 && abdeckung[i] < minAbdeckung) {
            minAbdeckung = abdeckung[i]
            minIndex = i
        }
    }
    return minIndex
}

function bestimmeNahrungsmittel() {
    for (let nummer in ApfelVerzeichnis) {
        if (!Aktiv(ApfelVerzeichnis[nummer]))
            delete ApfelVerzeichnis[nummer]
    }
    for (let nummer in ZuckerVerzeichnis) {
        if (!Aktiv(ZuckerVerzeichnis[nummer]))
            delete ZuckerVerzeichnis[nummer]
    }
    
    // Punktzahlen verteilen:
    // Apfel unter 4: 200, Abzüglich 5 pro 100 Schritte Distanz
    // Apfel 4 bis 20 Arbeiter: 100 bis 0, abzüglich 5 pro 100 Schritte Distanz
    let bewertungen = []
    for (let nummer in ApfelVerzeichnis) {
        let arbeiter = 0
        for (let ameisennummer in AmeisenVerzeichnis) {
            let a = AmeisenVerzeichnis[ameisennummer]
            if (a.ZugeordnetTyp == "Apfel" && a.ZugeordnetNummer == nummer)
                arbeiter++
        }
        let t = {Typ:"Apfel", Nummer:nummer, Wert:0}
        if (arbeiter < 4)
            t.Wert += 200
        else if (arbeiter < 20) {
            t.Wert += (20-arbeiter) * 6
        }
        t.Wert -= 5 * Distanz(Position, ApfelVerzeichnis[nummer]) / 100
        bewertungen.push(t)
    }
    
    // Zucker: 100, abzüglich 5 pro 100 Schritte Distanz
    for (let nummer in ZuckerVerzeichnis) {
        let arbeiter = 0
        for (let ameisennummer in AmeisenVerzeichnis) {
            let a = AmeisenVerzeichnis[ameisennummer]
            if (a.ZugeordnetTyp == "Zucker" && a.ZugeordnetNummer == nummer)
                arbeiter++
        }
        let t = {Typ:"Zucker", Nummer:nummer, Wert:0}
        t.Wert += (20-arbeiter) * 5
        let distanz = Distanz(Position, ZuckerVerzeichnis[nummer])
        t.Wert -= 5 * distanz / 100
        /*if (distanz > 900) {
            t.Wert -= 5 * distanz / 100
        }
        for (let i = 0; i < TodesVerzeichnis.length; i++) {
            if (TodesVerzeichnis[i].ZugeordneterZucker == nummer) {
                t.Wert -= 20
            }
        }*/
        bewertungen.push(t)
    }
    
    let besteBewertung
    let besterWert = -100
    bewertungen.forEach(b => {
        if (b.Wert > besterWert) {
            besterWert = b.Wert
            besteBewertung = b
        }
    })
    return besteBewertung
}

Ameise.wenn("IstUntätig", function*(){
    if (meinEintrag().Typ == "Späher") {
        // Späher
        yield GeheZuBau()
        let meineRichtung = bestimmeNächsteRichtung()
        meinEintrag().Richtung = meineRichtung
        DreheZuRichtung(meineRichtung * 7.5)
        yield Gehe(1200)
        EntfernungProRichtung[meineRichtung] = Distanz(Position, Bau)
        Drehe(90)
        Gehe(280)
        yield DreheZuObjekt(Bau)
        yield Gehe(Distanz(Bau, Position))
        meinEintrag().Richtung = undefined
        GeheZuBau()
    } else {
        // Sammler
        let auftrag = bestimmeNahrungsmittel()
        if (auftrag) {
            meinEintrag().ZugeordnetTyp = auftrag.Typ
            meinEintrag().ZugeordnetNummer = auftrag.Nummer
            if (auftrag.Typ == "Zucker") {
                GeheZuZiel(ZuckerVerzeichnis[auftrag.Nummer])
                NimmZucker()
                GeheZuBau()
                yield LadeZuckerAb()
                meinEintrag().ZugeordnetTyp = undefined
                meinEintrag().ZugeordnetNummer = undefined
            } else {
                GeheZuZiel(ApfelVerzeichnis[auftrag.Nummer])
                yield TrageApfel()
                meinEintrag().ZugeordnetTyp = undefined
                meinEintrag().ZugeordnetNummer = undefined
                GeheZuBau()
            }
        } else {
            meinEintrag().ZugeordnetTyp = undefined
            meinEintrag().ZugeordnetNummer = undefined
        }
    }
})

Ameise.wenn("IstGestorben", function(ursache){
    delete AmeisenVerzeichnis[Gedächtnis.Nummer]
})

let ZuckerVerzeichnis = {}
let ApfelVerzeichnis = {}
let ZuckerZähler = 1
let ApfelZähler = 1

Ameise.wenn("SiehtZucker", function(zuc){
    if (Object.values(ZuckerVerzeichnis).every(x => Distanz(x, zuc) > 2)) {
        ZuckerVerzeichnis[ZuckerZähler++] = zuc
    }
})

Ameise.wenn("SiehtApfel", function(apf){
    let winkel = Richtung(Bau, apf)
    if (Object.values(ApfelVerzeichnis).every(x => Math.abs(winkel - Richtung(Bau, x)) > 2)) {
        ApfelVerzeichnis[ApfelZähler++] = apf
    }
})

Ameise.wenn("SiehtWanze", function(){
    SetzeGift()
})
    `
  }
]
