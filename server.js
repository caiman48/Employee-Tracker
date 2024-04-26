const mysql = require("mysql2/promise"); // MySQL library to handle database operations with promises
const inquirer = require("inquirer"); // Library for interactive command line user interfaces
const cTable = require("console.table"); // Library to display tables in the console

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2488318Jba",
  database: "Team_db",
});

// Main function to start the application
const start = async () => {
  try {
    const db = await connection; // Establish and await the database connection
    console.log("Connected to the Team_db database.");

    while (true) {
      // Loop to keep asking the user for actions until they decide to exit
      const { action } = await inquirer.prompt({
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
      });

      if (action === "Exit") {
        await db.end(); // Close the database connection
        console.log("Connection closed.");
        break; // Exit the loop
      }
      // Handle user actions with a switch statement
      switch (action) {
        case "View all departments":
          await viewDepartments(db);
          break;
        case "View all roles":
          await viewRoles(db);
          break;
        case "View all employees":
          await viewEmployees(db);
          break;
        case "Add a department":
          await addDepartment(db);
          break;
        case "Add a role":
          await addRole(db);
          break;
        case "Add an employee":
          await addEmployee(db);
          break;
        case "Update an employee role":
          await updateEmployeeRole(db);
          break;
      }
    }
  } catch (err) {
    // Catch and handle any errors
    console.error("An error occurred:", err);
    await connection.end(); // Ensure connection is closed on error
  }
};
// Function to display all departments
const viewDepartments = async (db) => {
  const query = "SELECT id, name AS department FROM departments";
  const [res] = await db.query(query); // Execute the query and store the result
  console.table(res); // Display the result in table format in the console
};
// Function to display all roles
const viewRoles = async (db) => {
  const query = `SELECT roles.id, roles.title, roles.salary, departments.name AS department 
                                     FROM roles 
                                     INNER JOIN departments ON roles.department_id = departments.id`;
  const [res] = await db.query(query);
  console.table(res);
};
// Function to display all employees
const viewEmployees = async (db) => {
  const query = `
        SELECT 
            e.id AS employee_id,
            e.first_name,
            e.last_name,
            r.title AS role_title,
            r.salary AS role_salary,
            d.name AS department_name,
            CONCAT(m.first_name, ' ', m.last_name) AS manager_name
        FROM 
            employees e
        LEFT JOIN 
            roles r ON e.role_id = r.id
        LEFT JOIN 
            departments d ON r.department_id = d.id
        LEFT JOIN 
            employees m ON e.manager_id = m.id`;
  const [res] = await db.query(query);
  console.table(res);
};
// Function to add a new department
const addDepartment = async (db) => {
  const { name } = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Enter the name of the department:",
  });

  const query = "INSERT INTO departments SET ?";
  await db.query(query, { name });
  console.log("Department added successfully!");
};
// Function to add a new role to the database
const addRole = async (db) => {
  // Prompt user for details about the new role
  const { title, salary, department_id } = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the title of the role:",
    },
    {
      type: "input",
      name: "salary",
      message: "Enter the salary for the role:",
    },
    {
      type: "input",
      name: "department_id",
      message: "Enter the department ID for the role:",
    },
  ]);
  // SQL query to insert the new role into the database
  const query = "INSERT INTO roles SET ?";
  await db.query(query, { title, salary, department_id }); // Execute the query
  console.log("Role added successfully!"); // Confirm the role was added
};
// Function to add a new employee to the database
const addEmployee = async (db) => {
  // Prompt user for details about the new employee
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Enter the first name of the employee:",
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter the last name of the employee:",
    },
    {
      type: "input",
      name: "role_id",
      message: "Enter the role ID for the employee:",
    },
    {
      type: "input",
      name: "manager_id",
      message: "Enter the manager ID for the employee:",
    },
  ]);
  // SQL query to insert the new employee into the database
  const query = "INSERT INTO employees SET ?";
  await db.query(query, { first_name, last_name, role_id, manager_id });
  console.log("Employee added successfully!");
};
// Function to update the role of an existing employee
const updateEmployeeRole = async (db) => {
  // Prompt user for the employee ID and new role ID
  const { employee_id, role_id } = await inquirer.prompt([
    {
      type: "input",
      name: "employee_id",
      message: "Enter the ID of the employee you want to update:",
    },
    {
      type: "input",
      name: "role_id",
      message: "Enter the new role ID for the employee:",
    },
  ]);

  // SQL query to update the role ID of the specified employee
  const query = "UPDATE employees SET role_id = ? WHERE id = ?";
  await db.query(query, [role_id, employee_id]); // Execute the query
  console.log("Employee role updated successfully!"); // Confirm the role update
};

start(); // Call the start function to run the application
