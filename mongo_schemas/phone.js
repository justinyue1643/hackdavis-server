const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const textEntrySchema = new Schema({
    phone: {
        type: String,
        required: true
    },

    first_name: {
        type: String,
        required: false
    },

    last_name: {
        type: String,
        required: false
    }
} , {timestamps: true})

const Phone = mongoose.model('Phone', textEntrySchema)

module.exports = Phone

