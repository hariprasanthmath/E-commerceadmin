//loading environmental variables
require('dotenv').config()

const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connect = require("./db/connect")
const app = express();

// mongoose model for Product collection
const ProductModel = require("./db/product.model");

app.use(express.json());
app.use(cors());

// will log request type
app.use(morgan('tiny'));

app.use(express.static("build"));



// test route
app.get("/", (req, res)=>{
    console.log("get to main route");
    res.send({message:"main route"})
})



// create a product in a database
app.post("/product", async (req, res)=>{
    try{
        let reqData = req.body.productdata;
        console.log(reqData);
        const result = await ProductModel.create(reqData)
        res.status(201).send("Registered Successfully");
    }catch(err){
        res.status(500).send(err);
    }
})

// will return all the product in database
app.get("/products", async(req, res)=>{
    
    try{

        let allProducts = await ProductModel.find();
        console.log(allProducts);
        res.status(201).send(allProducts);

    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
})


// will edit the data of the product with specific _id
app.patch("/products/:_id", async (req, res)=>{

    try{

       let _id = req.params._id;
       let reqData = req.body.details;
       console.log(_id, reqData);

       await ProductModel.updateOne({_id},{$set: {...reqData}});
       
       res.status(201).send("Edit success")

    }catch(err){
        console.log("failed");

        res.status(500).send(err);

    }
})


//will delete the product with that _id
app.delete("/product/:_id", async (req, res)=>{

    try{

        let _id = req.params._id;
        
        await ProductModel.deleteOne({_id});

        res.status(201).send("Delete success");

    }catch(err){

        res.status(500).send("delete failed");

    }
})


// connection to database - if connected then app will listen in port 5000
connect().then(()=>{
    app.listen(5000, ()=>{
        console.log("listening in 5000");
    })
})

