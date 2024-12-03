// 1.
// function func() {
//     return this; 
// }

// let context = func();
// console.log(context);


// 2.

// let obj = {
//     func() {
//         return this;
//     }
// }

// let context2 = obj.func();
// console.log(context2);

// // 3.

// message = 'Hello from the global scope!';

// function deliverMessage() {
//     console.log(this.message);
// }

// deliverMessage();

// let foo = {
//     message: 'Hello from the function scope!',
// };

// foo.deliverMessage = deliverMessage;
// foo.deliverMessage();



/*

1. this object returns the global object (window in browser) because the implicit context of func is the global object.

2. this returns obj because the implicit context of func is obj. it looks like this { func: [Function: func] } as a method incovation it receives an implicit context of obj.

3. the first log generates Hello from the global scope! because the implicit context of deliverMessage is the global object. the
second logs hello from the function scope! because the way it was called. it was called as a method on foo. 



*/

let foo = {
    a: 1,
    b: 2,
};

let bar = { 
    a: 'abc',
    b: 'def',

    add: function() {
        return this.a + this.b;
    },
};

console.log(bar.add.call(foo));


/*

1. foo.call(bar.add)


*/