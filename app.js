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

console.log('Creating the scheduleJob entries');

console.log('About to run : https://vbac.dal1a.cirrus.ibm.com/batchJobs/wakeup_slack_message.php');
var request = require('request');
request('https://vbac.dal1a.cirrus.ibm.com/batchJobs/wakeup_slack_message.php', function (error, response, body) {
    if (!error && response.statusCode == 200) {
    	console.log('wakeup message successful');
        console.log(body) // Print the google web page.
	} else {
		console.log('wakup message error');
		console.log(error);
		console.log(response);
		console.log(body);
     }
}) 

var pesB = schedule.scheduleJob({hour: 3, minute: 13, dayOfWeek: 0}, function(){
	console.log('About to run : https://vbac.dal1a.cirrus.ibm.com/batchJobs/pesRecheckNotification.php');
	var request = require('request');
	request('https://vbac.dal1a.cirrus.ibm.com/batchJobs/pesRecheckNotification.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('PES Recheck Successful');
			console.log(body) // Print the google web page.
		} else {
			console.log('PES Recheck Error');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	}) 
});
	
var pesC = schedule.scheduleJob({hour: 3, minute: 29}, function(){
	console.log('About to run : https://vbac.dal1a.cirrus.ibm.com/batchJobs/revalidate.php');
	var request = require('request');
	request('https://vbac.dal1a.cirrus.ibm.com/batchJobs/revalidate.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('PES Cleared Revalidation Successful');
			console.log(body) // Print the google web page.
		} else {
			console.log('PES Cleared Revalidation Error');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	}) 
});

var pesD = schedule.scheduleJob({hour: 4, minute: 30}, function(){
	console.log('About to run : https://vbac.dal1a.cirrus.ibm.com/batchJobs/updatePesFieldsFromUpes.php');
	var request = require('request');
	request('https://vbac.dal1a.cirrus.ibm.com/batchJobs/updatePesFieldsFromUpes.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('PES Update from UPES Successful');
			console.log(body) // Print the google web page.
		} else {
			console.log('PES Update from UPES Error');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	}) 
});

var l = schedule.scheduleJob({hour: 2, minute: 55}, function(){
	console.log('About to run : https://vbac.dal1a.cirrus.ibm.com/batchJobs/recheckPotentialLeavers.php');
	var request = require('request');
	request('https://vbac.dal1a.cirrus.ibm.com/batchJobs/recheckPotentialLeavers.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('Recheck Successful');
			console.log(body) // Print the google web page.
		} else {
			console.log('Recheck Error');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	}) 
});

/*
var m = schedule.scheduleJob({hour: 10, minute: 00, dayOfWeek: 5}, function(){
	console.log('About to run : https://vbac.dal1a.cirrus.ibm.com/batchJobs/ilcReminder.php');
	var request = require('request');
	request('https://vbac.dal1a.cirrus.ibm.com/batchJobs/ilcReminder.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('ilc Reminder Sent');
			console.log(body) // Print the google web page.
		} else {
			console.log('Error sending ilc Reminder');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	}) 
});
*/

var cbna = schedule.scheduleJob({month: 0, date: 15, hour:03, minute: 00 }, function(){
	console.log('About to run : https://vbac.dal1a.cirrus.ibm.com/batchJobs/sendCbnEmail.php');
	var request = require('request');
	request('https://vbac.dal1a.cirrus.ibm.com/batchJobs/sendCbnEmail.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('CBN Sent');
			console.log(body) // Print the google web page.
		} else {
			console.log('Error sending CBN');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	}) 
});

var cbnb = schedule.scheduleJob({month: 3, date: 15, hour:03, minute: 00 }, function(){
	console.log('About to run : https://vbac.dal1a.cirrus.ibm.com/batchJobs/sendCbnEmail.php');
	var request = require('request');
	request('https://vbac.dal1a.cirrus.ibm.com/batchJobs/sendCbnEmail.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('CBN Sent');
			console.log(body) // Print the google web page.
		} else {
			console.log('Error sending CBN');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	}) 
});

var cbnc = schedule.scheduleJob({month: 6, date: 15, hour:03, minute: 00 }, function(){
	console.log('About to run : https://vbac.dal1a.cirrus.ibm.com/batchJobs/sendCbnEmail.php');
	var request = require('request');
	request('https://vbac.dal1a.cirrus.ibm.com/batchJobs/sendCbnEmail.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('CBN Sent');
			console.log(body) // Print the google web page.
		} else {
			console.log('Error sending CBN');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	}) 
});

