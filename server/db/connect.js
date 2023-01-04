const mongoose = require("mongoose");
// const { resolve } = require("path");
require("dotenv").config();
async function  connect() {
    console.log(process.env.DB);
   return new Promise((resolve, reject)=>{
     
     mongoose.connect(process.env.DB, (err)=>{
        if(err){
            console.log("error in connecting");
            return reject(err);
        }
        console.log("connected to DB");
        resolve();
     })
   })
}

module.exports = connect;