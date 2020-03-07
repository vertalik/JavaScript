const personsData = [
  {
    id: 1,
    name: 'Iron Man',
    age: 30,
    money: 50000,
    car: []
  },
  {
    id: 2,
    name: 'Captain America',
    age: 45,
    money: 30000,
    car: []
  },
  {
    id: 3,
    name: 'Star Lord',
    age: 50,
    money: 23000,
    car: []
  }
];

const carsData = [
  {
    id: 4,
    name: 'Audi A5',
    year: 2015,
    price: 10000,
    owner: '',
  },
  {
    id: 5,
    name: 'Porshe 911',
    year: 2000,
    price: 15000,
    owner: '',
  },
  {
    id: 6,
    name: 'Lamborginy Huracan',
    year: 2018,
    price: 20000,
    owner: '',
  }
];

const companyData = [
  {
    id: 7,
    name: 'Apple',
    money: 250000,
    workers: 250,
    car: []
  },
  {
    id: 8,
    name: 'Samsung',
    money: 125000,
    workers: 150,
    car: []
  },
  {
    id: 9,
    name: 'Google',
    money: 300000,
    workers: 1000,
    car: []
  }
];

const inputAttribute = {
  id: {
    type: 'number',
    readonly: ''
  },
  name: {
    name: 'name',
    placeholder: 'Enter the name'
  },
  age: {
    type: 'number',
    name: 'age',
    placeholder: 'Enter the age'
  },
  money: {
    type: 'number',
    name: 'money',
    placeholder: 'Enter the amout'
  },
  year: {
    type: 'number',
    name: 'year',
    placeholder: 'Enter the year'
  },
  price: {
    type: 'number',
    name: 'price',
    placeholder: 'Enter the price'
  },
  workers: {
    placeholder: 'Enter the number of workers'
  },
  owner: {
    readonly: ''
  },
  car: {
    type: 'array',
    readonly: ''
  }
};

const patternCollection = {
  persons: {
    name: {
      pattern: '^[A-Z][a-z]{1,} [A-Z][a-z]{1,}$',
      msg: 'Check Name field! eg. "Marco Polo"'
    },
    age: {
      pattern: '^([1-9][0-9]?)$|^(10[0-9])$',
      msg: 'Check Age field! Range (1-109)'
    },
    money: {
      pattern: '^\\d{1,}$',
      msg: 'Check your money :)'
    }
  },
  cars: {
    name: {
      pattern: '^[A-Z]\\w{1,}\\s?\\w{1,}-?\\s?\\w{1,}.?(\\w{1,})?$',
      msg: 'Check car name!'
    },
    year: {
      pattern: '^(19[7-9][0-9])$|^(20[0-1][0-9])$|^(2020)$',
      msg: 'Check year field!'
    },
    price: {
      pattern: '^\\d{1,}$',
      msg: 'Check price'
    }
  },
  companies: {
    name: {
      pattern: '^[A-Z][a-z]{1,}\\s?([A-Z])?([a-z]{1,})?.?$',
      msg: 'Check Company name!'
    },
    workers: {
      pattern: '^\\d{1,}$',
      msg: 'Check workers field!'
    },
    money: {
      pattern: '^\\d{1,}$',
      msg: 'Check your money :)'
    }
  }
};

