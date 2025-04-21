//requiring dependencies//
const express = require('express')
const mongoose = require('mongoose')
const Code = require('./modules/VcodeModules')
const User = require('./modules/usermodules')
//
//app config//
const app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.set('view engine', 'ejs')
//

//connecting to and starting server...//
const DBURL ='mongodb+srv://cryptoairdrop20023:uhHN7vvAsJkr8qyQ@mzcluster.bty3en4.mongodb.net/?retryWrites=true&w=majority&appName=MZcluster'
mongoose.connect(DBURL)
.then(result=>{
      console.log('connected.')
      app.listen(3000, ()=>{
        console.log('listening at 3000')
      })
})
.catch(err=>{
    console.log(err)
})
//

//setting up basic routes//

//logged in user info :
var loggedUser 
//

app.get('/', (req,res)=>{
    res.render('../views/loggedOutViews/index.ejs')
})

 app.get('/sign-up', (req,res)=>{
    res.render('../views/loggedOutViews/signUp.ejs')
 })
  var userInput

 app.post('/sign-up', (req,res)=>{
  userInput= req.body
    res.redirect('/sign-up/email-auth1')
 })
  var Vcode
 app.get('/sign-up/email-auth1', (req,res)=>{
     if(userInput){
      Vcode= Math.floor(Math.random() *100000 + 1)
      setTimeout(()=>{
              Vcode = 0
      },600000)
      console.log(Vcode)
      res.render('../views/loggedOutViews/emailConfirm.ejs')
      var nodemailer = require('nodemailer');

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        tls :{
            rejectUnauthorized : false
        },
        auth: {
          user: 'cryptoairdrop20023@gmail.com',
          pass: 'obnqiwwagmqioxpx'
        }
      });
      
      var mailOptions = {
        from: 'cryptoairdrop20023@gmail.com',
        to: userInput.email,
        subject: 'MZ clothing email confirmation ',
        text: 'welcome to mz clothing online store, use this code to complete your email verification process : ' + Vcode+ '. code is valid for only 10 minutes'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
     }else{
      res.redirect('/sign-up')
     }
 });

 app.post('/sign-up/email-auth1', (req,res)=>{
       if(Vcode == req.body.code){
        const user= new User({
            firstname: userInput.firstname,
            secondname: userInput.secondname,
            email: userInput.email,
            password: userInput.password
        })

        user.save()
        .then(result=>{
             console.log(result)
        })
        .catch(err=>{
          console.log(err)
        })

           loggedUser=userInput
        res.redirect('/home')
     
       }else{
        console.log('wrong code')
       }
 });

 app.get('/log-in',(req,res)=>{
     res.render('../views/loggedOutViews/logIn.ejs')
 })

//