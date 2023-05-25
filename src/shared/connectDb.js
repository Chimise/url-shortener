const mongoose = require('mongoose');
const config = require('config');

const connectDb = async () => {
    const db = config.get('db');
    return mongoose.connect(db.url);
}

module.exports = connectDb;