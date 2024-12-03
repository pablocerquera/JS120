// function createCar(make, model, year) {
//   return {
//     make,
//     model,
//     year,
//     started: false,

//     start() {
//       this.started = true;
//     },

//     stop() {
//       this.started = false;
//     },
//   };
// }

// let car1 = createCar('Toyota', 'Corolla', 2016);
// let car2 = createCar('Honda', 'Civic', 2018);

// let a = {
//   foo: 2,
//   bar: 1,
// };

// let b = Object.create(a);
// console.log(b.hasOwnProperty('foo'))
function say(words) {
  console.log(words);
}

let speak = say;

speak('Howdy!');   // logs 'Howdy'

function createGreeter(language) {
  switch (language) {
    case 'en':
      return () => console.log('Hello!');
    case 'es':
      return () => console.log('Hola!');
    case 'fr':
      return () => console.log('Bonjour!');
  }
}

let greetEnglish = createGreeter('en');
let greetSpanish = createGreeter('es');
let greetFrench = createGreeter('fr');

greetEnglish(); // logs 'Hello!'
greetSpanish(); // logs 'Hola!'
greetFrench(); // logs 'Bonjour!'
