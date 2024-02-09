const Order = require('../models/order');
const Product = require('../models/product');


const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


// create
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        idKhachHang,
        idProducts,
        totalPrice,

    } = req.body;

    Order.create({
        idKhachHang: idKhachHang,
        idProducts: idProducts,
        totalPrice: totalPrice,
    })
    .then(data => {
        res.json({
            status: 'true',
            data: data
        })
    })
    .catch(err => {
        res.send('not order')
    })
    
})

//get one 
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    // const order = await Order.findById(req.params.id).populate('user', 'email')

    // if (!order) {
    //     return next(new ErrorHandler('Không tìm thấy đơn hàng nào có ID này', 404))
    // }

    // res.status(200).json({
    //     success: true,
    //     order
    // })
    Order.findById(req.params.id)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.send('khong tim thay don hang')
    })
})

// get user orders

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    // const orders = await Order.find({ user: req.user.id })

    // res.status(200).json({
    //     success: true,
    //     orders
    // })
    const userId = req.body.idKhachHang
    console.log(userId);
    Order.find({userId})
    .then(data => {
        res.send({data: data})
    })
    .catch(err => {
        res.send('loi khong co don hang nao')
    })
})



//get all order admin
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

// update / Process order - ADMIN
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (order.orderStatus === 'Đã giao hàng') {
        return next(new ErrorHandler('Bạn đã giao đơn đặt hàng này', 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
        order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
    })
})
