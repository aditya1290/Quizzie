const express = require('express');
const path = require('path');
const bp = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const cp = require('cookie-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const methodOverride = require('method-override');
const port = process.env.PORT || 4500;
const auth = require('./auth.js');
const Users = require('./models/users');
const Form = require('./models/Form.js');


const app = express();


// Env file config
dotenv.config();

// Mongoose connect
mongoose.connect(process.env.MONGOS,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connnected to DB')
)




// Cookie parser to store data in cookies, express sessions and bodyparser
app.use(cp());
app.use(bp.urlencoded({ extended: true }));


// Setting EJS 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Making public folder
app.use(express.static(path.join(__dirname + '/public')));




// Routes Routes everywhere.
app.get('/', async(req,res)=>{

    if(req.cookies['FormUserCurrent']!=null)
    {
        const storedID = req.cookies['FormUserCurrent'];
        const UserExists = Users.findOne({_id : storedID});
        if(UserExists)
        {
            res.redirect('/Dashboard');
        }
        else
        {
            res.render('LandingPage/LandingPage.ejs');
        }
    }
    else
    {
        res.render('LandingPage/LandingPage.ejs');
    }
});

app.use('/auth', auth);

app.get('/Dashboard', async(req,res)=>{


    if(!req.cookies['FormUserCurrent'])
    {
        res.redirect('/');
    }
    const userExists = await Users.findOne({_id : req.cookies['FormUserCurrent']});



    res.render('Dashboard/Dashboard.ejs', {USER : userExists});
});

app.get('/CreateNewForm', async(req,res)=>{

    const user = await Users.findOne({_id : req.cookies['FormUserCurrent']});
    if(!user){res.redirect('/')};

    const newForm = new Form({UserID : user._id});
    try {
        const formSaved = await newForm.save();
        res.render('FormCreate/FormBasic.ejs', {formID : formSaved._id });
    } catch (error) {
        console.log(error)
        res.redirect('/');
    }

    


})


app.listen(port, ()=>{
    console.log("server");
});