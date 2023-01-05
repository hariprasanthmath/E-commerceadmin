const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: String,
    description :String,
    image: String,
    price: Number,
    category: String,
    owner: String
   
})

const ProductModel = mongoose.model('product',ProductSchema);

module.exports = ProductModel;