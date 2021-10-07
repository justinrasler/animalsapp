// import the connected mongoose object
const mongoose = require("./connection")


/////////////////////////////////////////
// Our Model
/////////////////////////////////////////
const {Schema, model} = mongoose

const animalSchema = new Schema({
    species: String,
    lifeExpectancy: String,
    location: String,
    extinct: Boolean
})

const Animal = model("Animal", animalSchema)

//export the model
module.exports = Animal

