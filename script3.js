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
  type;
  model;
  capacity;
  reservations = 0;
  speedKmH;
  consumptionLKm;
  fuelType;
  fuelPriceL;
  services = [];
  incrementPercentual;

  constructor(
    type,
    model,
    capacity,
    speedKmH,
    consumptionLKm,
    fuelType,
    fuelPriceL,
    services,
    incrementPercentual
  ) {
    this.type = type;
    this.model = model;
    this.capacity = capacity;
    this.speedKmH = speedKmH;
    this.consumptionLKm = consumptionLKm;
    this.fuelType = fuelType;
    this.fuelPriceL = fuelPriceL;
    this.services = services;
    this.incrementPercentual = incrementPercentual;
  }

  calcPassengerPrice(distance) {
    let basePrice = this.calcCompanyPrice(distance) / this.capacity;
    console.log(distance, this.incrementPercentual);
    return basePrice * (this.incrementPercentual / 100) + basePrice;
  }

  calcCompanyPrice(distance) {
    let neededFuel = this.consumptionLKm * distance;
    return neededFuel * this.fuelPriceL;
  }

  calcEstimatedTimeHour(distance) {
    return distance / this.speedKmH;
  }

  printInfo() {
    console.log(`Mezzo: ${this.type}`);
    console.log(`Modello: ${this.model}`);
    console.log(`Numero massimo passeggeri: ${this.capacity}`);
    console.log(`Posti attualmente prenotati: ${this.reservations}`);
    console.log(`Tipo di carburante: ${this.fuelType}`);
    console.log(`Servizi disponibili: ${this.services.join(", ")}`);
  }

  addReservation(quantity) {
    let availablity = this.capacity - this.reservations;
    if (availablity === 0) {
      console.log(
        `Impossibile effettuare la prenotazione. Non ci sono posti disponibili.`
      );
    } else {
      if (quantity <= availablity) {
        this.reservations += quantity;
        console.log(`Prenotazioni effettuata`);
      } else {
        console.log(
          `Impossibile effettuare la prenotazione. I posti ancora disponibili sono: ${availablity}`
        );
      }
    }
  }

  removeReservation(quantity) {
    if (this.reservations === 0) {
      console.log(`Non ci sono prenotazioni da rimuovere`);
    } else {
      if (this.reservations > quantity) {
        this.reservations -= quantity;
        console.log(`Prenotazione rimossa`);
      } else {
        console.log(
          `Impossibile rimuovere la prenotazione. I posti prenotati sono: ${this.reservations}`
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
    fuelType,
    fuelPriceL,
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
      fuelType,
      fuelPriceL,
      services,
      incrementPercentual
    );
    this.defaultConsumptionL = defaultConsumptionL;
  }

  calcCompanyPrice(distance) {
    let flightPrice = super.calcCompanyPrice(distance);
    let additionalPrice = this.defaultConsumptionL * this.fuelPriceL;

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
    fuelType,
    fuelPriceL,
    services,
    incrementPercentual = 50
  ) {
    super(
      type,
      model,
      capacity,
      speedKmH,
      consumptionLKm,
      fuelType,
      fuelPriceL,
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
    priceKm,
    consumptionLKm,
    fuelType,
    fuelPriceL,
    services,
    incrementPercentual = 20
  ) {
    super(
      type,
      model,
      capacity,
      speedKmH,
      priceKm,
      consumptionLKm,
      fuelType,
      fuelPriceL,
      services,
      incrementPercentual
    );
  }
}

const obj1 = new Airplane(
  "Aereo",
  "Boing 747",
  600,
  988,
  12,
  "cherosene",
  1.5,
  ["checkin online", "wi-fi", "pasti", "tablet"],
  5000
);

const obj2 = new Train("Treno", "Frecciarossa", 450, 360, 90, "diesel", 2.075, [
  "ristorante",
  "cuccette",
  "aria condizionata",
  "wi-fi",
]);

const obj3 = new Bus("Bus", "Iveco", 50, 70, 1, "diesel", 2.075, [
  "aria condizionata",
  "wi-fi",
  "sedili reclinabili",
]);

const arrayMezzi = [obj1, obj2, obj3];
// arrayMezzi.forEach((mezzo) => mezzo.printInfo());

// calcolo prezzo viaggio per 100km
arrayMezzi.forEach((mezzo) => {
  console.log(
    `Un viaggio di 100km in ${mezzo.type} costa ${mezzo.calcPassengerPrice(
      100
    )}`
  );
});