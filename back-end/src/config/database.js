const mongoose = require('mongoose');


const connectDatabase = () => {
    mongoose.connect('mongodb://localhost:27017/Do_An', {
        
    }).then(con => {
        console.log(`MongoDB Database connected`)
    })
}

module.exports = connectDatabase