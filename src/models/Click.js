const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clickSchema = new Schema({
    urlId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    clickedDate: {
        type: Date,
        default: () => new Date()
    }
})

module.exports = mongoose.model('Click', clickSchema);