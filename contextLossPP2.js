/*
1. This will return undefined undefined is a undefinded. this is because the function losses its execution context when passed to the function
it is called with the global object as the context.
*/

// 2.
// let turk = {
//   firstName: 'Christopher',
//   lastName: 'Turk',
//   occupation: 'Surgeon',
//   getDescription() {
//       return this.firstName + ' ' + this.lastName + ' is a '
//                                   + this.occupation + '.';
//   }
// };

// function logReturnVal(func, context) {
//   let returnVal = func.call(context);
//   console.log(returnVal);
// }

// logReturnVal(turk.getDescription, turk);

// 3.

let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
      return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
};

let description = turk.getDescription.bind(turk);

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(description);


// 4. because we pass the function to an inner function we strip it of its context and the context of 'this' becomes the global object.


// 5. fix the code useing 'self = this'
// const TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames: function() {
//     let self = this;
//     this.titles.forEach(function(title) {
//       console.log(self.seriesTitle + ': ' + title);
//     });
//   }
// };

// TESgames.listGames();

// 6. fix the code another way
// const TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames: function() {
//     this.titles.forEach(function(title) {
//       console.log(this.seriesTitle + ': ' + title);
//     }, this);
//   }
// };

// TESgames.listGames();

// 7. fix the code using an arrow function
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach((title) => {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();

// 8. the value of foo.a will be 0 because the inner function lost its context and this is refering to the global object.

// 9. make the code icrement the value foo.a

// let foo = {
//   a: 0,
//   incrementA: function() {
//     let self = this
//     function increment() {
//       self.a += 1;
//     }

//     increment();
//   }
// };

// foo.incrementA();
// foo.incrementA();
// foo.incrementA();

// console.log(foo.a)

function sum(number1, number2) {
  return number1 + number2;
}
console.log(sum(1, 2))