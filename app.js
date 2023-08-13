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

/*
var testRule = new schedule.RecurrenceRule();
testRule.hour = [1,2,3,4,5,6,7,8,9,10,13,16,18,19,20,21,22,23];
testRule.minute = [0,10,20,30,40,50];

console.log(testRule);

var tm = schedule.scheduleJob(testRule, function(){
	console.log('About to run vBAC testEmail');
	var request = require('request');
	request('https://vbac.dal1a.cirrus.ibm.com/cdi_testMail.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('Test Email Sent');
			console.log(body); // Print the google web page.
		} else {
			console.log('Error sending Test Email');
			// console.log(error);
			// console.log(response);
			// console.log(body);
		}
	});
});
*/

var rule = new schedule.RecurrenceRule();
rule.hour = [7,10,13,16];
rule.minute = 0;

// temporarily run a following script from the UT
/*
var ed = schedule.scheduleJob(rule, function(){
	console.log('About to run vBAC employeeData');
	var today = new Date();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	console.log('Start time ' + time);
	var request = require('request');
	request('https://vbac-ut.dal1a.ciocloud.nonprod.intranet.ibm.com/batchJobs/sendEmplyeeData.php', function (error, response, body) {
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
*/

// temporarily run a following script from the UT
/*
var restSendRFSData = schedule.scheduleJob(rule, function(){
	console.log('About to run REST restSendRFSData');
	var today = new Date();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	console.log('Start time ' + time);
	var request = require('request');
	request('https://rest-2020-ut.dal1a.ciocloud.nonprod.intranet.ibm.com/batchJobs/sendRFSdata.php', function (error, response, body) {
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

// temporarily run a following script from the UT
/*
var restSendRRData = schedule.scheduleJob(rule, function(){
	console.log('About to run REST restSendRRData');
	var today = new Date();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	console.log('Start time ' + time);
	var request = require('request');
	request('https://rest-2020-ut.dal1a.ciocloud.nonprod.intranet.ibm.com/batchJobs/sendRRdata.php', function (error, response, body) {
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

// temporarily run a following script from the UT
/*
var restSendClaimData = schedule.scheduleJob(rule, function(){
	console.log('About to run REST restSendClaimData');
	var today = new Date();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	console.log('Start time ' + time);
	var request = require('request');
	request('https://rest-2020-ut.dal1a.ciocloud.nonprod.intranet.ibm.com/batchJobs/sendClaimDatadata.php', function (error, response, body) {
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

console.log('Creating the scheduleJob entries - Dev new test');

console.log('scheduleJob entries created');