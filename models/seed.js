////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const mongoose = require("./connection")
const Animal = require("./animal")

////////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

mongoose.connection.on("open", () => {
    // Run database queries in this function
  
    // create array of starter
    const startAnimals =[
      {species: "shark", lifeExpectancy: "58 years", location: "everywhere theres water", extinct: "I wish"},
      {species: "tiger", lifeExpectancy: "26 years", location: "southwest Asia", extinct: "no"},
      {species: "kangaroo", lifeExpectancy: "20 years", location: "australia", extinct: "no"},
      {species: "boa constrictor", lifeExpectancy: "22 years", location: "south america", extinct: "no"},
      {species: "Deinosuchus", lifeExpectancy: "50 years", location: " north america", extinct: "yes"}
  ];
  
    // Delete all fruits
    Animal.deleteMany({}, (err, data) => {
        //seed starter fruits
        Animal.create(startAnimals, (err, data) => {
            console.log("-------ANIMALS CREATED---------")
            console.log(data)
            console.log("-------ANIMALS CREATED---------")
            mongoose.connection.close();
        })
  
  
    })
  });