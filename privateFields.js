// let database = {
//   getStudentId(name) {
//     // This method should probably access a database
//     return 4201567;
//   }
// };

// class Student {
//   #firstName;
//   #lastName;
//   #track;

//   constructor (firstName, lastName, track) {
//     this.#firstName = firstName;
//     this.#lastName = lastName;
//     this.track = track;  // we're calling the setter here

//   }

//   get name() {
//     return [this.firstName, this.lastName];
//   }

//   get firstName() {
//     return this.#firstName;
//   }

//   get lastName() {
//     return this.#lastName;
//   }

//   get track() {
//     return this.#track;
//   }

//   set track(newTrack) {
//     switch (newTrack) {
//       case 'JavaScript':
//       case 'Python':
//       case 'Ruby':
//         this.#track = newTrack;
//         break;
//       default:
//         throw new Error(`Invalid track: '${newTrack}'`);
//     }
//   }

//   // #revealStudentId() {
//   //   let studentId = database.getStudentId(this.#name);
//   //   console.log(studentId.idNumber);
//   // }
// }

// let student = new Student('Kay', 'Oakley', 'JavaScript');

// console.log(`${student.name.join(' ')}`)

// let student2 = new Student('Kay', 'Oakley', 'JavaScript');
// console.log(`${student2.name.join(' ')} ${student2.track}`);
// // Kay Oakley JavaScript

// let student3 = new Student('Bill', 'Wisner', 'Python');
// console.log(`${student3.name.join(' ')} ${student3.track}`);
// // Bill Wisner Python

// student3.track = 'Ruby';
// console.log(`${student3.name.join(' ')} ${student3.track}`);
// // Bill Wisner Ruby

// student3.track = 'Baaaa!';
// console.log(`${student3.name.join(' ')} ${student3.track}`);
// // Invalid track: 'Baaaa!'

// let student4 = new Student('Kim', 'Serkes', 'Gnome');
// console.log(`${student4.name.join(' ')} ${student4.track}`);
// // Invalid track: 'Gnome'


// class Person {
//   #name;
//   #age;
  
//   constructor(name, age) {
//     this.#name = name;
//     this.#age = age;
//   }

//   get name() {
//     return this.#name;
//   }

//   get age() {
//     return this.#age;
//   }

//   set age(num) {
//     if (typeof(num) === 'number' && num > 0) {
//       throw new Error(`Invalid age: '${num}' age must be positive`);
//     } else {
//       this.#age = num;
//     }

//   }
// }

// let person = new Person('John', 30);
// console.log(person.age); // 30
// person.age = -1;
// console.log(person.age); // 31

// class BankAccount {

//   #balance = 0;

//   #checkBalance() {
//     console.log(`Current balance $${this.#balance}`)
//   }

//   withdraw(amount){
//     if (amount > this.#balance) {
//       throw new RangeError('Insufficient funds')
//     } else {
//       this.#balance -= amount;
//       this.#checkBalance();
//     }
    
//   }

//   deposit(amount){
//     this.#balance += amount;
//     this.#checkBalance();
//   }
// }

// let account = new BankAccount();
// account.deposit(100);
// account.withdraw(50);
// // account.withdraw(100); // RangeError: Insufficient funds


// class Book {
//   #title;
//   #author;
//   #year;

//   constructor(title, author, year) {
//     this.#title = title;
//     this.#author = author;
//     this.year = year;
//   }

//   get title() {
//     return `This book is titled "${this.#title}".`;
//   }

//   get author() {
//     return `The author of this book is "${this.#author}".`
//   }

//   get year() {
//     return `The year this book was published is ${this.#year}.`
//   }

//   set year(newYear) {
//     if (newYear < 1900) {
//       throw RangeError('Too Old')
//     } else {
//       this.#year = newYear;
//     }
//   }
// }

// let book = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 1925);
// console.log(book.title);  // The Great Gatsby
// console.log(book.author); // F. Scott Fitzgerald
// console.log(book.year);   // 1925

// book.year = 1932;         // Changing year
// console.log(book.year);   // 1932

// try {
//   book.year = 1825;
// } catch (e) {
//   console.log(e);   // RangeError: Invalid year
// }

// try {
//   let book2 = new Book('A Tale of Two Cities', 'Charles Dickents', 1859);
// } catch (e) {
//   console.log(e);   // RangeError: Invalid year
// }


// class Rectangle {
//   #width;
//   #height;

//   constructor(width, height) {
//     this.width = width;
//     this.height = height;
//   }

//   get width() {
//     return this.#width
//   }

//   get height() {
//     return this.#height;
//   }

//   get area() {
//     return this.#height * this.#width;
//   }

//   set width(num) {
//     if (typeof(num) === 'number' && num > 0) {
//       this.#width = num;
//     } else {
//       throw RangeError('Needs to be a positive integer')
//     }
//   }

//   set height(num) {
//     if (typeof(num) === 'number' && num > 0) {
//       this.#height = num;
//     } else {
//       throw RangeError('Needs to be a positive integer')
//     }
//   }
// }

// let rect = new Rectangle(10, 5);
// console.log(rect.area); // 50

// rect.width = 20;
// console.log(rect.area); // 100

// rect.height = 12;
// console.log(rect.area); // 240

// try {
//   rect.width = 0;
// } catch (e) {
//   console.log(e); // RangeError: width must be positive
// }

// try {
//   rect.height = 69;
// } catch (e) {
//   console.log(e); // RangeError: height must be positive
// }
// console.log(rect.height); // 69


class MathUtils {
  static add(a, b) {
    return a + b;
  }

  static subtract(a, b) {
    return a - b;
  }
  static multiply(a, b) {
    return a * b;
  }
  static divide(a, b) {
    if (a === 0 || b === 0) {
      throw new RangeError('Division by zero');
    } else {
      return a / b;
    }
  }

}

console.log(MathUtils.add(5, 3));       // 8
console.log(MathUtils.subtract(10, 4)); // 6
console.log(MathUtils.multiply(6, 7));  // 42
console.log(MathUtils.divide(20, 5));   // 4
console.log(MathUtils.divide(10, 0));   // RangeError: Division by zero