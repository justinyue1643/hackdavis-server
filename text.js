const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const textEntrySchema = new Schema({
    phone: {
        type: String,
        required: true
    },

    response: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Text = mongoose.model('Text', textEntrySchema)

module.exports = Text;