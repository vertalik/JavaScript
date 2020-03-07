'use strict';

class Car extends Human {
  constructor(id, name, year, price, owner) {
    super(id, name);
    this.year = year;
    this.price = price;
    this.owner = owner;
  }
}
