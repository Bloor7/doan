const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')

//create
exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    var skinTitle = req.body.skinTitle
    var skinPrice = req.body.skinTitle
    var description = req.body.description
    var gender = req.body.gender
    var images = req.body.images
    var clases = req.body.class
    var classfy = req.body.classfy
    var stock = req.body.stock

    

    const product = await Product.create({
        skinTitle: skinTitle,
        skinPrice: skinPrice,
        description: description,
        gender: gender,
        images: images,
        clases: clases,
        classfy: classfy,
        stock: stock

    });

    res.status(201).json({
        success: true,
        product
    })
})
// get all
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    PAGE_SIZE = 35
    let page = req.query.page
    if(page) {
        page = parseInt(page)
        var skip = (page-1) * PAGE_SIZE
        Product.find({})
        .skip(skip)
        .limit(PAGE_SIZE)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send('loi he thong ')
        })
    } else {
        Product.find({})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send('loi he thong ')
        })
    }


})

// get all product admin
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })

})

// get 1 product
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Không tìm thấy sản phẩm', 404));
    }


    res.status(200).json({
        success: true,
        product
    })

})


// update
exports.undateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if(!product) {
        return next(new ErrorHandler('Không tìm thấy sản phẩm', 404))
    }

    var skinTitle = req.body.skinTitle
    var skinPrice = req.body.skinTitle
    var description = req.body.description
    var gender = req.body.gender
    var images = req.body.images
    var clases = req.body.class
    var classfy = req.body.classfy
    var stock = req.body.stock

    
    product = await Product.updateOne(req.params.id, {
        skinTitle: skinTitle,
        skinPrice: skinPrice,
        description: description,
        gender: gender,
        images: images,
        clases: clases,
        classfy: classfy,
        stock: stock
    })

    res.status(200).json({
        success: true,
        product
    })



})

// delete
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Không tìm thấy sản phẩm', 404));
    }

    

    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Xóa sản phẩm thành công'
    })

})