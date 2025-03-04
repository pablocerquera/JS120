// 1. this logs 6 and 12 because the methods are called on the new rect1 object. They actually produce NaN.

// let RECTANGLE = {
//   area: function() {
//     return this.width * this.height;
//   },
//   perimeter: function() {
//     return 2 * (this.width + this.height);
//   },
// };

// function Rectangle(width, height) {
//   this.width = width;
//   this.height = height;
//   this.area = RECTANGLE.area.call(this);
//   this.perimeter = RECTANGLE.perimeter.call(this);
// }

// let rect1 = new Rectangle(2, 3);

// console.log(rect1.area);
// console.log(rect1.perimeter);

// function Circle(radius) {
//   this.radius = radius;
//   this.pi = 3.141592654;
// }

// Circle.prototype.area = function() {
//   return this.pi * (this.radius ** 2);
// }

// let a = new Circle(3);
// let b = new Circle(4);

// console.log(a.area().toFixed(2)); // => 28.27
// console.log(b.area().toFixed(2)); // => 50.27
// console.log(a.hasOwnProperty('area')); // => false


//------------------------------------------------------------------


function Ninja() {
  this.swung = false;
}

let ninja = new Ninja();

Ninja.prototype.swingSword = function() {
    this.swung = true;
    return this;
  }



console.log(ninja.swingSword());

console.log("Hello".constructor.name);
console.log([1,2,3].constructor.name);
console.log({name: 'Srdjan'}.constructor.name);


//--------------------------------------------------------------------------


let ninjaA;

{
  const Ninja = function() {
    this.swung = false;
  };

  ninjaA = new Ninja();
}

// create a `ninjaB` object here; don't change anything else

let ninjaB = new ninjaA.constructor();

console.log(ninjaA.constructor === ninjaB.constructor) // => true


//---------------------------------------------------------------------


function User(first, last) {
  if (!(this instanceof User)) {
    return new User(first, last);
  }

  this.name = first + ' ' + last;
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe

let arr = new Array(1000, 1);
console.log(arr)