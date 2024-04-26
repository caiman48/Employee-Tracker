-- Check if the database exists, and if so, drop it to start fresh

DROP DATABASE IF EXISTS Team_db;
-- Create a new database named Team_db
CREATE DATABASE Team_db;
-- Select the newly created database for use in subsequent operations
USE Team_db;

-- Create a new table named 'departments' to store department details
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,-- An auto-incrementing primary key for unique department IDs
  name VARCHAR(30) NOT NULL-- Name of the department, must be provided and cannot exceed 30 characters
);
-- Create a new table named 'roles' to store role details within departments

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,-- An auto-incrementing primary key for unique role IDs
  title VARCHAR(30) NOT NULL,-- Title of the role, must be provided and cannot exceed 30 characters
  salary DECIMAL NOT NULL,-- Salary for the role, must be provided
  department_id INT,-- Foreign key that links to the department's ID
  FOREIGN KEY (department_id) REFERENCES departments(id)-- Ensures the department_id corresponds to an existing department
);
-- Create a new table named 'employees' to store employee details

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,-- An auto-incrementing primary key for unique employee IDs
  first_name VARCHAR(30) NOT NULL,-- Employee's first name, must be provided and cannot exceed 30 characters
  last_name VARCHAR(30) NOT NULL,-- Employee's last name, must be provided and cannot exceed 30 characters
  role_id INT,-- Foreign key that links to the role's ID
  manager_id INT NULL,-- Optional foreign key that links to another employee's ID who is this employee's manager
  FOREIGN KEY (role_id) REFERENCES roles(id),-- Ensures the role_id corresponds to an existing role
  FOREIGN KEY (manager_id) REFERENCES employees(id)-- Optional; ensures the manager_id corresponds to an existing employee
);