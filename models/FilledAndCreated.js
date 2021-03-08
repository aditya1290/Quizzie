const mongoose = require('mongoose');
const User = require('./users');
const Form = require('./Form');

const FilledAndCreatedSchema = new mongoose.Schema({

    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    Filled : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Response'
    }],
    Created : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Form'
    }]
})

module.exports = mongoose.model("FilledAndCreated", FilledAndCreatedSchema)