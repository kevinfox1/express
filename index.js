const express = require('express');
const db = require('./db.js');
const app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());


//USER STORY 1
/*db.getEmployees(function(rows) {
	employees = rows;
});*/

//Get All Employees
app.get('/employees', function (req,res) {
    console.log('In Get Employees');
	db.getEmployees(function(rows) {
        res.send(rows)
    });
	// body...
});

//Insert New Employee
app.post('/employee', function(req, res){
    console.log('In Inserting new Employee');
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const address = req.body.address;
    const town = req.body.town;
    const postcode = req.body.postcode;
    const iban = req.body.iban;
    const nin = req.body.nin;
    var salary = req.body.salary;
    console.log('Salary is ' + salary);
    salary = parseInt(salary);
    console.log('Parsed int ' + salary);

    if(firstName && lastName && address && town && postcode && iban && nin && salary){
        db.insertEmployee(firstName, lastName, address, town, postcode, iban, nin, salary, function(message){
            res.send(message);
        });
    }
});

//USER STORY 2
db.getEmployeeDepartments(function(rows) {
	employeeDepartments = rows;
});

db.getDepartment(function(rows) {
	departments = rows;
});

//Get Employee departments
app.post('/employeeDepartment', function (req,res) {
	console.log('Entered');
	const id = parseInt(req.body.id);
	console.log('Id is ' + id);
	db.getEmployeeDepartmentById(id, function(rows) {
		res.send(rows);
        console.log('Request processed: ');
	});
});

//Get Departments
app.get('/department', function (req,res) {
	res.send(departments);
	// body...
});

//Insert New Sales Employee - USER STORY 3
app.post('/salesemployee', function(req, res){
    const id = parseInt(req.body.id);
    const commission = parseFloat(req.body.commission);
    const total_sales = parseInt(req.body.total_sales);

    if(id && commission && total_sales){
        db.insertEmployee(id, commission, total_sales, function(message){
            res.send(message);
        });
    }
});

//USER STORY 4
db.getEmployeesNetPay(function(rows) {
	employeesnet = rows;
});

//Get All Employees net pay - USER STORY 4
app.get('/employeesnet', function (req,res) {
	res.send(employeesnet);
	// body...
});

//USER STORY 5
db.getTopSalesEmployee(function(rows) {
	topsalesemployee = rows;
});

//Get top sales employee - USER STORY 5
app.get('/topsalesemployee', function (req,res) {
	res.send(topsalesemployee);
	// body...
});
//APP functions

app.listen(8002, function () {
	// body...
	console.log('World API listening on port 8002...')
});