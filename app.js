
const express = require('express');
const app = express();
const router = express.Router();

const path = __dirname + '/public/';
const port = 8080;

router.use(function (req, res, next) {
	console.log('/' + req.method);
	next();
});

router.get('/', function (req, res) {
	res.sendFile(path + 'index.html');
});

router.get('/subPage', function (req, res) {
	res.sendFile(path + 'subpage.html');
});

router.get('/db', function (req, res) {
	var sql = require("mssql");

	// config for your database
	var config = {
		user: 'kpesprd_db_admin',
		password: 'Ur90C{xKV+#-{7v',
		server: 'srv-kpes-sql-prod-wus3-001.database.windows.net',
		database: 'VBAC'
	};

	// connect to your database
	sql.connect(config, function (err) {

		if (err) console.log(err);

		// create Request object
		var request = new sql.Request();

		// query to the database and get the records
		request.query('select * from VBAC.TEST_TBL', function (err, recordset) {

			if (err) console.log(err)

			// send records as a response
			res.send(recordset);

		});
	});
});

app.use(express.static(path));
app.use('/', router);

app.listen(port, function () {
	console.log('UK Business Intelligence sample app 2 listening on port 8080!')
})