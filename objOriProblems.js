// //Prob 1
// let qux = { foo: 1 };
// let baz = Object.create(qux);
// console.log(baz.foo + qux.foo);
// /*
// This will log to the console the number 2 because both baz.foo and qux.foo have the value of 1 and we will add those two values together.
// */
// let qux = { foo: 1 };
// let baz = Object.create(qux);
// baz.foo = 2;

// console.log(baz.foo + qux.foo);
// /*
// this will log 3 cause JS will see the foo exists in the baz object and has the value of 2 
// and it will find the foo object in the qux object with the value of 1.
// */
// let qux = { foo: 1 };
// let baz = Object.create(qux);
// qux.foo = 2;

// console.log(baz.foo + qux.foo);
/*
this will log 2 for the same reason that question one produced 2. we will look for foo and we will find it in the prototype object 
which has the value of 2 and 2 + 2 is 4
*/
let foo = {1: 'thing1',
  2: 'thing1',
  3: 'thing1',
  4: 'thing1'
}
for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}
// Object.keys(foo).forEach(property => {
//   console.log(`${property}: ${foo[property]}`);
// });