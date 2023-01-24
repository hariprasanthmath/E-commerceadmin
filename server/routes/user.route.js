const express = require("express");

const jwt = require("jsonwebtoken");
const userRoute = express.Router();
const adminModel = require("../models/admin.model")


userRoute.get("/storelist", async (req, res)=>{
    try{

        let details = await adminModel.find().select('_id storename storelogo email storedescription')
        console.log(details);

       
        res.send({data:details});
    }catch(err){
        res.send(err);
    }
 
})

module.exports = userRoute;

