'use strict';

class Car extends Human {
  constructor(id, date, name, year, price, owner,buyDate) {
    super(id, date, name);
    this.year = year;
    this.price = price;
    this.owner = owner;
    this.buyDate = buyDate;
  }
}
