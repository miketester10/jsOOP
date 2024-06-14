"use strict";
/***
 
 Sistema di prenotazione viaggi
 -mezzi di trasporto: aereo, treno, autobus
 -calcolare costo del viaggio, la durata stimata, gestire la prenotazione
 -descrizione mezzo
 -percentuale agenzia viaggi

classe Vehicle
    ** attributi/proprietà **
    -tipo
    -modello
    -capienza
    -velocita/h
    -consumo litri/km
    -fuel
    -costo fuel/litro
    -servizi[]

    ** metodi **
    calcola costo viaggio (per il passeggero)
    calcola costo viaggio (per il passeggero)
    calcola durata stimata viaggio (in base alla distanza)
    aggiungi prenotazione
    rimuovi prenotazione
    vedi dettaglio

classe Airplane
classe Train
classe Autobus

 ***/

class Vehicle {
  #type;
  #model;
  #capacity;
  #reservations = 0;
  #speedKmH;
  #consumptionLKm;
  #fuel;
  #services = [];
  #incrementPercentual;

  constructor(
    type,
    model,
    capacity,
    speedKmH,
    consumptionLKm,
    fuel,
    services,
    incrementPercentual
  ) {
    this.type = type;
    this.model = model;
    this.capacity = capacity;
    this.speedKmH = speedKmH;
    this.consumptionLKm = consumptionLKm;
    this.fuel = fuel;
    this.services = services;
    this.incrementPercentual = incrementPercentual;
  }

  calcPassengerPrice(distance) {
    let basePrice = this.calcCompanyPrice(distance) / this.capacity;
    // console.log(distance, this.incrementPercentual);
    return basePrice * (this.incrementPercentual / 100) + basePrice;
  }

  calcCompanyPrice(distance) {
    let neededFuel = this.consumptionLKm * distance;
    return neededFuel * this.fuel.priceL;
  }

  calcEstimatedTimeHour(distance) {
    let timeInMinutes = (distance / this.speedKmH) * 60;
    let minutes = timeInMinutes % 60;
    let hours = (timeInMinutes - minutes) / 60;
    return `${hours} ore e ${minutes.toFixed()} minuti`;
  }

  printInfo() {
    console.log(`Mezzo: ${this.type}`);
    console.log(`Modello: ${this.model}`);
    console.log(`Numero massimo passeggeri: ${this.capacity}`);
    console.log(`Posti attualmente prenotati: ${this.#reservations}`);
    console.log(`Tipo di carburante: ${this.fuel.name}`);
    console.log(`Servizi disponibili: ${this.services.join(", ")}`);
  }

  getReservations() {
    return this.#reservations;
  }

  setReservations(reservations) {
    return (this.#reservations = reservations);
  }

  // In JS usare le keyword get e set e non i metodi come sopra getReservations e setReservations
  get reservations() {
    return this.#reservations;
  }

  set reservations(reservations) {
    return (this.#reservations = reservations);
  }

  addReservation(quantity) {
    let availablity = this.capacity - this.#reservations;
    if (availablity === 0) {
      console.log(
        `Impossibile effettuare la prenotazione. Non ci sono posti disponibili.`
      );
    } else {
      if (quantity <= availablity) {
        this.#reservations += quantity;
        console.log(`Prenotazione effettuata`);
      } else {
        console.log(
          `Impossibile effettuare la prenotazione. I posti ancora disponibili sono: ${availablity}`
        );
      }
    }
  }

  removeReservation(quantity) {
    if (this.#reservations === 0) {
      console.log(`Non ci sono prenotazioni da rimuovere`);
    } else {
      if (this.#reservations >= quantity) {
        this.reservations -= quantity;
        console.log(`Prenotazione rimossa`);
      } else {
        console.log(
          `Impossibile rimuovere la prenotazione. I posti prenotati sono: ${
            this.#reservations
          }`
        );
      }
    }
  }
}

class Airplane extends Vehicle {
  defaultConsumptionL; // litri consumati in fase di decollo e di atterraggio
  constructor(
    type,
    model,
    capacity,
    speedKmH,
    consumptionLKm,
    fuel,
    services,
    defaultConsumptionL,
    incrementPercentual = 80
  ) {
    super(
      type,
      model,
      capacity,
      speedKmH,
      consumptionLKm,
      fuel,
      services,
      incrementPercentual
    );
    this.defaultConsumptionL = defaultConsumptionL;
  }

  calcCompanyPrice(distance) {
    let flightPrice = super.calcCompanyPrice(distance);
    let additionalPrice = this.defaultConsumptionL * this.fuel.priceL;

    return flightPrice + additionalPrice;
  }
}

class Train extends Vehicle {
  constructor(
    type,
    model,
    capacity,
    speedKmH,
    consumptionLKm,
    fuel,
    services,
    incrementPercentual = 50
  ) {
    super(
      type,
      model,
      capacity,
      speedKmH,
      consumptionLKm,
      fuel,
      services,
      incrementPercentual
    );
  }
}

class Bus extends Vehicle {
  constructor(
    type,
    model,
    capacity,
    speedKmH,
    consumptionLKm,
    fuel,
    services,
    incrementPercentual = 20
  ) {
    super(
      type,
      model,
      capacity,
      speedKmH,
      consumptionLKm,
      fuel,
      services,
      incrementPercentual
    );
  }
}

class Fuel {
  name;
  priceL;

  constructor(name, priceL) {
    this.name = name;
    this.priceL = priceL;
  }
}

const fuel1 = new Fuel("cherosene", 1.5);
const fuel2 = new Fuel("diesel", 2.075);

const obj1 = new Airplane(
  "Aereo",
  "Boing 747",
  600,
  988,
  12,
  fuel1,
  ["checkin online", "wi-fi", "pasti", "tablet"],
  5000
);

const obj2 = new Train("Treno", "Frecciarossa", 450, 360, 90, fuel2, [
  "ristorante",
  "cuccette",
  "aria condizionata",
  "wi-fi",
]);

const obj3 = new Bus("Bus", "Iveco", 50, 70, 1, fuel2, [
  "aria condizionata",
  "wi-fi",
  "sedili reclinabili",
]);

const arrayMezzi = [obj1, obj2, obj3];
arrayMezzi.forEach((mezzo) => mezzo.printInfo());

// calcolo prezzo viaggio per 100km
arrayMezzi.forEach((mezzo) => {
  console.log(
    `Un viaggio di 100km in ${mezzo.type} costa ${mezzo.calcPassengerPrice(
      100
    )}$ e dura ${mezzo.calcEstimatedTimeHour(100)}`
  );
});

obj1.addReservation(590);
console.log(obj1.getReservations());
obj1.addReservation(20);
console.log(obj1.getReservations());
obj1.addReservation(10);
console.log(obj1.getReservations());
obj1.addReservation(10);
console.log(obj1.getReservations());

obj1.removeReservation(10);
console.log(obj1.reservations);
obj1.removeReservation(590);
console.log(obj1.reservations);
obj1.removeReservation(10);
console.log(obj1.reservations);
