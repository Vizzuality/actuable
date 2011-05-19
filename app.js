var fs = require('fs');
var geoip = require('geoip');
var nowjs = require("now");
var express = require('express');
var city = new geoip.City(__dirname + '/GeoLiteCity.dat'); 
var app = express.createServer();
var redis = 
app.get('/data', function(req, res){  
  city.lookup(req.param('ip'), function(err, data) {
      if (err) {console.log("unknown ip: " + req.param('ip'))}
      if (data) {
        everyone.now.distributeMessage(data.latitude + " " + data.longitude + " " + data.country_name + " " + JSON.stringify(data))
        console.log(data);
      }
  });
  
  res.send();//204
});


app.get('/', function(req, res){
  fs.readFile('helloworld.html', function(err, data){
    res.contentType('html');  
    res.send(data)
  });
});


app.listen(8080);



var everyone = nowjs.initialize(app);

everyone.connected(function(){
  console.log("Joined: " + this.now.name);
});


everyone.disconnected(function(){
  console.log("Left: " + this.now.name);
});

everyone.now.distributeMessage = function(message){everyone.now.receiveMessage(this.now.name, message);};
