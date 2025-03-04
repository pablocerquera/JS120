// class Person {
//   constructor(name = 'John Doe') {
//     this.name = name;
//   }

//   greet() {
//     console.log(`Hello! My name is ${this.name}!`)
//   }

// }

class Cat {
  constructor(name) {
    this.name = name;


  }
  static genericGreeting() {
    console.log("Hello! I'm a cat!");
  }

  personalGreeting() {
    console.log(`Hello! My name is ${this.name}!`)
  }

  rename(newName) {
    this.name = newName;
  }
}


let kitty = new Cat('Sophie');



// console.log(kitty.name); // Sophie
// kitty.rename('Chloe');
// console.log(kitty.name); // Chloe


// Cat.genericGreeting();
// kitty.personalGreeting();


// let person1 = new Person();
// let person2 = new Person("Pepe");

// console.log(person1.name); // John Doe
// console.log(person2.name); // Pepe


class Vehicle {
  constructor(year) {
    this.year = year;
  }
  startEngine() {
    return 'Ready to go!';
  }
}

class Truck extends Vehicle {
  constructor(year, bedType) {
    super(year);
    this.bedType = bedType;
  }
  startEngine(speed) {
    return super.startEngine() + ' Drive ' + speed + ', please!'
  }
}

class Car extends Vehicle {}



let car = new Car(2015);
console.log(car.year); // 2015


let truck1 = new Truck();
console.log(truck1.startEngine('fast'));

let truck2 = new Truck();
console.log(truck2.startEngine('slow'));