const mongoose = require('mongoose');

const checkoutSchema = mongoose.Schema({
    paymentMethodId: {
        type: String, 
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    product: {
        type: Array,
        required: true,
        default: {
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
            },
            quantity: {
                type: String,
                required: true
            }
        }
    },
})



module.exports = mongoose.model('checkout', checkoutSchema);