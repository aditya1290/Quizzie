const mongoose = require('mongoose');
const User = require('./users');
const Section = require('./Section');
const ParentResponse = require('./ParentResponse');

const FormSchema = new mongoose.Schema({

    UserID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    Name : {
        type : String,
    },
    Title : {
        type : String, 
        default : 'Untitled Form',
    },
    Description : {
        type : String,
    }, 
    Rules : [{
        type : String,
    }],
    DateCreated : {
        type:Date,
        default : Date.now
    },
    Public : {
        type:Boolean,
        default : true,
    },
    Open : {
        type : Boolean,
        default : true,
    },

    ShareLink : {
        type : String,
    },
    ResponsesID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ParentResponse',
    },
    InviteList : [{
        type : String,
    }],
    
    Quiz : {
        type : Boolean,
        default : false,
    },
    NecessarySection : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Section'
    },
    SectionCount : {
        type : Number, 
        default : 1,
    }, 
    Sections : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Section',
    }],
});

module.exports = mongoose.model('Form', FormSchema);