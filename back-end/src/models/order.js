const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    
    
    idKhachHang: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    idProducts: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Products'
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Đã đặt hàng'
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }

}, {
    collection: "Orders"
})

module.exports = mongoose.model('Order', orderSchema)