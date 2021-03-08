const mongoose = require('mongoose');
const Questions  = require('./Questions');

const SectionSchema = new mongoose.Schema({

    QuestionCount : {
        type: Number,
    },
    Questions  : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Questions'
    }]
})
module.exports = mongoose.model('Section', SectionSchema);