INSERT INTO departments (name)
VALUES 
  ('Coaching'), 
  ('Medical'), 
  ('Scouting'), 
  ('Operations');


INSERT INTO roles (title, salary, department_id)
VALUES 
  ('Head Coach', 120000, 1),
  ('Assistant Coach', 80000, 1),
  ('Goalkeeping Coach', 60000, 1),
  ('Team Doctor', 150000, 2),
  ('Physiotherapist', 75000, 2),
  ('Head Scout', 90000, 3),
  ('Scout', 50000, 3),
  ('Operations Manager', 85000, 4),
  ('Public Relations Manager', 65000, 4);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
  ('Alex', 'Ferguson', 1, NULL),  
  ('Carlos', 'Queiroz', 2, 1),    
  ('John', 'Smith', 3, 1),        
  ('Hans', 'Müller', 4, NULL),    
  ('Emma', 'Johnson', 5, 4),      
  ('Tom', 'Scavo', 6, NULL),      
  ('Susan', 'Mayer', 7, 6),       
  ('Lynette', 'Scavo', 8, NULL),  
  ('Bree', 'Van de Kamp', 9, 8);  