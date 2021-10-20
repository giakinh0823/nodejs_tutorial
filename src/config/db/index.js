const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education_dev');
        console.log('Connect database successfully!!');
    } catch (error) {
        console.log('Connet database failed!!');
    }
}

module.exports = { connect }