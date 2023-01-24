const mongoose = require("mongoose");

let adminSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile : Number,
    storename : String,
    storedescription : String,
    storelogo : String,
    
})

let adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;