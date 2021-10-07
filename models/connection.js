/////////////////////////////////////
// Import Dependencies
/////////////////////////////////////
require("dotenv").config()// load env vars
const mongoose = require("mongoose")

//////////////////////////////////////
// Establish Database Connection
//////////////////////////////////////
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Establish connection
mongoose.connect(DATABASE_URL, CONFIG)

mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected From Mongo"))
.on("error", (error) => console.log(error))

/////////////////////////////////////
// Export The Connected Mongoose
/////////////////////////////////////
module.exports = mongoose
