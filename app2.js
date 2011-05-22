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



app.get('/', function(req, res){
  var ip_address = null;
  try {
    ip_address = req.headers['x-forwarded-for'];
  }
  catch ( error ) {
    ip_address = req.connection.remoteAddress;
  }
  res.contentType('html');  
  res.send(ip_address)
});
app.listen(8181);

