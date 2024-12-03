// function Animal(name) {
//   this.name = name;
// }

// Animal.prototype.eat = function() {
//   console.log(`${this.name} is eating`);
// }

// function Mammal(name, hasFur) {
//   Animal.call(this, name)
//   this.hasFur = hasFur;
// }


// Mammal.prototype = Object.create(Animal.prototype)
// Mammal.prototype.constructor = Mammal;


// Mammal.prototype.sleep = function() {
//   console.log(`${this.name} is sleeping.`);
// }

// function Dog(name, hasFur, breed) {
//   Mammal.call(this, name, hasFur)
//   this.breed = breed;
// }

// Dog.prototype = Object.create(Mammal.prototype);
// Dog.prototype.constructor = Dog;


// Dog.prototype.bark = function() {
//   console.log(`${this.name} the ${this.breed} is barking`);
// }


// let myDog = new Dog('Rex', true, 'German Shepherd');
// myDog.eat();    // Rex is eating.
// myDog.sleep();  // Rex is sleeping.
// myDog.bark();   // Rex the German Shepherd is barking.


// function Smartphone(brand, model, year) {
//   this.brand = brand;
//   this.model = model;
//   this.year = year;
// }

// Smartphone.prototype.checkBatteryLevel = function() {
//   return `${this.brand} ${this.model} has 75%` +
//   `${this.model}`;
// };

// Smartphone.prototype.displayInfo = function() {
//   return `${this.year} ${this.brand} ` +
//   `${this.model}`
// }

// let iphone12 = new Smartphone('Apple', 'iPhone 12', 2020);

// let galaxyS21 = new Smartphone('samsung', 'Galaxy S21', 2021);

// console.log(iphone12.checkBatteryLevel());
// // Apple iPhone 12 has 75% battery remaining.

// console.log(iphone12.displayInfo());
// // 2020 Apple iPhone 12

// console.log(galaxyS21.checkBatteryLevel());
// // Samsung Galaxy S21 has 75% battery remaining.

function Vehicles(color, weight) {
  this.color = color;
  this.weight = weight;
};

Vehicles.prototype.accelerate = function() {
  return `we are accelerating`;
};

Vehicles.prototype.decelerate = function() {
  return `we are decelerating`
};

Vehicles.prototype.info = function() {
  return `${this.color}, ${this.weight}`
};

function Cars(color, weight, licensePlate) {
    Vehicles.call(this, color, weight)
    this.licensePlate = licensePlate;
};
  
Cars.prototype = Object.create(Vehicles.prototype);
Cars.prototype.constructor = Cars;

Cars.prototype.honk = function() {
  return `we are honking`;
};

function Boats(color, weight, homePort) {
  Vehicles.call(this, color, weight)
  this.homePort = homePort;
};

Boats.prototype = Object.create(Vehicles.prototype);
Boats.prototype.constructor = Boats;

Boats.prototype.dropAnchor = function() {
  return `we are dropping it.`;
};

function Planes(color, weight, airline) {
  Vehicles.call(this, color, weight);
  this.airline = airline;
};

Planes.prototype = Object.create(Vehicles.prototype);
Planes.prototype.constructor = Planes;

Planes.prototype.takeOff = function() {
  return `we are taking off...`;
};


let civic = new Cars('red', '2 tons', 'avd430');
let draka = new Boats('brown', '100 tons', 'Portlandia') 
let sdfg = new Planes('white', '123 tons', 'American')

console.log(draka.accelerate())
console.log(civic.info())
console.log(sdfg.accelerate())

console.log(civic instanceof Cars)
console.log(draka instanceof Cars)

console.log(civic instanceof Vehicles)
console.log(draka instanceof Vehicles)