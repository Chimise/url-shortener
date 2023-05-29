const mongoose = require('mongoose');
const config = require('config');

const connectDb = async () => {
    const mongoUrl = config.get('db').url;
    return mongoose.connect(mongoUrl);
}

module.exports = connectDb;