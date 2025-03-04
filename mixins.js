// const Swimmable = {
//   swin() {}
// }

// class Bird {};

// class FlyingBird extends Bird {
//   fly() {}
// }

// class Stork extends FlyingBird {}

// class Parrot extends FlyingBird {}

// class Penguin extends Bird {}
// Object.assign(Penguin.prototype, Swimmable);

// class Ostrich extends Bird {}
// Object.assign(Ostrich.prototype, Swimmable);

// class Duck extends FlyingBird {}
// Object.assign(Duck.prototype, Swimmable);

// class Goose extends FlyingBird {}
// Object.assign(Goose.prototype, Swimmable);






// const Speed = {
//   goFast() {
//     console.log(`I'm a ${this.constructor.name} and going super fast!`);
//   }
// };

// class Car {
//   goSlow() {
//     console.log(`I'm safe and driving slow.`);
//   }
// }
// Object.assign(Car.prototype, Speed);

// class Truck {
//   goVerySlow() {
//     console.log(`I'm a heavy truck and like going very slow.`);
//   }
// }
// Object.assign(Truck.prototype, Speed);

// let smallTruck = new Truck;
// let smallCar = new Car;

// smallCar.goFast();
// smallTruck.goFast();


const Fuel = {
  range() {
    return this.fuelCap *  this.fuelEfficiency;
  }
}



class WheeledVehicle {
  constructor(tirePressure, kmTravelledPerLiter, fuelCapInLiter) {
    this.tires = tirePressure;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }

  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  }

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }
}
Object.assign(WheeledVehicle.prototype, Fuel);





class Auto extends WheeledVehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super([30,30,32,32], 50, 25.0);
  }
}



class Motorcycle extends WheeledVehicle {
  constructor() {
    // array represents tire pressure for two tires
    super([20,20], 80, 8.0);
  }
}


class Catamaran {
  constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
    // catamaran specific logic

    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter
  }
}
Object.assign(Catamaran.prototype, Fuel);


let car = new Auto;
let bike = new Motorcycle;
let boat = new Catamaran;

console.log(car.range())
console.log(bike.range())
console.log(boat.range())