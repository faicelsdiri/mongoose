const express = require("express");
const router = express.Router();
const person = require("../Models/personModels");

//ADD 
router.post("/addperson", async (req, res) => {
    try {
      const newPerson = {
        name: req.body.name,
        age: req.body.age,
        favoriteFoods: req.body.favoriteFoods
      };
      const result = await person.create(newPerson);
      res.send({ msgg: " Person added !", result });
    } catch (error) {
      console.log(error);
      res.status(500).json("internal server error ", error);
    }
  });


//   Use model.find() to Search Your Database
router.get("/getperson",async (req,res)=>{
    try{
        const result =await person.find();
        res.send({msg:" person  affiche !", result });
    }catch (error) {
        console.log(error);
        res.status(500).json("internal server error ", error);
      }
})

router.get("/getpersonbyname/:name",async (req,res)=>{
    try{
        const name =req.params.name;

        const result =await person.findOne({name});
        res.send({msg:" person  affiche !", result });
    }catch (error) {
        console.log(error);
        res.status(500).json("internal server error ", error);
      }
})


// Use model.findOne() to Return a Single Matching Document from Your Database
router.get("/getpersonbyfood",async (req,res)=>{
    try{
        const result =await person.findOne({favoriteFoods : req.body.favoriteFoods});
        res.send({msg:" person  affiche !", result });
    }catch (error) {
        console.log(error);
        res.status(500).json("internal server error ", error);
      }
})

// Use model.findById() to Search Your Database By _id
router.get("/getpersonbyid/:id",async (req,res)=>{
    try{
        const id =req.params.id;
        const result =await person.findById({_id : id});
        res.send({msg:" person  affiche !", result });
    }catch (error) {
        console.log(error);
        res.status(500).json("internal server error ", error);
      }
})

// Perform Classic Updates by Running Find, Edit, then Save
router.put("/updatepersonbyid/:id",async (req,res)=>{
    try{
        const id =req.params.id;
        const result = await person.findByIdAndUpdate( {_id : id},{ $push: { favoriteFoods: req.body.favoriteFoods } }, { new: true } );
        res.send({msg:" person  Modifie !", result });
    }catch (error) {
        console.log(error);
        res.status(500).json("internal server error ", error);
      }
})

// Perform New Updates on a Document Using model.findOneAndUpdate()
router.put("/updateage/:name",async (req,res)=>{
    try{
        const name =req.params.name;
        const result = await person.findOneAndUpdate( {name : name},{ $set: { age: req.body.age } }, { new: true } );
        res.send({msg:" Age  Modifie !", result });
    }catch (error) {
        console.log(error);
        res.status(500).json("internal server error ", error);
      }
})

// Delete One Document Using model.findByIdAndRemove
router.delete("/deletepersonbyid/:id",async (req,res)=>{
    try{
        const id =req.params.id;
        const result = await person.findByIdAndDelete( {_id : id});
        res.send({msg:" person  supprime !", result });
    }catch (error) {
        console.log(error);
        res.status(500).json("internal server error ", error);
      }
})

// MongoDB and Mongoose - Delete Many Documents with model.remove()
router.delete('/remove/:age', async (req, res) => {
    try {
      const { age } = req.params;
      const result = await person.deleteMany({ age });
      res.json(result);
    } catch (err) {
      res.status(500).send(err.message || 'Internal Server Error');
    }
  });




module.exports = router;