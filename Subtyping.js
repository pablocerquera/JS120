// function Rectangle(length, width) {
//   this.length = length;
//   this.width = width;
// }

// Rectangle.prototype.getArea = function() {
//   return this.length * this.width;
// };

// Rectangle.prototype.toString = function() {
//   return `[Rectangle ${this.length} x ${this.width}]`;
// };

// let rect = new Rectangle(10, 5);
// console.log(rect.getArea());     // => 50
// console.log(rect.toString());    // => "[Rectangle 10 x 5]"

// function Square(size) {
//   this.length = size;
//   this.width = size;
// }

// Square.prototype = Object.create(Rectangle.prototype);
// Square.prototype.constructor = Square;

// Square.prototype.toString = function() {
//   return `[Square ${this.length} x ${this.width}]`;
// };

// let sqr = new Square(5);
// console.log(sqr.getArea());     // => 25
// console.log(sqr.toString());    // => "[Square 5 x 5]"
// console.log(sqr.constructor === Square);

class Greeting {
  greet(words) {
    console.log(words);
  }

}

class Hello extends Greeting {
  hi() {
    this.greet('Hello');
  }
}

class Goodbye extends Greeting {
  bye() {
    this.greet('Goodbye');
  }
}

