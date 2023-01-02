class Car {
  static amount = 0;

  #make;
  #price;

  constructor(make, price) {
    if (!make)
      throw new SyntaxError(
        "'make' is undefined. This argument must be given."
      );
    if (!price)
      throw new SyntaxError(
        "'price' is undefined. This argument must be given."
      );

    if (typeof make !== "string")
      throw new TypeError("'make' must be of type 'string'.");
    if (typeof price !== "number")
      throw new TypeError("'price' must be of type 'number'.");

    this.#make = make;
    this.#price = price;

    Car.amount++;
  }

  toString() {
    return `This car is made by ${this.#make} and costs ${this.#price}€.\n`;
  }
}

class Van extends Car {
  constructor(make, price, capacity) {
    super(make, price);

    if (!capacity)
      throw new SyntaxError(
        "'capacity' is undefined. This argument must be given."
      );

    if (typeof capacity !== "number")
      throw new TypeError("'capacity' must be of type 'number'.");

    this.capacity = capacity;
  }

  toString() {
    return (
      super.toString() +
      `This car is a van and has a carrying capacity of ${this.capacity}kg.\n`
    );
  }
}

// ----------------------------------------------------------------

const cars = [
  new Car("Volvo", 25000),
  new Car("Fiat", 10000),
  new Van("Ford", 3500, 1000),
  new Van("Mercedes Benz", 50000, 2000),
  new Car("Volkswagen", 15000),
];
console.log("🚀 ~ file: main.js:66 ~ amount", Car.amount);

for (let car of cars) {
  console.log(car.toString());
}

// Inheritance enables you to define a class that takes all the functionality from a parent class and allows you to add more.
// Using class inheritance, a class can inherit all the methods and properties of another class.
// Inheritance is a useful feature that allows code reusability.
// To use class inheritance, you use the extends keyword.
