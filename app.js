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
console.log('appEnv');
console.log(appEnv);

console.log('process.env');
console.log(process.env);

// define related application URLs
var vbac_url = process.env.vbac_url;
var rest_url = process.env.rest_url;
var kpes_url = process.env.kpes_url;

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
	// print a message when the server starts listening
	console.log("server starting on " + appEnv.url);
});

var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.hour = [7,10,13,16];
rule.minute = 0;

/*
* vBAC jobs
*/
var ed = schedule.scheduleJob(rule, function(){
	console.log('About to run vBAC employeeData');
	var today = new Date();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	console.log('Start time ' + time);
	var request = require('request');
	request(vbac_url + 'batchJobs/sendEmplyeeData.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('Send Employee Data extract');
			var today = new Date();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			console.log('Finish time ' + time);
			// console.log(body); // Print the google web page.
		} else {
			console.log('Error sending employeeData');
			console.log(error);
			console.log(response);
			// console.log(body);
		}
	});
});

/*
* REST jobs
*/
var restVBACActivePersons = schedule.scheduleJob({ hour: 1, minute: 45 }, function () {
	console.log('About to run REST loadVBACActivePersons');
	var request = require('request');
	request(rest_url + 'batchJobs/loadVBACActiveResources.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('Load VBAC Active Persons');
			console.log(body); // Print whatever came back.
		} else {
			console.log('Error running loadVBACActivePersons');
			// console.log(error);
			// console.log(response);
			console.log(body);
		}
	});
});

/*
var restSendRFSData = schedule.scheduleJob(rule, function(){
	console.log('About to run REST restSendRFSData');
	var today = new Date();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	console.log('Start time ' + time);
	var request = require('request');
	request(rest_url + 'batchJobs/sendRFSdata.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('Send RFS extract');
			var today = new Date();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			console.log('Finish time ' + time);
			// console.log(body); // Print whatever came back.
		} else {
			console.log('Error running restSendRFSData');
			console.log(error);
			console.log(response);
			// console.log(body);
		}
	});
});
*/

/*
var restSendRRData = schedule.scheduleJob(rule, function(){
	console.log('About to run REST restSendRRData');
	var today = new Date();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	console.log('Start time ' + time);
	var request = require('request');
	request(rest_url + 'batchJobs/sendRRdata.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('Send Resource Requests extract');
			var today = new Date();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			console.log('Finish time ' + time);
			// console.log(body); // Print whatever came back.
		} else {
			console.log('Error running restSendRRData');
			console.log(error);
			console.log(response);
			// console.log(body);
		}
	});
});
*/

/*
var restSendClaimData = schedule.scheduleJob(rule, function(){
	console.log('About to run REST restSendClaimData');
	var today = new Date();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	console.log('Start time ' + time);
	var request = require('request');
	request(rest_url + 'batchJobs/sendClaimDatadata.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('Send Claim Data extract');
			var today = new Date();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			console.log('Finish time ' + time);
			// console.log(body); // Print whatever came back.
		} else {
			console.log('Error running restSendClaimData');
			console.log(error);
			console.log(response);
			// console.log(body);
		}
	});
});
*/

/*
* kPES jobs
*/
// tool has been sunset

console.log('Creating the scheduleJob entries');
console.log('scheduleJob entries created');