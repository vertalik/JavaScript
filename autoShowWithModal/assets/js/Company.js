'use strict';

class Company extends Human {
  constructor(id, date, name, workers, money, car) {
    super(id, date, name);
    this.workers = workers;
    this.money = money;
    this.car = car;
  }
}
