const express = require("express");
const projectModel = require("../projectModel")

const router = express.Router();

//Create

//Read
router.get("/", (req, res) => {
    projectModel
    .get(req.id)
    .then( e => {
        res.status(200).json(e)
    })
    .catch( error => {
        console.log(error);
        res.status(500).json({message: "Error retrieving project!"})
    })
})
//Update
//Delete

module.exports = router;
