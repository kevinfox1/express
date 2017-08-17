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

exports.getEmployeeDepartments = function(callback)
{
		db.query("SELECT * FROM employee NATURAL JOIN employee_department NATURAL JOIN department",
			[],
			function(err, rows){
				if(err) throw err;
				callback(rows);
			});
}

//get All employees
exports.getEmployees = function(id, callback)
{
		db.query("SELECT employee_id AS id, fname as firstName, lname AS lastName, street AS address, town, postcode, iban, nin, salary FROM employee",
			[],
			function(err, rows){
				if(err) throw err;
				callback(rows);
			});
}

//get All Departments
exports.getDepartment = function(callback)
{
		db.query("SELECT department_id, name FROM department",
			[],
			function(err, rows){
				if(err) throw err;
				callback(rows);
			});
}

//insert new employee
exports.insertEmployee = function (firstName, lastName, address, town, postcode, iban, nin, salary, callback)
{
    db.query(
        "INSERT INTO employee (fname, lname, street, town, postcode, iban, nin, salary) " +
        "VALUES (?,?,?,?,?,?,?,?)",
        [firstName, lastName, address, town, postcode, iban, nin, salary],
        function(err){
            if(err) throw err;
            callback("Insert Employee successful.");
        }
    );
};