// function creatCat(name, color, age) {
//   return {
//     name,
//     color,
//     age,

//     speak() {
//       console.log(
//         `Meow. I am ${this.name}. ` +
//         `I am a ${this.age}-year-old ${this.color} cat.`
//       );
//     }
//   }
// }


// let cocoa = creatCat('Cocoa', 'black', 5)

// let leo = creatCat('Leo', 'orange', 3)

// cocoa.speak();
// leo.speak();

// excersizes

function fruit(name, color) {
  return {
    name,
    color,

    isRipe() {
      return `This ${this.name} is ripe.`;
    },

    describe() {
      return `This ${this.name} is ${this.color}.`;
    }
  };
}

let apple = fruit('Apple', 'Red');
let banana = fruit('Banana', 'Yellow');
let blackberry = fruit('Blackberry','Black');

console.log(apple.isRipe());
console.log(banana.describe());
console.log(blackberry.isRipe());