const mongoose = require("mongoose");

let cartSchema = mongoose.Schema({
    orderid : String,
    cartData : Array,
    status : String,
    userData : {
        name : String,
        phone : Number,
        email : String,
        Address : String,
        state : String,
        city : String,
        deliveryinstructions : String
    },
    StoreEmail : String
},
{
    timestamps: true
});

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;