'use strict';

var express = require('express');

var app = express();

app.get('/unlock', function(req,res) {
	console.log('Someone sent a request');
});

app.listen('5000');