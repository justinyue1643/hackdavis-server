const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const question = new Schema({
    question: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Question = mongoose.model('Question', question)

module.exports = Question;