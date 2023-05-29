const mongoose = require('mongoose');
const toJson = require('./plugins/toJson');

const Schema = mongoose.Schema;

const clickSchema = new Schema({
    urlId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Url'
    },
    clickedDate: {
        type: Date,
        default: () => new Date()
    }
})


toJson(clickSchema);

module.exports = mongoose.model('Click', clickSchema);