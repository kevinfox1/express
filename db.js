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

//get Employees and their Departments' - USER STORY 2
exports.getEmployeeDepartments = function(callback)
{
		db.query("SELECT * FROM employee NATURAL JOIN employee_department NATURAL JOIN department",
			[],
			function(err, rows){
				if(err) throw err;
				callback(rows);
			});
}

exports.getEmployeeDepartmentById = function(id, callback)
{
		db.query("SELECT employee.employee_id AS id, employee.fname as firstName, employee.lname AS lastName, employee.street AS address, employee.town AS town, employee.postcode AS postcode, employee.iban AS iban, employee.nin AS nin, employee.salary AS salary FROM employee NATURAL JOIN employee_department NATURAL JOIN department WHERE department.department_id = ?",
			[id],
			function(err, rows){
				if(err) throw err;
				callback(rows);
			});
}

//get All employees - USER STORY 1
exports.getEmployees = function(callback)
{
		db.query("SELECT employee_id AS id, fname as firstName, lname AS lastName, street AS address, town, postcode, iban, nin, salary FROM employee",
			[],
			function(err, rows){
				if(err) throw err;
				callback(rows);
			});
}

//get All Departments - USER STORY 2
exports.getDepartment = function(callback)
{
		db.query("SELECT department_id AS id, name FROM department",
			[],
			function(err, rows){
				if(err) throw err;
				callback(rows);
			});
}

//insert new employee - USER STORY 1
exports.insertEmployee = function (firstName, lastName, address, town, postcode, iban, nin, salary, callback)
{
    db.query(
        "INSERT INTO employee (fname, lname, street, town, postcode, iban, nin, salary) " +
        "VALUES (?,?,?,?,?,?,?,?)",
        [firstName, lastName, address, town, postcode, iban, nin, salary],
        function(err){
            if(err) throw err;
            callback(true);
        }
    );
};

//insert sales employee - USER STORY 3
exports.insertSalesEmployee = function (id, commission, total_sales)
{
    db.query(
        "INSERT INTO sales_employee (employee_id, commission, total_sales) " +
        "VALUES (?,?,?)",
        [id, commission, total_sales],
        function(err){
            if(err) throw err;
            callback("Insert Sales Employee Successful.");
        }
    );
};

//get All employees Net Pay - USER STORY 4
exports.getEmployeesNetPay = function(callback)
{
		db.query("SELECT employee_id AS id, fname AS firstName, lname AS lastName, street AS address, town, postcode, iban, nin, ((salary/12)* 0.25) AS net_pay FROM employee",
			[],
			function(err, rows){
				if(err) throw err;
				callback(rows);
			});
};

//SELECT fname, lname
//FROM employee NATURAL JOIN sales_employee
//WHERE total_sales = (SELECT max(total_sales) FROM employee NATURAL JOIN sales_employee);


//USER STORY 5
exports.getTopSalesEmployee = function(callback)
{
		db.query("SELECT employee_id AS id, fname AS firstName, lname AS lastName, street AS address, town, postcode, iban, nin, " +
			" salary FROM employee NATURAL JOIN sales_employee WHERE total_sales = (SELECT max(total_sales) FROM employee NATURAL JOIN sales_employee)",
			[],
			function(err, rows){
				if(err) throw err;
				callback(rows);
			});
};
