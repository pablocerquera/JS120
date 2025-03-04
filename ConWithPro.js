function Dog(name,breed, weight) {
  // Object.setPrototypeOf(this, Dog.prototype);
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}

Dog.prototype.bark= function() {
  console.log(this.weight > 20 ? 'Woof!' : 'Yip!')
}

let maxi = new Dog('Maxi', 'German Shepherd', 32);
let dexter = new Dog('Dexter', 'Rottweiler', 50);
let biggie = new Dog('Biggie', 'Whippet', 9);


dexter.bark = function() {
  console.log('WOOF!!')
}



console.log(Dog.prototype)
maxi.bark();
dexter.bark();
biggie.bark();
