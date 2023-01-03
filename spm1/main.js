const makes = ["Mercedes Benz", "Audi", "Volkswagen", "Skoda", "Fiat", "Volvo"];
const wheels = [2, 3, 4, 6, 8, 12, 16];

class Car {
  constructor(plate, weight, make, wheels) {
    this.plate = plate;
    this.weight = weight;
    this.make = make;
    this.wheels = wheels;
  }
}

const cars = [];

for (let i = 0; i < 100; i++) {
  const plate = `AB${100 + Math.floor(Math.random() * 899)}CD`;
  const weight = 1000 + Math.floor(Math.random() * 9000);
  const make = makes[Math.floor(Math.random() * makes.length)];
  const currWheels = wheels[Math.floor(Math.random() * wheels.length)];

  const car = new Car(plate, weight, make, currWheels);
  cars.push(car);
}

// ----------------------------------------------------------------

const eightWheelers = cars.filter((car) => car.wheels === 8);
console.log("🚀 ~ file: main.js:28 ~ eightWheelers", eightWheelers);

const plates = cars.map((car) => car.plate);
console.log("🚀 ~ file: main.js:30 ~ plates", plates);

const lowestWeight = cars.reduce((prevCar, currCar) =>
  prevCar.weight > currCar.weight ? currCar : prevCar
).weight;
console.log("🚀 ~ file: main.js:32 ~ lowestWeight", lowestWeight);

const mostWheels = cars.filter(
  (car) => car.wheels === Math.max(...cars.map((car_) => car_.wheels))
);
console.log("🚀 ~ file: main.js:36 ~ mostWheels", mostWheels);

const carsWithWheels = {};
cars.forEach((car) => {
  const currAmount = carsWithWheels[car.wheels + ""] || 0;
  carsWithWheels[car.wheels + ""] = currAmount + 1;
});
console.log("🚀 ~ file: main.js:39 ~ carsWithWheels", carsWithWheels);

// In Javascript, functions can be assigned to variables in the same way that strings or arrays can.
// They can be passed into other functions as parameters or returned from them as well.
// A “higher-order function” is a function that accepts functions as parameters and/or returns a function.
