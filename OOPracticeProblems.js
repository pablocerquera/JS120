function itemCreator(id, name, stock, price) {
  return {
    IdNum: id,
    name: name,
    stock: stock,
    price: price,

    details() {
      console.log(`Name: ${this.name}\nID: ${this.IdNum}\nPrice: ${this.price}\nStock: ${this.stock}`);
    },

    setPrice(newPrice) {
      if (newPrice >= 0) {
        this.price = newPrice;
      } else {
        console.log('the new price given needs to be a positive number')
      }

    }
  }
}


let scissors = itemCreator(0, 'Scissors', 8, 10);
let drill = itemCreator(1, 'Drill', 15, 45);
let hammer = itemCreator(2, 'Hammer', 100, 20);
let screwer = itemCreator(3, 'Screwer Thingy', 1, 100000000);



scissors.setPrice(1100)

hammer.details();
screwer.details();

