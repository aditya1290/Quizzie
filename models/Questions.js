const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    
    Statement : {
        type : String,
    },
    QuestionType : {
        type : Number,
    },
    // Image : {

    // }
    Options : [{
        type : String
    }],
    CorrectAnswer : {
        type : "String"
    },
    PositiveMarks : {
        type : Number,
    }, 
    NegativeMArks : {
        type : Number,
    },
    SkippedMarks : {
        type : Number,
    },
    Required : {
        type : Boolean,
    }


})

module.exports = mongoose.model("Question", QuestionSchema);