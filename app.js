'use strict';

var express = require('express'),
		config = require('configure'),
		twilio = require('twilio');

var validate = require('./helpers/validate'),
		buzzer = require('./helpers/buzzer');

var app = express();


app.get('/unlock', function(req, res){

	if (validate.isValid(req.query.From, req.query.Body)) {
		console.log("Message received from: " + req.query.From + " || " + req.query.Body);
	} else {
		console.log("Invalid request");
	}

	res.end();

});

app.get('*', function(req,res){
	console.log("Invalid request received");
	res.status(404).end();
});

app.listen(Number(config.port), function(){
	console.log('The ' + config.serverName + ' unlock server is now running on port ' + Number(config.port) + '...');
}); 