var cbnd = schedule.scheduleJob({month: 9, date: 15, hour:03, minute: 00 }, function(){
	console.log('About to run : https://vbac.dal1a.cirrus.ibm.com/batchJobs/sendCbnEmail.php');
	var request = require('request');
	request('https://vbac.dal1a.cirrus.ibm.com/batchJobs/sendCbnEmail.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('CBN Sent');
			console.log(body) // Print the google web page.
		} else {
			console.log('Error sending CBN');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	}) 
});

var l = schedule.scheduleJob('05 * * * *', function(){
	console.log('Heartbeat at ' + new Date());
});

var m = schedule.scheduleJob('35 * * * *', function(){
	console.log('Heartbeat at ' + new Date());
})

/*
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [1, new schedule.Range(2, 4)];
rule.hour = 11;
rule.minute = 30;
*/

/*
var rtb = schedule.scheduleJob(rule, function(){
	console.log('About to run : https://vbac.dal1a.cirrus.ibm.com/batchJobs/ilcReminder4RtbWintelOffshore.php');
	var request = require('request');
	request('https://vbac.dal1a.cirrus.ibm.com/batchJobs/ilcReminder4RtbWintelOffshore.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('Notification Sent');
			console.log(body) // Print the google web page.
		} else {
			console.log('Error sending notification');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	}) 
});
*/

/*
var rule2 = new schedule.RecurrenceRule();
rule2.dayOfWeek = [new schedule.Range(1, 5)];
rule2.hour = 09;
rule2.minute = 0;
*/

/*
var baudelt = schedule.scheduleJob(rule2, function(){
	console.log('About to run : https://vbac.dal1a.cirrus.ibm.com/batchJobs/baudelt_slack_message.php');
	var request = require('request');
	request('https://vbac.dal1a.cirrus.ibm.com/batchJobs/baudelt_slack_message.php', function (error, response, body) {
		//https://vbac.dal1a.cirrus.ibm.com/batchJobs
		//http://vbac.w3ibm.mybluemix.net/batchJobs
		if (!error && response.statusCode == 200) {
			console.log('Notification Sent');
			console.log(body) // Print the google web page.
		} else {
			console.log('Error sending notification');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	}) 
});
*/

var upesRevl = schedule.scheduleJob({hour: 04, minute: 27, dayOfWeek: 0}, function(){
	console.log('About to run : https://upes.dal1a.cirrus.ibm.com/batchJobs/revalidate.php'); // upes.dal1a.cirrus.ibm.com/
	var request = require('request');
	request('https://upes.dal1a.cirrus.ibm.com/batchJobs/revalidate.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('Reval Run');
			console.log(body) // Print the google web page.
		} else {
			console.log('Error sending CBN');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	}) 
});

var upesRechk = schedule.scheduleJob({hour: 04, minute: 57, dayOfWeek: 0}, function(){
	console.log('About to run : https://upes.dal1a.cirrus.ibm.com/batchJobs/pesRecheckNotification.php'); // upes.dal1a.cirrus.ibm.com/
	var request = require('request');
	request('https://upes.dal1a.cirrus.ibm.com/batchJobs/pesRecheckNotification.php', function (error, response, body) {
	if (!error && response.statusCode == 200) {
			console.log('Recheck Run');
			console.log(body) // Print the google web page.
		} else {
			console.log('Error running pesRecheckNotification.php');
			console.log(error);
			console.log(response);
			console.log(body);
		}
	}) 
});

var restAutoClose = schedule.scheduleJob({hour: 1, minute: 15}, function(){
	console.log('About to run REST Autoclose');
	var request = require('request');
	request('http://rest-2020.dal1a.cirrus.ibm.com/batchJobs/autoClose.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('Autoclose Run');
			console.log(body) // Print whatever came back.
		} else {
			console.log('Error running autoclose');
			// console.log(error);
			// console.log(response);
			console.log(body);
		}
	}) 
});

var restVBACActivePersons = schedule.scheduleJob({hour: 1, minute: 45}, function(){
	console.log('About to run REST loadVBACActivePersons');
	var request = require('request');
	request('http://rest-2020.dal1a.cirrus.ibm.com/batchJobs/loadVBACActiveResources.php', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('Load VBAC Active Persons');
			console.log(body) // Print whatever came back.
		} else {
			console.log('Error running loadVBACActivePersons');
			// console.log(error);
			// console.log(response);
			console.log(body);
		}
	}) 
});

console.log('scheduleJob entries created');

