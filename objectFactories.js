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

// function fruit(name, color) {
//   return {
//     name,
//     color,

//     isRipe() {
//       return `This ${this.name} is ripe.`;
//     },

//     describe() {
//       return `This ${this.name} is ${this.color}.`;
//     }
//   };
// }

// let apple = fruit('Apple', 'Red');
// let banana = fruit('Banana', 'Yellow');
// let blackberry = fruit('Blackberry','Black');

// console.log(apple.isRipe());
// console.log(banana.describe());
// console.log(blackberry.isRipe());

// takes a lot of storage and you cant tell where the object came from. it doesnt have an ancetory


// function makeObj() {
//   return {
//     propA: 10,
//     propB: 20,
//   };
// }

function createInvoice(services = {}) {
  let phoneCharge = services.phone;
  if (phoneCharge === undefined) {
    phoneCharge = 3000;
  }

  let internetCharge = services.internet;
  if (internetCharge === undefined) {
    internetCharge = 5500;
  }

  return {
    phone: phoneCharge,
    internet: internetCharge,
    balance: phoneCharge + internetCharge,

    total: function() {
      return this.phone + this.internet;
    },

    addPayment: function(payment) {
      this.balance = this.balance - payment.amount;
    },

    addPayments: function(payment) {
      this.balance = (payment[0].total() + payment[1].total()) - this.balance;
    },

    amountDue: function() {
      console.log(this.balance)
    }
  };
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoiceTotal(invoices)); // 31000

function createPayment(services = {}) {

  let payment = {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,
  };

  payment.total = function() {
    return this.amount || (this.phone + this.internet);
  }


  return payment;

}

function paymentTotal(payments) {
  return payments.reduce((sum, payment)  => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));      // => 24000


let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
invoice.amountDue();       // this should return 0