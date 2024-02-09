const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');


// Register a user   => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { tenKhachHang, email, password, sdt, diachi } = req.body;

    if (!tenKhachHang) {
        return next(new ErrorHandler('Tên không được để trống', 401))
    }
    if (!email) {
        return next(new ErrorHandler('Email không được để trống', 401))
    }
    if (!password) {
        return next(new ErrorHandler('Mật khẩu không được để trống', 401))
    }
    if (!sdt) {
        return next(new ErrorHandler('Số điện thoại không được để trống', 401))
    }
    if (!diachi) {
        return next(new ErrorHandler('Địa chỉ không được để trống', 401))
    }

    
    console.log(tenKhachHang, email, password, sdt, diachi);

    
    
    
    

    console.log('a');
    User.create({
        tenKhachHang: tenKhachHang,
        email: email,
        password: password,
        sdt: sdt,
        diachi: diachi,
    })
    .then(data => {
        res.json({
            status: true,
            data: data
        })
    })
    .catch(err => {
        res.send('that bai')
    })
    console.log('b');

    

})

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);
    // Checks if email and password is entered by user
    User.findOne({email: email, password: password})
    .then(data => {
        res.json({
            status: 'dang nhap thanh cong',
            data: data
        })
    })
    .catch(err => {
        res.send('dang nhap that bai')
    })
})