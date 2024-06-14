"use strict";
/*** Esercizio Biblioteca
 
    Classe Libro:
        titolo
        autore
        disponibile (bool)

    Romanzo:
        genere

    Saggio:
        argomento

    Manuali:
        categoria
        edizione

    - Metodo che visulizza i dettagli
    - Metodo prestito
    - Metodo restituzione
 
***/

class Libro {
  #titolo;
  #autore;
  #disponibile;

  constructor(titolo, autore, disponibile) {
    this.#titolo = titolo;
    this.#autore = autore;
    this.#disponibile = disponibile;
  }

  get titolo() {
    return this.#titolo;
  }

  get autore() {
    return this.#autore;
  }

  get disponibile() {
    return this.#disponibile;
  }

  //   set disponibile(booleano) {
  //     this.#disponibile = booleano;
  //   }

  visualizzaDettagli() {
    return `Titolo: ${this.titolo} - Autore: ${this.autore} - Disponibile: ${
      this.disponibile ? "Sì" : "No"
    }`;
  }

  prestaLibro() {
    if (this.disponibile) {
      this.#disponibile = false; // devo mettere # perchè non ho definito il set per poter modificarne il valore
      return;
    }
    console.warn(`Libro ${this.titolo} già prestato.`);
  }

  restituisciLibro() {
    if (this.disponibile) {
      console.warn(`Libro ${this.titolo} già restituito.`);
      return;
    }
    this.#disponibile = true; // devo mettere # perchè non ho definito il set per poter modificarne il valore
  }
}
class Romanzo extends Libro {
  #genere;
  constructor(titolo, autore, disponibile, genere) {
    super(titolo, autore, disponibile);
    this.#genere = genere;
  }

  get genere() {
    return this.#genere;
  }

  visualizzaDettagli() {
    return super.visualizzaDettagli() + ` - Genere: ${this.genere}`;
  }
}

class Saggio extends Libro {
  #argomento;
  constructor(titolo, autore, disponibile, argomento) {
    super(titolo, autore, disponibile);
    this.#argomento = argomento;
  }

  get argomento() {
    return this.#argomento;
  }

  visualizzaDettagli() {
    return super.visualizzaDettagli() + ` - Argomento: ${this.argomento}`;
  }
}

class Manuali extends Libro {
  #categoria;
  #edizione;
  constructor(titolo, autore, disponibile, categoria, edizione) {
    super(titolo, autore, disponibile);
    this.#categoria = categoria;
    this.#edizione = edizione;
  }

  get categoria() {
    return this.#categoria;
  }

  get edizione() {
    return this.#edizione;
  }

  visualizzaDettagli() {
    return (
      super.visualizzaDettagli() +
      ` - Categoria: ${this.categoria} - Edizione: ${this.edizione}`
    );
  }
}

const obj1 = new Romanzo("Romanzo 1", "Autore 1 (Romanzo)", true, "Genere 1");
const obj2 = new Saggio("Saggio 1", "Autore 1 (Saggio)", true, "Argomento 1");
const obj3 = new Manuali(
  "Manuale 1",
  "Autore 1 (Manuale)",
  true,
  "Categora 1",
  "Edizione 1"
);

const arrayLibri = [obj1, obj2, obj3];

obj1.prestaLibro();
arrayLibri.forEach((libro) => console.log(libro.visualizzaDettagli()));
console.log(obj1.titolo);

obj1.prestaLibro();
arrayLibri.forEach((libro) => console.log(libro.visualizzaDettagli()));

obj1.restituisciLibro();
arrayLibri.forEach((libro) => console.log(libro.visualizzaDettagli()));

obj1.restituisciLibro();
arrayLibri.forEach((libro) => console.log(libro.visualizzaDettagli()));

// obj1.titolo = 'Pippo'
// console.log(obj1.titolo);

// obj1.disponibile = true;
// console.log(obj1.disponibile);
