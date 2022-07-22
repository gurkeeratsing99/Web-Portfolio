const express =require("express");
const https = require("https");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();


app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req,res){
  res.sendFile(__dirname+"/index.html");
  app.use(express.static(__dirname+"/"));

});

// app.post("/send", function(req,res){
//
//   const name= req.body.name;
//   const email = req.body.email;
//   const reply =  req.body.reply;
//
//   const transporter = nodemailer.createTransport({
//
//       service : "hotmail",
//       auth: {
//         user: "gs2422163@gmail.com",
//         pass: "Brarsingh=99"
//       }
//
//
//     });
//
//     const options={
//       from : "gs2422163@gmail.com",
//       to :"gurkeeratsingh99@gmail.com",
//       subject:"You got question from "+name+ ", Email address: "+email,
//       text:reply
//     };
//
//     transporter.sendMail(options , function(err, info){
//       if(err){
//         console.log(err);
//         return;
//       }
//       console.log("Sent : " + info.response);
//     });
//
// res.sendFile(__dirname+"/index.html");
//
// });

app.listen(process.env.PORT || 3000, function(){
  console.log("The server is running at 3000 port")
});
