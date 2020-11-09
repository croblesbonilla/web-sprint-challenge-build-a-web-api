const express = require("express");
const actionModel = require("../helpers/actionModel")

const router = express.Router();

//Create
router.post("/",  (req, res) => {
    const actiontInfo = req.body;
    actionModel
      .insert(actionInfo)
      .then((action) => {
          res.status(201).json(({message: "Your action was created!"}, action))
      })
      .catch( error => {
        console.log(error);
        res.status(500)
        .json({message: "There was a error creating a action"})
    })
});
//Read
router.get("/", (req, res) => {
    actionModel
    .get(req.id)
    .then( e => {
        res.status(200).json(e)
    })
    .catch( error => {
        console.log(error);
        res.status(500).json({message: "Error retrieving action!"})
    })
})
//Update
router.put("/:id", (req, res) => {
    const actionInfo = req.body;
    const { id } = req.params
    actionModel
    .update(id, actionInfo)
    .then(e => {
        if(e){
            res.status(200).json({message: "The action has been updeted!"})
        }else{
            res.status(404).json({message: "The action could not be updated, it was not our fault."})
        }
    })
    .catch(error => {
        res.status(500).json({message: "There was a error updating the action"})
    })
})
//Delete
router.delete("/:id", (req, res) => {
    actionModel
    .remove(req.params.id)
    .then(e => {
        if(e > 0){
            res.status(200).json({message: "The action has been deleted"})

        }else{res.status(404).json({message: "The action could not be found"})}
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "Error deleting the action"})
    })
})

module.exports = router;