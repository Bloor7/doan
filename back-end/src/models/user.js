const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    tenKhachHang: {
        type: String,
        required: [true, 'Tên không được để trống'],
        maxLength: [30, 'Tên của bạn không được vượt quá 30 ký tự']
    },
    email: {
        type: String,
        required: [true, 'Email không được để trống'],
        unique: true,
        validate: [validator.isEmail, 'Vui lòng nhập địa chỉ email hợp lệ']
    },
    password: {
        type: String,
        required: [true, 'Mật khẩu không được để trống'],
        minlength: [6, 'Mật khẩu của bạn phải dài hơn 6 ký tự'],
        select: false
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    diachi: {
        type: String,
        required: [true, 'Địa chỉ không được để trống'],

    }

}, {
    collection: "Customers"
})



module.exports = mongoose.model('User', userSchema);
