const mongoose = require('mongoose');
const User = require('./users');
const Form = require('./Form');

const ResponseSchema = new mongoose.Schema({

    UserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref  :'User',
    }, 
    FormId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Form'
    },
    
    // Answers left
    
    TabSwitch : {
        type : Number,
    },
    Score : {
        type : Number
    }
})

module.exports = mongoose.model('Response', ResponseSchema);