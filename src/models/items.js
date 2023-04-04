const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
   name: {
        type: String, 
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('item', itemSchema);