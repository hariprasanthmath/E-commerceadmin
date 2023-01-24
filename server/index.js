//loading environmental variables
require('dotenv').config()

const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connect = require("./db/connect")
const app = express();

const adminRoute = require("./routes/admin.route");
const userRoute = require("./routes/user.route");
const storeRoute = require("./routes/store.route");

const auth = require("./middleware/auth")
const auth2 = require("./middleware/auth2")
// mongoose model for Product collection
const ProductModel = require("./db/product.model");


app.use(express.json());
app.use(cors());

// will log request type
app.use(morgan('tiny'));

app.use(express.static("build"));
app.use("/admin" , adminRoute);
app.use("/user", userRoute);
app.use("/store", storeRoute);

// test route
app.get("/", (req, res)=>{
    console.log("get to main route");
    res.send({message:"main route"})
})



// create a product in a database
app.post("/product", auth, async (req, res)=>{
    try{
        let reqData = req.body.productdata;
        let email = req.email;
        console.log(reqData);
        reqData.owner = email;
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

app.get("/adminproducts" , auth2, async (req, res)=>{
    
    try{
        let email = req.email;
        console.log(email);
        let allProducts = await ProductModel.find({owner:email});
        console.log(allProducts);
        res.status(201).send(allProducts);

    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }

})


// will edit the data of the product with specific _id
app.patch("/products/:_id", auth, async (req, res)=>{

    try{
         
       let email = req.email;
       let _id = req.params._id;
       let reqData = req.body.details;
       console.log(_id, reqData);

       await ProductModel.updateOne({_id, owner:email},{$set: {...reqData}});
       
       res.status(201).send("Edit success")

    }catch(err){
        console.log("failed");

        res.status(500).send(err);

    }
})


//will delete the product with that _id
app.delete("/product/:_id", auth2,  async (req, res)=>{

    try{
        let email = req.email;
        let _id = req.params._id;
       
        let count = await ProductModel.deleteOne({_id, owner:email});
        console.log(count);
        if(count.deletedCount == 0){
            res.status(201).send("Not found");

        }else{
            res.status(201).send("Delete success");

        }
       

    }catch(err){

        res.status(500).send("delete failed");

    }
})


// connection to database - if connected then app will listen in port 5000
const PORT = process.env.PORT || 5000;
connect().then(()=>{
    app.listen(PORT, ()=>{
        console.log("listening in "+ PORT);
    })
})

