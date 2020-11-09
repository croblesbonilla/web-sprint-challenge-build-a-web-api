const express = require("express");
const projectModel = require("../helpers/projectModel")

const router = express.Router();

//Create
router.post("/",  (req, res) => {
    const projectInfo = req.body
    projectModel
      .insert(projectInfo)
      .then(() => {
          res.status(201).json(({message: "Your project was created!"}))
      })
})
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
router.put("/:id", (req, res) => {
    const projectInfo = req.body;
    const { id } = req.params
    projectModel
    .update(id, projectInfo)
    .then(e => {
        if(e){
            res.status(200).json({message: "The project has been updeted!"})
        }else{
            res.status(404).json({message: "The project could not be updated, it was not our fault."})
        }
    })
    .catch(error => {
        res.status(500).json({message: "There was a error updating the project"})
    })
})
//Delete
router.delete("/:id", (req, res) => {
    projectModel
    .remove(req.params.id)
    .then(e => {
        if(e > 0){
            res.status(200).json({message: "The project has been deleted"})

        }else{res.status(404).json({message: "The project could not be found"})}
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "Error deleting the project"})
    })
})

module.exports = router;
