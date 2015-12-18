'use strict';

var express = require('express'),
		config = require('configure'),
		app = express();

app.get('/unlock', function(req,res) {
	var sms = req.query;
	console.log(sms.Body);
	console.log(sms.From);
});

var port = Number(config.port);
app.listen(port, function(){
	console.log('The sh-1033 unlock server is now running on port '+port+'...');
});