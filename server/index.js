require('dotenv').config()

const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connect = require("./db/connect")
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use(express.static("build"));




app.get("/", (req, res)=>{
    res.send({message:"main route"})
})

connect().then(()=>{
    app.listen(5000, ()=>{
        console.log("listening in 5000");
    })
})

