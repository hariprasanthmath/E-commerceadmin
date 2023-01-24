const express = require("express");
const storeRoute = express.Router();
const ProductModel = require("../db/product.model")
const adminModel = require("../models/admin.model")

storeRoute.get("/:storename", async (req, res)=>{
    
 try{
    let storename = req.params.storename

    let {email} = await adminModel.findOne({storename}).select("email");
    let allProducts = await ProductModel.find({owner:email});
        console.log(allProducts);
        res.status(201).send(allProducts);
    
 }catch(err){
    res.send(err);
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