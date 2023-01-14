const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin.model")
const auth = require("../middleware/auth")
const config = require("../config/index")
route.get("/", (req, res)=>{
    console.log("admin route");
    res.send({message:"success"});
})

route.post("/register" ,async (req, res)=>{
    try{
        const {name, email, password, mobile} = req.body;
        let alreadyRegistered = await adminModel.findOne({email});
        
        if(alreadyRegistered){
            res.status(400).send({message:"Account already present"});
        }

        let _id = await adminModel.create({name, email, password, mobile});
        res.status(201).send({_id});
       
    }catch(err){
        res.send({message:err})
    }
})

route.post("/login", async (req, res)=>{
    try{
       const {email, password} = req.body;
       let admin = await adminModel.findOne({email});
       
       if(admin){
         let passwordMatch = admin.password == password;
         console.log(passwordMatch);
        if(passwordMatch) {
             
         let token = jwt.sign({email}, config.JWTKEY, {expiresIn : config.JWTEXPIRETIME});
         res.status(201).send({token});
        }else{
            res.status(401).send({message:"wrong password"});
        }
       }else{
            res.status(401).send({message:"user does not present"});
       }
       
    }catch(err){

    }
})


route.post("/tokencheck" ,auth ,async (req, res)=>{
    try{
          res.send({message:req.email})
    }catch(err){

    }
})

module.exports = route;
