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

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});



var schedule = require('node-schedule');


var j = schedule.scheduleJob({hour: 2, minute: 46, dayOfWeek: 0}, function(){
  console.log('About to run : vbac-ut.w3ibm.mybluemix.net/batchJobs/revalidate.php');
		var request = require('request');
		request('http://vbac-ut.w3ibm.mybluemix.net/batchJobs/revalidate.php', function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		    	console.log('Revalidation Successful');
		        console.log(body) // Print the google web page.
		     } else {
		    	 console.log('Revalidation Error');
		    	 console.log(error);
		    	 console.log(response);
		    	 console.log(body);
		     }
		}) 
});

var k = schedule.scheduleJob({hour: 3, minute: 46, dayOfWeek: 0}, function(){
	  console.log('About to run : vbac.w3ibm.mybluemix.net/batchJobs/revalidate.php');
			var request = require('request');
			request('http://vbac.w3ibm.mybluemix.net/batchJobs/revalidate.php', function (error, response, body) {
			    if (!error && response.statusCode == 200) {
			    	console.log('Revalidation Successful');
			        console.log(body) // Print the google web page.
			     } else {
			    	 console.log('Revalidation Error');
			    	 console.log(error);
			    	 console.log(response);
			    	 console.log(body);
			     }
			}) 
	});

var l = schedule.scheduleJob({hour: 2, minute: 55, dayOfWeek: 1}, function(){
	  console.log('About to run : vbac.w3ibm.mybluemix.net/batchJobs/recheckPotentialLeavers.php');
			var request = require('request');
			request('http://vbac.w3ibm.mybluemix.net/batchJobs/recheckPotentialLeavers.php', function (error, response, body) {
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


var m = schedule.scheduleJob({hour: 10, minute: 00, dayOfWeek: 5}, function(){
	  console.log('About to run : vbac.w3ibm.mybluemix.net/batchJobs/ilcReminder.php');
			var request = require('request');
			request('http://vbac.w3ibm.mybluemix.net/batchJobs/ilcReminder.php', function (error, response, body) {
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

var cbna = schedule.scheduleJob({month: 1, dayOfMonth: 15, hour:03, minute: 00 }, function(){
	  console.log('About to run : vbac.w3ibm.mybluemix.net/batchJobs/sendCbnEmail.php');
			var request = require('request');
			request('http://vbac.w3ibm.mybluemix.net/batchJobs/sendCbnEmail.php', function (error, response, body) {
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


var cbnb = schedule.scheduleJob({month: 4, dayOfMonth: 15, hour:03, minute: 00 }, function(){
	  console.log('About to run : vbac.w3ibm.mybluemix.net/batchJobs/sendCbnEmail.php');
			var request = require('request');
			request('http://vbac.w3ibm.mybluemix.net/batchJobs/sendCbnEmail.php', function (error, response, body) {
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


var cbnc = schedule.scheduleJob({month: 7, dayOfMonth: 15, hour:03, minute: 00 }, function(){
	  console.log('About to run : vbac.w3ibm.mybluemix.net/batchJobs/sendCbnEmail.php');
			var request = require('request');
			request('http://vbac.w3ibm.mybluemix.net/batchJobs/sendCbnEmail.php', function (error, response, body) {
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

var cbnd = schedule.scheduleJob({month: 10, dayOfMonth: 15, hour:03, minute: 00 }, function(){
	  console.log('About to run : vbac.w3ibm.mybluemix.net/batchJobs/sendCbnEmail.php');
			var request = require('request');
			request('http://vbac.w3ibm.mybluemix.net/batchJobs/sendCbnEmail.php', function (error, response, body) {
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


var cbnt = schedule.scheduleJob({month: 01, dayOfMonth: 18, hour:02, minute: 30 }, function(){
	  console.log('About to run : vbac.w3ibm.mybluemix.net/batchJobs/sendCbnEmail.php');
			var request = require('request');
			request('http://vbac.w3ibm.mybluemix.net/batchJobs/sendCbnEmail.php', function (error, response, body) {
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




//var l = schedule.scheduleJob('05 * * * *', function(){
//		console.log('Heartbeat at ' + new Date());
//	
//	});
//
//var m = schedule.scheduleJob('35 * * * *', function(){
//	console.log('Heartbeat at ' + new Date());
//
//});

