const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2488318Jba",
  database: "Team_db",
});

// Connect to the database
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the Team_db database.");
  start();
});

// Function to start the application
const start = () => {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
};

// Function to view all departments
const viewDepartments = () => {
  const query = "SELECT id, name AS department FROM departments";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};
