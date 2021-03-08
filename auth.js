const express = require('express');
const Users = require('./models/users');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');
const Router = express.Router();




Router.post('/logincheck', async(req,res)=>{
    console.log("hefgchg");
    let email = req.body.Email.toLowerCase();

    const userExists = await Users.findOne({Email  : email});
    if(userExists)
    {
        const pass = await bcrypt.compare(req.body.Password, userExists.Password);
        if(pass)
        {
            return res.json({'Correct' : 1});
        }
        else
        {
            return res.json({'Correct' : 0});
        }

    }
    else
    {
        return res.json({'Correct' : 0});
    }

});

Router.post('/registercheck', async(req,res)=>{
    let email = req.body.Email.toLowerCase();
    const userExists = await Users.findOne({Email : email});
    if(userExists)
    {
        return res.json({'Correct' : 0});
    }
    else
    {
        return res.json({'Correct' : 1});
    }
})


Router.post('/login', async(req,res)=>{    

    let email = req.body.Email.toLowerCase();
    const userexists= await Users.findOne({Email : email});

    if(userexists)
    {
        
        const validPass = await bcrypt.compare(req.body.Password, userexists.Password);

        if(!validPass)
        {
            res.redirect('../');
        }
        else
        {
            console.log('hello in');
            res.cookie('FormUserCurrent', userexists._id);
            res.redirect('../Dashboard');
        }
    }
    else
    {
        res.redirect('../');
    }
});

Router.post('/register', async(req,res)=>{

    const users = await Users.findOne({Email : req.body.Email.toLowerCase()});
    if(users != null)
    {
        console.log("User found");
        res.redirect('../');
    }
    else
    {
        const salt = await bcrypt.genSalt(11);
        const hashPass = await bcrypt.hash(req.body.Password, salt);
        const addUser = new Users({Name : req.body.Name, Email : req.body.Email.toLowerCase(), Password : hashPass});
        try {
            const newUser = await addUser.save();
            
            res.redirect('../');
        } catch (error) {
            res.render('/error');
        }
    }
})

Router.get('/logout', async(req,res)=>{

    res.clearCookie('FormUserCurrent');
    console.log('hello out');
    res.redirect('../');
})



Router.post('/forgetPass', async(req,res)=>{

    const email = req.body.Email.toLowerCase();
    const UserExists = await Users.findOne({Email : email});
    
    console.log(email);
    if(UserExists)
    {

        // Send mail mechanism
        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth:{
                user:'flutterbuddymedium@gmail.com',
                pass:'<include>'
            }
        });

        const newPass = randomstring.generate({
            length:12,
            charset:'alphabetic'
        });
        const salt = await bcrypt.genSalt(11);
        const newPassHash = await bcrypt.hash(newPass, salt);

        console.log(newPass);
        //Send mail
        var mailOptions = {
            from : 'flutterbuddymedium@gmail.com',
            to : email,
            subject : 'Quizzie | Your new Password',
            text : `Hi User, thank you for using Quizzie. Here is your new Password. 
            Password : `+newPass,
        }

        try {
            await transporter.sendMail(mailOptions);
            await Users.findOneAndUpdate({_id : UserExists._id}, {Password : newPassHash});
            return res.json({"Correct" : 1});

        } catch (error) {
            console.log(error);
            return res.json({"Correct" : 0});
        }
        
    }
    else
    {
        return res.json({"Correct" : 0});
    }
})

module.exports =  Router;