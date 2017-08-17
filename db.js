const mysql = require('mysql');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'employee'
});

db.connect(function(err) {
	if(err) throw err;
	console.log("Connected to MySql");
});

exports.getEmployees = function(id, callback)
	{
		db.query("SELECT employee_id AS id, fname as firstName, lname AS lastName, street AS address, town, postcode, iban, nin, salary FROM employee WHERE employee_id = ?",
			[id],
			function(err, rows){
				if(err) throw err;
				callback(rows);
			});
	}