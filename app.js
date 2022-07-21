const express =require("express");
const https = require("https");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();


app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req,res){
  res.sendFile(__dirname+"/index.html");
  app.use(express.static(__dirname+"/"));

});

app.post("/send", function(req,res){

  const name= req.body.name;
  const email = req.body.email;
  const reply =  req.body.reply;

  const transporter = nodemailer.createTransport({

      service : "hotmail",
      auth: {
        user: "gs2422163@gmail.com",
        pass: "Brarsingh=99"
      }


    });

    const options={
      from : "gs2422163@gmail.com",
      to :"gurkeeratsingh99@gmail.com",
      subject:"You got question from "+name+ ", Email address: "+email,
      text:reply
    };

    transporter.sendMail(options , function(err, info){
      if(err){
        console.log(err);
        return;
      }
      console.log("Sent : " + info.response);
    });

res.sendFile(__dirname+"/index.html");
  // console.log(req.body);
  //
  // const name= req.body.name;
  // const email = req.body.email;
  // const reply =  req.body.reply;
  // async function main() {
  //   // Generate test SMTP service account from ethereal.email
  //   // Only needed if you don't have a real mail account for testing
  //   let testAccount = await nodemailer.createTestAccount();
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: "gs2422163@gmail.com", // generated ethereal user
  //     pass: "Brarsingh=99", // generated ethereal password
  //   },
  //   tls:{
  //     rejectUnauothorized:false
  //   }
  // });
  //
  // // send mail with defined transport object
  // let info = await transporter.sendMail({
  //   from: '"name" <gurkeeratsingh99@gmail>', // sender address
  //   to: "gs2422163@gmail.com", // list of receivers
  //   subject: "Hello ✔", // Subject line
  //   text: "Hello", // plain text body
  //   html: reply, // html body
  // });
  //
  // console.log("Message sent: %s", info.messageId);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  //
  // res.render("name",{msg :"Email Sent"});

});

app.listen(3000,function(){});
