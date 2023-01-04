const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: String,
    description :String,
    image: String,
    owner: {
        _id : mongoose.Types.ObjectId,
        
    },
    type: String
})

const ProductModel = mongoose.model('Product',P)