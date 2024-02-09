const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    skinTitle: {
        type: String,
        required: [true, 'Tên sản phẩm không được để trống'],
        trim: true,
        maxLength: [100, 'Tên sản phẩm không được vượt quá 100 ký tự']
    },
    skinPrice: {
        type: String,
        required: [true, 'Giá không được để trống'],
        maxLength: [7, 'Giá không được vượt quá 7 ký tự'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Mô tả không được để trống'],
    },
    gender: {
        type: Number,
        default: 0
    },
    images: {
        type: String,
        require: true
    },
    clases: {
        type: String,
        required: [true, 'Vui lòng chọn danh mục cấp một cho sản phẩm này'],
        enum: {
            values: [
                'accessory',
                'shirt',
                'shoes',
                'trousers',
               
            ],
            message: 'Vui lòng chọn đúng danh mục cho sản phẩm'
        }
    },
    classfy: {
        type: String,
        required: [true, 'Vui lòng chọn danh mục cấp hai cho sản phẩm này'],
        enum: {
            values: [
                'T-shirt',
                'betting',
                'dress',
                'Áo sơmi',
                'highHeels',
                'necklace',
                "ring",
                'short',
                'sport',
                't-shirt',
                'bangles',
                'boot',
                'eardrop',
                'jean',
                'pants',
                'sandal',
                'sleepwear',
                'suit',
                'tie',
                'belt',
                'cropTop',
                'hat',
                'keychain',
                'polo',
                'shirts',
                'slip',
                'sunglasses',
                'western',
            ],
            message: 'Vui lòng chọn đúng danh mục cho sản phẩm'
        }
    },
    
    stock: {
        type: Number,
        required: [true, 'Số lượng không được để trống'],
        maxLength: [5, 'Số lượng không được vượt quá 5 ký tự'],
        default: 0
    },
},{
    collection: 'Products'
})


module.exports = mongoose.model('Product', productSchema);



