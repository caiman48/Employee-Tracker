const mysql = require("mysql2/promise");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
        const db = await connection;
        console.log("Connected to the Team_db database.");

        while (true) {
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
                await db.end();
                console.log("Connection closed.");
                break;
            }

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
        console.error("An error occurred:", err);
        await connection.end();
    }
};

const viewDepartments = async (db) => {
    const query = "SELECT id, name AS department FROM departments";
    const [res] = await db.query(query);
    console.table(res);
};

const viewRoles = async (db) => {
    const query = `SELECT roles.id, roles.title, roles.salary, departments.name AS department 
                                     FROM roles 
                                     INNER JOIN departments ON roles.department_id = departments.id`;
    const [res] = await db.query(query);
    console.table(res);
};

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

const addRole = async (db) => {
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

    const query = "INSERT INTO roles SET ?";
    await db.query(query, { title, salary, department_id });
    console.log("Role added successfully!");
};

const addEmployee = async (db) => {
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

    const query = "INSERT INTO employees SET ?";
    await db.query(query, { first_name, last_name, role_id, manager_id });
    console.log("Employee added successfully!");
};

const updateEmployeeRole = async (db) => {
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

    const query = "UPDATE employees SET role_id = ? WHERE id = ?";
    await db.query(query, [role_id, employee_id]);
    console.log("Employee role updated successfully!");
};

start();
