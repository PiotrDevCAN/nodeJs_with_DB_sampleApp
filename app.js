/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();
app.get('/', (req, res) => {
  res.send('CDI Scheduler App');
});

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
//console.log(appEnv);
//
//console.log(process.env);

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
	// print a message when the server starts listening
	console.log("server starting on " + appEnv.url);
});

var schedule = require('node-schedule');

var testRule = new schedule.RecurrenceRule();
testRule.hour = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
testRule.minute = [0,10,20,30,40,50];

console.log(testRule);

try {
	var km = schedule.scheduleJob(testRule, function(){
		console.log('About to run kPES testEmail');
		var request = require('request');
		request('https://kpes-dev.zkpw3uspriv.app.kyndryl.net/batchJobs/testEmail.php', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log('kPES - Test Email Sent');
				console.log(body); // Print the google web page.
			} else {
				console.log('Error sending Test Email - kPES');
				console.log(error);
				console.log(response);
				console.log(body);
			}
		});
	});
} catch (error) {
	console.error(error);
	// Expected output: ReferenceError: nonExistentFunction is not defined
	// (Note: the exact output may be browser-dependent)
}

try {
	var vm = schedule.scheduleJob(testRule, function(){
		console.log('About to run vBAC testEmail');
		var request = require('request');
		request('https://vbac-dev.zkpw3uspriv.app.kyndryl.net/batchJobs/testEmail.php', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log('vBAC - Test Email Sent');
				console.log(body); // Print the google web page.
			} else {
				console.log('Error sending Test Email - vBAC');
				console.log(error);
				console.log(response);
				console.log(body);
			}
		});
	});
} catch (error) {
	console.error(error);
	// Expected output: ReferenceError: nonExistentFunction is not defined
	// (Note: the exact output may be browser-dependent)
}

try {
	var rm = schedule.scheduleJob(testRule, function(){
		console.log('About to run REST testEmail');
		var request = require('request');
		request('https://rest-dev.zkpw3uspriv.app.kyndryl.net/batchJobs/testEmail.php', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log('REST - Test Email Sent');
				console.log(body); // Print the google web page.
			} else {
				console.log('Error sending Test Email - REST');
				console.log(error);
				console.log(response);
				console.log(body);
			}
		});
	});
} catch (error) {
	console.error(error);
	// Expected output: ReferenceError: nonExistentFunction is not defined
	// (Note: the exact output may be browser-dependent)
}

console.log('Creating the scheduleJob entries - ARO Dev');

console.log('scheduleJob entries created');