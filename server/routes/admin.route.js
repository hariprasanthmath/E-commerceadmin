const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin.model")
const auth = require("../middleware/auth")
const config = require("../config/index")
const auth2 = require("../middleware/auth2")

route.get("/", (req, res)=>{
    console.log("admin route");
    res.send({message:"success"});
})

route.post("/register" ,async (req, res)=>{
    try{
        const {name, email, password, mobile} = req.body.formstate;
        const alreadyRegistered = await adminModel.findOne({email});
        // const alreadyRegisteredcount =  adminModel.find({email}).count;
        console.log(alreadyRegistered);
        console.log(name, email);
        if(alreadyRegistered){
            res.send({message:"Account already present"});
        }else{
            let _id = await adminModel.create({name, email, password, mobile});
            res.status(201).send({message:"success"});
        }
       

     
       
    }catch(err){
        res.status(400).send({message:err})
    }
})

route.post("/login", async (req, res)=>{
    try{
       const {email, password} = req.body.formstate;
       let admin = await adminModel.findOne({email});
       
       if(admin){
         let passwordMatch = admin.password == password;
         console.log(passwordMatch);
        if(passwordMatch) {
             console.log(email);
         let token = jwt.sign({email}, config.JWTKEY, {expiresIn : config.JWTEXPIRETIME});
         res.status(201).send({token});
        }else{
            res.status(401).send({message:"wrong password"});
        }
       }else{
            res.status(401).send({message:"user does not present"});
       }
       
    }catch(err){
        res.status(401).send({message:"error"});
    }
})

route.get("/profile", auth2, async(req, res)=>{
    try{
         console.log(req);
         let email = req.email;
         let user = await adminModel.findOne({email});
         console.log(user);
         res.send(user);
    }catch(err){

        res.send(err);
    }
})


route.patch("/profile" , auth, async(req, res)=>{
    try{
        let email = req.email;
        let reqData = req.body.profilestate;
        console.log(email, reqData);
        await adminModel.updateOne({email},{$set: {...reqData}});
        res.send({message:"working"})
    }catch(err){
        console.log(err);
        res.send({message:"working"})
    }
})


route.post("/tokencheck" ,auth2 ,async (req, res)=>{
    try{
          res.send({message:req.email})
    }catch(err){

    }
})

module.exports = route;
