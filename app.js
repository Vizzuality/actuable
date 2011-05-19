var fs = require('fs');
var geoip = require('geoip');
var nowjs = require("now");
var express = require('express');
var city = new geoip.City(__dirname + '/GeoLiteCity.dat'); 
var app = express.createServer();
app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});


app.get('/data', function(req, res){  
  city.lookup(req.param('ip'), function(err, data) {
      if (err) {console.log("unknown ip: " + req.param('ip'))}
      if (data) {
        everyone.now.distributeLocation(data)
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
  console.log("Joined: " + this.user.id);
});


everyone.disconnected(function(){
  console.log("Left: " + this.user.id);
});

everyone.now.distributeLocation = function(loc){everyone.now.receiveLocation(loc);};
