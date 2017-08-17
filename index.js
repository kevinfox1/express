const express = require('express');
const db = require('./db.js');
const app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());


//DB functions
db.getEmployees(1, function(rows) {
	employees = rows;
});

db.getEmployeeDepartments(function(rows) {
	employeeDepartments = rows;
});

db.getDepartment(function(rows) {
	departments = rows;
});

//APP functions

//Insert New Employee
app.post('/employee', function(req, res){
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


//Get All Employees
app.get('/employees', function (req,res) {
	res.send(employees);
	// body...
});

//Get Employee departments
app.get('/employeeDepartment', function (req,res) {
	res.send(employeeDepartments);
	// body...
});

//Get Departments
app.get('/department', function (req,res) {
	res.send(departments);
	// body...
});

app.listen(8002, function () {
	// body...
	console.log('World API listening on port 8002...')
});