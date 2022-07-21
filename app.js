const express =require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.use(loger);

app.get("/" , function(req,res){
  res.sendFile(__dirname+"/index.html");
  app.use(express.static(__dirname+"/"));

});

function loger(req,res,next){
  console.log("HIO");
  next();
}



app.post("/", function(req,res){
  const name= req.body.name;
  const email = req.body.email;
  const reply =  req.body.reply;
  const key = "17cef1a4f099548aeda90cdb450ef898-us10";
  const id = "469e229a40";
  const url =  "https://us10.api.mailchimp.com/3.0/lists/"+id;
  const details = {
    members:[
      {  email_address: email,
        status : "subscribed",
        merge_fields : {
              FNAME : name,
              TEXT : reply
      }
    }
  ]
  };
  var jData = JSON.stringify(details);

  const options = {
    method : "POST",
    auth: "gs:"+key
  };

const request = https.request(url , options , function(response){
  if(response.statuCode ===200){
    res.sendFile(__dirname+ "/objects/success.html");
  }
  else{
    res.sendFile(__dirname+"/objects/failure.html");
  }
  response.on("details",function(data){

  });
});
  request.write(jData);
  request.end();
});


app.listen(3000,function(){

});
