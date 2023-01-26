const express = require("express");
const storeRoute = express.Router();
const ProductModel = require("../db/product.model")
const adminModel = require("../models/admin.model")
const cartModel = require("../models/cart.model")

storeRoute.get("/:storename", async (req, res)=>{
    
 try{
    let storename = req.params.storename

    let {email} = await adminModel.findOne({storename}).select("email");
    let allProducts = await ProductModel.find({owner:email});
        console.log(allProducts);
        res.status(201).send({allProducts,email});
    
 }catch(err){
    res.send(err);
 }
})

storeRoute.post("/neworder" , async (req, res)=>{

   try{

      let response = await cartModel.create(req.body.orderData);
      console.log(req.body.orderData);
      res.status(201).send({result:response});
   }catch(err){
      res.status(400).send(err);
   }
})

// storeRoute.get("/adminproducts" ,  async (req, res)=>{
    
//     try{
//         let email = req.email;
//         console.log(email);
//         let allProducts = await ProductModel.find({owner:email});
//         console.log(allProducts);
//         res.status(201).send(allProducts);

//     }catch(err){
//         console.log(err);
//         res.status(500).send(err);
//     }

// })

module.exports = storeRoute;