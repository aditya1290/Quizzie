const mongoose = require('mongoose');
const Form = require('./Form');
const Response = require('./Response');

const ParentResponse = new mongoose.Schema({
    FormID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Form'
    },
    Responses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Response',
    }]
})

module.exports = mongoose.model('ParentResponse', ParentResponse);