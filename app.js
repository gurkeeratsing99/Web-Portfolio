require('dotenv').config();

const express =require("express");
const https = require("https");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const multer  = require('multer');

const app = express();

const fileStorageEngine =  multer.diskStorage({ //creating middleware for multer
    destination: (req, file,cb)=>{ //Storing the file in Server side folder Named uploads
      cb(null, "./uploads")
    },
    filename:(req,file,cb)=>{
      cb(null, file.originalname)
    }
});

const upload = multer({ storage: fileStorageEngine });


app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req,res){
  res.sendFile(__dirname+"/index.html");
  app.use(express.static(__dirname+"/"));

});

app.post("/send",upload.single('fileAttachment'), function(req,res){ //Using upload middleware

  const name= req.body.name;
  const email = req.body.email;
  const reply =  req.body.reply;
  const fileP = req.file.path;
  const fileN = req.file.originalname;
  //console.log("File attachment name : "+req.file.originalname);
  if(res.statusCode!==200){
      res.sendFile(__dirname+"/index.html");
      //console.log(res.statusCode);
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
        text:reply,
        attachments:[{
          filename: fileN,
          path:__dirname+"/"+fileP
        }

        ]
      };

      transporter.sendMail(options , function(err, info){
        if(err){
          console.log(err);
          return;
        }
        //console.log("Sent : " + info.response);
        //console.log(res.statusCode);
      });

  res.redirect("/index.html");
}


});

app.get("/send" , function(req, res){
  res.sendFile(__dirname+"/index.html");
  //console.log("Thanks")
});

app.listen(process.env.PORT || 3000, function(){
  console.log("The server is running at 3000 port")
});
