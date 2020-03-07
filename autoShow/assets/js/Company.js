'use strict';

class Company extends Human {
  constructor(id, name, workers, money, car) {
    super(id, name);
    this.workers = workers;
    this.money = money;
    this.car = car;
  }
}
