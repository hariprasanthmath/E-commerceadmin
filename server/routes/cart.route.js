const express = require("express");
const cartRoute = express.Router();
const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin.model")
const cartModel = require("../models/cart.model");
const auth = require("../middleware/auth")
const config = require("../config/index")
const auth2 = require("../middleware/auth2")


cartRoute.patch("/orderstatus/:orderid", async(req, res)=>{
   
    try{
        let orderid = req.params.orderid;
        let status = req.body.nextStatus;
        console.log(orderid, status);

        await cartModel.updateOne({orderid},{$set:{status}});
        res.send("success");
    }catch(err){
       res.send(err)
    }
 
 })

cartRoute.get("/orderstatus/:orderid", async (req, res)=>{

    try{

        let orderid = req.params.orderid;

        let data = await cartModel.find({orderid});
        let count = await cartModel.find({orderid}).count();
        if(count > 0){
            res.send(data[0]);
        }else{
            res.send("Order not found")
        }
       
    }catch(err){
        res.send(err);
        

    }
})

 module.exports = cartRoute;

 