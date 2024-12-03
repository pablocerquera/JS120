// /*
// Write a class that can be used to instantiate objects that represent smartphones. 
// Each smartphone should have a brand, model, and release year. Add methods to check 
// the battery level and to display the smartphone's information. Create objects that represent the following 2 smartphones:
// */

// class phone {
//   constructor(brand, model, year) {
//     this.brand = brand;
//     this.model = model;
//     this.year = year;
//   }

//   info() {
//     console.log(this.brand, this.model, this.year);
//   }

//   battery() {
//     console.log(`${this.brand} ${this.model} has 101% battery remaining`);
//   }


// }

// let iphone12 = new phone('Apple', 'iPhone 12', 2020);
// let galaxyS21 = new phone('Samsung', 'Galaxy S21', 2021);

// iphone12.info();
// galaxyS21.info();

// iphone12.battery();
// galaxyS21.battery();

/* Create a class hierarchy consisting of vehicles, including cars, boats, and planes, as specific kinds of vehicles. 
All vehicles should be able to accelerate and decelerate. Cars should be able to honk, boats should be able to drop anchor, 
and planes should be able to take off and land. Test your code.
All vehicles should have a color and weight. Cars have a license number, boats have a home port, and planes have an airline name.
*/

class Vehicles {
  constructor(color, weight, id) {
    this.color = color;
    this.weight = weight;
    this.id = id;
  }

  accelerate() {
    return `we are accelerating`;
  }

  decelerate() {
    return `we are decelerating`
  }

  info() {
    return `${this.color}, ${this.weight}, ${this.id}`
  }
}

class Cars extends Vehicles {
  constructor(color, weight, licensePlate) {
    super(color, weight, licensePlate);
    this.color = color;
    this.weight = weight;
    this.licensePlate = licensePlate;
  }

  honk() {
    return `we are honking`;
  }
}

class Boats extends Vehicles {
  constructor(color, weight, homePort) {
    super(color, weight, homePort);
    this.color = color;
    this.weight = weight;
    this.homePort = homePort;
  }

  dropAnchor() {
    return `we are dropping it.`
  }
}

class Planes extends Vehicles {
  constructor(color, weight, airline) {
    super(color, weight, airline);
    this.color = color;
    this.weight = weight;
    this.airline = airline;
  }

  takeOff() {
    return `we are taking off...`
  }
}

let civic = new Cars('red', '2 tons', 'avd430');
let draka = new Boats('brown', '100 tons', 'Portlandia') 
let sdfg = new Planes('white', '123 tons', 'American')

// console.log(draka.info())
// console.log(civic.info())
console.log(sdfg.accelerate())

console.log(civic instanceof Cars)
console.log(draka instanceof Cars)

console.log(civic instanceof Vehicles)
console.log(draka instanceof Vehicles)


