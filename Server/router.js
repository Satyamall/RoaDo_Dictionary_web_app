
const express = require("express");
const router = express.Router();
const Dictionary = require("./dictonary.modal")

router.post("/words", async(req,res)=>{
    try{
        const  data = await Dictionary.create(req.body);
        if(!data) return res.status(400).json({message: "Word not created"});
        return res.status(201).json(data);
    }
    catch(err){
      return res.status(500).json({error: err});
    }
})

router.get("/words", async(req,res)=>{
    try{
        const  data = await Dictionary.find({});
        if(!data) return res.status(400).json({message: "Word not found"});
        return res.status(201).json(data);
    }
    catch(err){
      return res.status(500).json({error: err});
    }
})
router.get("/words/:id", async(req,res)=>{
    try{
        const  data = await Dictionary.findById(req.params.id);
        if(!data) return res.status(400).json({message: "Word not found"});
        return res.status(201).json(data);
    }
    catch(err){
      return res.status(500).json({error: err});
    }
})

module.exports = router;