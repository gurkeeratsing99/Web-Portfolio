const express =require("express");
const https = require("https");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
require('dotenv').config();


app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req,res){
  res.sendFile(__dirname+"/index.html");
  app.use(express.static(__dirname+"/"));

});

app.post("/send", function(req,res){

  const name= req.body.name;
  const email = req.body.email;
  const reply =  req.body.reply;
  if(res.statusCode!==200){
      res.sendFile(__dirname+"/index.html");
      console.log(res.statusCode);
  }
  else{  const transporter = nodemailer.createTransport({

        service : "hotmail",
        auth: {
          user: process.env.USN,
          pass: process.env.PASSWORD
        }


      });

      const options={
        from : process.env.USN,
        to :process.env.SENDUSERNAME,
        subject:"You got message from "+name+ ", Email address: "+email,
        text:reply
      };

      transporter.sendMail(options , function(err, info){
        if(err){
          console.log(err);
          return;
        }
        console.log("Sent : " + info.response);
        console.log(res.statusCode);
      });

  res.sendFile(__dirname+"/index.html");}


});

app.get("/send" , function(req, res){
  res.sendFile(__dirname+"/index.html");
  console.log("Thanks")
});

app.listen(process.env.PORT || 3000, function(){
  console.log("The server is running at 3000 port")
});
