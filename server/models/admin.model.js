const mongoose = require("mongoose");

let adminSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile : Number
})

let adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;