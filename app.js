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
/*
console.log('About to run vBAC wakeup_slack_message');
var request = require('request');
request(vbac_url + 'batchJobs/wakeup_slack_message.php', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		console.log('wakeup message successful');
		console.log(body); // Print the google web page.
	} else {
		console.log('wakup message error');
		console.log(error);
		console.log(response);
		console.log(body);
	}
});
*/

var l = schedule.scheduleJob({ hour: 2, minute: 55 }, function () {
	console.log('About to run vBAC recheckPotentialLeavers');
	var request = require('request');
	request(vbac_url + 'batchJobs/recheckPotentialLeavers.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('Recheck Successful');
			console.log(body); // Print the google web page.
		} else {
			console.log('Recheck Error');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	});
});

var pesB = schedule.scheduleJob({ hour: 3, minute: 13, dayOfWeek: 0 }, function () {
	console.log('About to run vBAC pesRecheckNotification');
	var request = require('request');
	request(vbac_url + 'batchJobs/pesRecheckNotification.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('PES Recheck Successful');
			console.log(body); // Print the google web page.
		} else {
			console.log('PES Recheck Error');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	});
});

var r = schedule.scheduleJob({ hour: 3, minute: 29 }, function () {
	console.log('About to run vBAC revalidate');
	var request = require('request');
	request(vbac_url + 'batchJobs/revalidate.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('PES Cleared Revalidation Successful');
			console.log(body); // Print the google web page.
		} else {
			console.log('PES Cleared Revalidation Error');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	});
});

var updUPES = schedule.scheduleJob({ hour: 4, minute: 30 }, function () {
	console.log('About to run vBAC updatePesFieldsFromUpes');
	var request = require('request');
	request(vbac_url + 'batchJobs/updatePesFieldsFromUpes.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('PES Update from UPES Successful');
			console.log(body); // Print the google web page.
		} else {
			console.log('PES Update from UPES Error');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	});
});

var updKPES = schedule.scheduleJob({ hour: 5, minute: 01 }, function () {
	console.log('About to run vBAC updatePesFieldsFromUpesKyndryl');
	var request = require('request');
	request(vbac_url + 'batchJobs/updatePesFieldsFromUpesKyndryl.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('PES Update from KPES Successful');
			console.log(body); // Print the google web page.
		} else {
			console.log('PES Update from KPES Error');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	});
});

var updWorkerAPI = schedule.scheduleJob({ hour: 5, minute: 30 }, function () {
	console.log('About to run vBAC updateWorkerIdField');
	var request = require('request');
	request(vbac_url + 'batchJobs/updateWorkerIdField.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('Worker ID Update from Worker API Successful');
			console.log(body); // Print the google web page.
		} else {
			console.log('Worker ID Update from Worker API Error');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	});
});

/*
var ilc = schedule.scheduleJob({hour: 10, minute: 00, dayOfWeek: 5}, function(){
	console.log('About to run vBAC ilcReminder');
	var request = require('request');
	request(vbac_url + 'batchJobs/ilcReminder.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('ilc Reminder Sent');
			console.log(body); // Print the google web page.
		} else {
			console.log('Error sending ilc Reminder');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	});
});
*/

var cbna = schedule.scheduleJob({ month: 0, date: 15, hour:03, minute: 01 }, function () {
	console.log('About to run vBAC sendCbnEmail');
	var request = require('request');
	request(vbac_url + 'batchJobs/sendCbnEmail.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('CBN Sent');
			console.log(body); // Print the google web page.
		} else {
			console.log('Error sending CBN');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	});
});

var cbnb = schedule.scheduleJob({ month: 3, date: 15, hour:03, minute: 01 }, function () {
	console.log('About to run vBAC sendCbnEmail');
	var request = require('request');
	request(vbac_url + 'batchJobs/sendCbnEmail.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('CBN Sent');
			console.log(body); // Print the google web page.
		} else {
			console.log('Error sending CBN');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	});
});

var cbnc = schedule.scheduleJob({ month: 6, date: 15, hour:03, minute: 01 }, function () {
	console.log('About to run vBAC sendCbnEmail');
	var request = require('request');
	request(vbac_url + 'batchJobs/sendCbnEmail.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('CBN Sent');
			console.log(body); // Print the google web page.
		} else {
			console.log('Error sending CBN');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	});
});

var cbnd = schedule.scheduleJob({ month: 9, date: 15, hour:03, minute: 01 }, function () {
	console.log('About to run vBAC sendCbnEmail');
	var request = require('request');
	request(vbac_url + 'batchJobs/sendCbnEmail.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('CBN Sent');
			console.log(body); // Print the google web page.
		} else {
			console.log('Error sending CBN');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	});
});

var ed = schedule.scheduleJob(rule, function(){
	console.log('About to run vBAC employeeData');
	var today = new Date();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	console.log('Start time ' + time);
	var request = require('request');
	request(vbac_url + 'batchJobs/sendEmployeeData.php', function (error, response, body) {
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

var ecd = schedule.scheduleJob(rule, function(){
	console.log('About to run vBAC employeeCompleteData');
	var today = new Date();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	console.log('Start time ' + time);
	var request = require('request');
	request(vbac_url + 'batchJobs/sendEmployeeCompleteData.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('Send Employee Complete Data extract');
			var today = new Date();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			console.log('Finish time ' + time);
			// console.log(body); // Print the google web page.
		} else {
			console.log('Error sending employeeCompleteData');
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

var restAutoClose = schedule.scheduleJob({ hour: 1, minute: 15 }, function () {
	console.log('About to run REST Autoclose');
	var request = require('request');
	request(rest_url + 'batchJobs/autoClose.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('Autoclose Run');
			console.log(body); // Print whatever came back.
		} else {
			console.log('Error running autoclose');
			// console.log(error);
			// console.log(response);
			console.log(body);
		}
	});
});

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

var restSendVBACClaimData = schedule.scheduleJob(rule, function(){
	console.log('About to run REST restSendVBACClaimData');
	var today = new Date();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	console.log('Start time ' + time);
	var request = require('request');
	request(rest_url + 'batchJobs/sendVBACClaimDatadata.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('Send vBAC Claim Data extract');
			var today = new Date();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			console.log('Finish time ' + time);
			// console.log(body); // Print whatever came back.
		} else {
			console.log('Error running restSendVBACClaimData');
			console.log(error);
			console.log(response);
			// console.log(body);
		}
	});
});

/*
* kPES jobs
*/
// tool has been sunset

console.log('Creating the scheduleJob entries');
console.log('scheduleJob entries created');