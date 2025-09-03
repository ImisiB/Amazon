class Car{
  brand;
  model;
  speed = 0;

  
  constructor() {
    {
      this.brand = 'Toyota'
      this.model = 'Corolla'
      }
    {
      this.brand = 'Tesla'
      this.model = 'Model 3'
    }
    
  }
  
  displayInfo() {
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h`)
  }
  isTrunkOpen(trunk) {
    if(trunk === false) {
      if(this.speed === 0) {
        console.log('closed');
      } 
    } else if(trunk === true) {
      if(this.speed === 0) {
        console.log('opened')
      }
    }
  }
  openTrunk() {
    this.isTrunkOpen(true)
  }
  closeTrunk() {
    this.isTrunkOpen(false)
  }
  go() {
    if(!this.isTrunkOpen()) {
      this.speed += 5;
      this.speed = Math.min(200, this.speed);
    }
    if(this.isTrunkOpen()) {
      console.log('close trunk')
    }
  }
  brake() {
    this.speed -= 5;
    this.speed = Math.max(0, this.speed);
  }
  
}

// console.log(new Car('Toyota', 'Corolla'))
// console.log(new Car('Tesla', 'Model 3'))
const car = new Car();


car.isTrunkOpen(true)
car.go()
car.go()


console.log(car)

car.displayInfo()