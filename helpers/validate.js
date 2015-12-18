'use strict';

var config = require('configure'),
		moment = require('moment'),
		timezone = require('timezonedb-node')(config.timezonedb.key);

function getCurrentTime() {
	timezone.getTimeZoneData({
		zone: config.timezonedb.timezone
	}, function(err,data){
		if (!err) {
			return data.timestamp;
		} else {
			console.error(err);
		}
	});
}

var validate = function (smsPhone, smsMessage) {

	var valid = false;
	var passwordUsed = "";

	// Check if a password key is present in message
	for (var password in config.passwords) {
		if (smsMessage.indexOf(password) !== -1) {
			valid = true;
			passwordUsed = password;
			break;
		}
	}

	// Check if 
	if (config.passwords[passwordUsed].whitelist) {
		var whitelist = config.passwords[passwordUsed].whitelist;
		var twilioNumber = smsPhone.replace(/\D/g,'').slice(-10);
		for (var phone in whitelist) {
			var passwordPhone = phone.replace(/\D/g,'').slice(-10);
			if (passwordPhone === twilioNumber) {
				valid = true;
				return valid;
			}
		}
	}

	if (config.passwords[passwordUsed].partyWindow) {
		var partyWindow = config.passwords[passwordUsed].partyWindow;
		
	}


	

	// Check if whitelist key exists for phone number
		// If exists, return valid as true
		// If does not exist, continue validations

	// Check if date/time window exists for password	 
		// If exists return valid as true


	// Checks: 
		// Phone number
		// Password in message
		// If password requires date/time validation
			// Get current time
			// Validate current time vs accepted time for password
	return valid;
};

module.exports.isValid = validate;