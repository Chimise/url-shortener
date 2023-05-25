const mongoose = require('mongoose')
const toJson = require('./plugins/toJson');

const Schema = mongoose.Schema;

const urlSchema = new Schema({
    longUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    }
})

toJson(urlSchema);

module.exports = mongoose.model('Url', urlSchema);