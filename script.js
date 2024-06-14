"use strict";

class Utente {
  nome;
  cognome;
  tesseraNumero;

  constructor(nome, cognome, tesseraNumero) {
    this.nome = nome;
    this.cognome = cognome;
    this.tesseraNumero = tesseraNumero;
  }
  presentazione() {
    console.log(
      `Ciao, mi chiamo ${this.nome} ${this.cognome} ed ho la tessera numero ${this.tesseraNumero}`
    );
  }
}

const utente1 = new Utente("Mario", "Rossi", "0001");
const utente2 = new Utente("Carlo", "Verdi", "0002");

utente1.presentazione();
utente2.presentazione();

class Persona {
  nome;
  cognome;
  isAlive = true;
  constructor(nome, cognome) {
    this.nome = nome;
    this.cognome = cognome;
  }

  presentazione() {
    console.log(`Ciao! Mi chiamo ${this.nome} ${this.cognome}`);
    if (this.isAlive) {
      console.log("sono vivo!!");
    } else {
      console.log("sono morto!!!");
    }
  }
}

class Studente extends Persona {
  corso;
  matricola;

  constructor(nome, cognome, corso, matricola) {
    super(nome, cognome);
    this.corso = corso;
    this.matricola = matricola;
  }
  presentazione() {
    super.presentazione();
    console.log(`Sono uno studente di ${this.corso}`);
  }
  sostenereEsame(materia) {
    console.log(`Oggi devo fare l'esame di ${materia}`);
  }
}

const studente1 = new Studente("Pippo", "De Pippis", "Informatica", "mat0001");
studente1.presentazione();
studente1.sostenereEsame("Storia");

class Professore extends Persona {
  materiaInsegnata;

  constructor(nome, cognome, materiaInsegnata) {
    super(nome, cognome);
    this.materiaInsegnata = materiaInsegnata;
  }
  presentazione() {
    // super.presentazione();
    console.log(`Buongiorno sono il professore ${this.nome} ${this.cognome}`);
    console.log(`Insegno ${this.materiaInsegnata}`);
    this.assegnareVoti();
  }

  assegnareVoti() {
    console.log(`Ho corretto le verifiche di ${this.materiaInsegnata}`);
  }
}

const professore1 = new Professore("Luca", "Gialli", "Storia");
professore1.presentazione();
professore1.assegnareVoti();

class Assistente extends Studente {
  assistito;

  constructor(nome, cognome, corso, matricola, assistito) {
    super(nome, cognome, corso, matricola);
    this.assistito = assistito;
  }
}

const assistente1 = new Assistente(
  "Paolo",
  "Antani",
  "Informatica",
  "mat0001",
  professore1
);
assistente1.presentazione();
assistente1.sostenereEsame("Matematica");
console.log(
  `Sono l'assistente del professore ${assistente1.assistito.nome} ${assistente1.assistito.cognome}`
);
