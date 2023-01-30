const express = require("express");
const storeRoute = express.Router();
const ProductModel = require("../db/product.model")
const adminModel = require("../models/admin.model")
const cartModel = require("../models/cart.model")
const nodemailer = require("nodemailer");
require("dotenv").config();


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
      
      req.body.orderData.status = "new";
      let response = await cartModel.create(req.body.orderData);
      console.log(req.body.orderData);
      console.log(process.env.EMAILPASSWORD);
      const transporter = nodemailer.createTransport( {
         service : "hotmail",
         auth : {
            user : "ecommerce-application@outlook.com",
            pass : process.env.EMAILPASSWORD
         }
      });

      const options = {
         from : "ecommerce-application@outlook.com",
         to : req.body.orderData.userData.email,
         subject: "E-commerce app Order details",
         text : req.body.orderData.orderid
      }

      transporter.sendMail(options, function(err, info){
         if(err){
            console.log(err);
            return
         }
         console.log("sent "+ info.response);
      })

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