const express = require('express');
const db = require('./db.js');


db.getEmployees(1, function(rows) {
	employees = rows;
});

const app = express();

app.get('/employees', function (req,res) {
	res.send(employees);
	// body...
});

app.listen(8002, function () {
	// body...
	console.log('World API listening on port 8002...')
});