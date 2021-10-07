///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const express = require("express")
const Animal = require("../models/animal")

///////////////////////////////////////
// create router
///////////////////////////////////////
const router = express.Router()

///////////////////////////////////////
// router middleware
///////////////////////////////////////
router.use((req, res, next) => {
    if (req.session.loggedIn){
        next()
    } else {
        res.redirect("/user/index.ejs")
    }
})
///////////////////////////////////////
// routes
///////////////////////////////////////

router.get("/animals/seed", (req,res) => {
    const startAnimals =[
        {species: "shark", lifeExpectancy: "58 years", location: "everywhere theres water", extinct: "I wish"},
        {species: "tiger", lifeExpectancy: "26 years", location: "southwest Asia", extinct: "no"},
        {species: "kangaroo", lifeExpectancy: "20 years", location: "australia", extinct: "no"},
        {species: "boa constrictor", lifeExpectancy: "22 years", location: "south america", extinct: "no"},
        {species: "Deinosuchus", lifeExpectancy: "50 years", location: " north america", extinct: "yes"}
    ]
    //delete all animals
    Animal.remove({}, (err, data) => {
//seed starter animals
    Animal.create(startAnimals, (err, data) => {
        //send created animals as response to confirm creation
        res.json(data);
    })
    })
})

// Index Route (Get => /animals)
router.get("/", (req, res) => {
    Animal.find({username: req.session.username}, (err, animals) => {
        res.render("animals/index.ejs", {animals})
    })
})

// New Route (Get => /animals/new)
router.get("/new", (req, res) => {
    res.render("animals/new.ejs")
})

  //CREATE route
router.post("/", (req, res) => {
    // add the username to req.body
    req.body.username = req.session.username
    // create the new animal
    Animal.create(req.body, (err, animal) => {
        //send the user back to index
        res.redirect("/animals")
    })
})

// The Edit Route (Get => /animals/:id/edit)
router.get("/:id/edit", (req, res) => {
    const id = req.params.id // get id from params
    // get animal from database
    Animal.findById(id,(err, animal) => {
        //render a template
        res.render("animals/edit.ejs", {animal})
    })

})

// THe Update Route (PUT => /animals/:id)
router.put("/:id", (req, res) =>{
    // get the id param
    const id = req.params.id
    Animal.findByIdAndUpdate(id, req.body, {new: true}, (err, animal) => {
        //redirect back to main page
        res.redirect("/animals")
    })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    Animal.findByIdAndRemove(id, (err, animal) => {
        res.redirect("/animals")
    })
})

// THe Show (GET => /animal/:id)
router.get("/:id", (req, res) => {
    // grab the id from params
    const id = req.params.id

    Animal.findById(id, (err, animal) => {
        //render the template
        res.render("animals/show.ejs", {animal})
    })
})

///////////////////////////////////////
// export the router
///////////////////////////////////////
module.exports = router