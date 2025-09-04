class Car{
  #brand;
  #model;
  speed = 0;

  
  constructor() {
    {
      this.#brand = 'Toyota'
      this.#model = 'Corolla'
      }
    {
      this.#brand = 'Tesla'
      this.#model = '#Model 3'
    }
    
  }
  
  displayInfo() {
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h`)
  }
  isTrunkOpen(trunk) {
    if(trunk === false) {
      console.log('closed');
    } else if(trunk === true) {
      if(this.speed === 0) {
        console.log('opened')
      }
    }
  }
  openTrunk() {
    if(this.speed === 0) {
      this.isTrunkOpen(true)
    }
  }
  closeTrunk() {
    this.isTrunkOpen(false)
  }
  go() {
    this.speed += 5;
    this.speed = Math.min(200, this.speed);
    // console.log('close trunk')
  }
  brake() {
    this.speed -= 5;
    this.speed = Math.max(0, this.speed);
  }
  
}

// console.log(new Car('Toyota', 'Corolla'))
// console.log(new Car('Tesla', '#Model 3'))
const car = new Car();


car.go()
car.go()
car.go()

car.closeTrunk()

car.displayInfo()



class RaceCar extends Car{
  acceleration = 0;

  constructor(carDetails) {
    super(carDetails)
    this.brand = 'McLaren'
    this.model = 'F1'
  }
  go() {
    this.speed += this.acceleration;
    if(this.acceleration >= 300) {
      console.log('Cannot go faster than 300 km/h');
      this.speed = Math.max(300);
    } else if(this.acceleration <= 0) {
      console.log('Cannot go below 0 km/h');
      this.speed = Math.min(0);
    }
  
  }
  displayInfo() {
    console.log(`${this.brand}, ${this.model}, ${this.speed} km/h`)
  }
}

const raceCar = new RaceCar()

raceCar.acceleration = 500
raceCar.go()
raceCar.displayInfo()