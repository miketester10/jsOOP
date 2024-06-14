/* Esercizio 
all'interno di un'azienda abbiamo dirigenti, impiegati e stagisti
SOLO i dirigenti hanno una sezione che dirigono
SOLO gli impiegati e gli stagisti hanno un capo
 
dirigenti e impiegati hanno una tariffa oraria
stagisti hanno un forfait mensile
dirigenti hanno un bonus annuale variabile
 
scrivere un metodo che calcola lo stipendio mensile dei dipendenti
scrivere un metodo che calcola lo stipendio annuale dei dipendenti */
 
 
// definisco una classe
class Dipendente {
    // elenco di proprietà (variabili)
    nome;
    cognome;
    tariffaOraria;
 
    constructor (nome, cognome, tariffaOraria) {
        this.nome = nome;
        this.cognome = cognome;
        this.tariffaOraria = tariffaOraria;
    }
 
    // metodi (funzioni)
    presentazione() {
        console.log(`Ciao! Sono ${this.nome} ${this.cognome}`);
        // console.log("Ciao! Sono " + this.nome + " " + this.cognome);
    }
 
    calcolaStipendioMensile() {
        // tariffaOraria per 8h per 20gg
        return this.tariffaOraria * 8 * 20;
    }
 
    calcolaStipendioAnnuale() {
        return this.calcolaStipendioMensile() * 12;
    }
}
 
// ISTANZA della classe -> oggetto
//const personaObj = new Persona("Sabrina", "Ianiro");
 
//personaObj.presentazione();
 
//const personaObj2 = new Persona("Elon", "Musk");
 
//personaObj2.presentazione();
 
class Dirigente extends Dipendente {
    sezione;
    bonusAnnuale;
 
 
    constructor (nome, cognome, tariffaOraria, sezione, bonusAnnuale) {
        // passo le proprietà di Persona al costruttore di Persona (super)
        super(nome, cognome, tariffaOraria);
        // valorizzo la proprietà specifica di Dirigente
        this.sezione = sezione;
        this.bonusAnnuale = bonusAnnuale;
    }
    //override
    calcolaStipendioAnnuale() {
        let noBonus = super.calcolaStipendioAnnuale();
        let bonus = (noBonus * this.bonusAnnuale) / 100;
        return noBonus + bonus;
    }
    //override
    presentazione() {
        console.log("Sono " + this.nome + " " + this.cognome + ", dirigente " + this.sezione);
    }
 
    assumere() {
        console.log("bisogna fatturare di più");
    }
    licenziare() {
        console.log("bisogna tagliare le spese");
    }
}
const obj1 = new Dirigente ("Elon", "Musk", 40, "Marketing", 35);
class Impiegato extends Dipendente {
    capo;
 
    constructor (nome, cognome, tariffaOraria, capo) {
        // passo le proprietà di Persona al costruttore di Persona (super)
        super(nome, cognome, tariffaOraria);
        this.capo = capo;
    }
 
    lamentarsiDelCapo() {
        console.log(this.capo + " è uno stronzo!");
    }
}
 
class Stagista extends Impiegato {
    forfait;
 
    constructor (nome, cognome, capo, forfait, tariffaOraria = 0) {
        super(nome, cognome, tariffaOraria, capo);
        this.forfait = forfait;
    }
    //override
    calcolaStipendioMensile() {
        if (this.tariffaOraria == 0) {
            return this.forfait;
        }
        else {
            return super.calcolaStipendioMensile();
        }
    }
}
 
 
const obj2 = new Impiegato ("Mario", "Rossi", 7.5, "Pippo");
const obj3 = new Stagista ("Povero", "Tapino", "Pippo", 500);
 
let dipendenti = [obj1, obj2, obj3];
 
for(let index = 0; index < dipendenti.length; index++) {
    dipendenti[index].presentazione();
    console.log(dipendenti[index].nome + " guadagna " + dipendenti[index].calcolaStipendioMensile() + " euro al mese");
    console.log(dipendenti[index].nome + " guadagna " + dipendenti[index].calcolaStipendioAnnuale() + " euro all'anno");
}