var fs = require('fs');
var express = require('express');

var app = express.createServer();
app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
    // app.use(express.static(__dirname + '/public'));
});


app.get('/', function(req, res){
  var ip_address = null;
  try {
    ip_address = req.connection.remoteAddress;
  }
  catch ( error ) {
    ip_address = "unknown";
  }
  res.contentType('html');
  console.log(req.connection.remoteAddress);  
  res.send("you asshole")
});

//app.listen(8080);


// var app = require('express').createServer();
// 
// app.get('/', function(req, res){
//   res.send('hello world');
// });

app.listen(8181);