CREATE TABLE employee (
    name VARCHAR(255),
    designation VARCHAR(255),
    experience INT,
    description VARCHAR(255),
    pastDesignation VARCHAR(255)
);

ALTER TABLE employee
ADD COLUMN employee_id SERIAL PRIMARY KEY;

select * from employee;


INSERT INTO employee (name, designation, experience, description, pastDesignation) VALUES
('hamna khan', 'software developer', 10, 'As a MERN stack developer, I specialize in crafting dynamic web applications using MongoDB, Express.js, React, and Node.js. With a strong foundation in both front-end and back-end technologies, I bring full-stack expertise to every project.', 'internship'),
('abdul marij', 'graphic designer', 2, 'As a MERN stack developer, I specialize in crafting dynamic web applications using MongoDB, Express.js, React, and Node.js. With a strong foundation in both front-end and back-end technologies, I bring full-stack expertise to every project.', 'internship'),
('abdul manan', 'testing', 2, 'As a MERN stack developer, I specialize in crafting dynamic web applications using MongoDB, Express.js, React, and Node.js. With a strong foundation in both front-end and back-end technologies, I bring full-stack expertise to every project.', 'internship'),
('abdul razzaq', 'software assurance', 2, 'As a MERN stack developer, I specialize in crafting dynamic web applications using MongoDB, Express.js, React, and Node.js. With a strong foundation in both front-end and back-end technologies, I bring full-stack expertise to every project.', 'internship');


select * from employee;


CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO projects (project_name) VALUES
('Project Alpha'),
('Project Beta'),
('Project Gamma');

select * from projects;

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    task_name VARCHAR(255) NOT NULL,
    task_deadline INT NOT NULL,
    task_date DATE NOT NULL,
    task_time TIME NOT NULL,
    task_status VARCHAR(50) CHECK (task_status IN ('Pending', 'Completed')),
    assign_to_employee INT,
    project_id INT,
    FOREIGN KEY (assign_to_employee) REFERENCES employee(employee_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (task_name, task_deadline, task_date, task_time, task_status, assign_to_employee, project_id) VALUES
('Design Database Schema', 10, '2024-08-01', '09:00:00', 'Pending', 1, 1),
('Develop API Endpoints', 20, '2024-08-05', '11:00:00', 'Pending', 2, 1),
('Create Frontend Layout', 15, '2024-08-10', '14:00:00', 'Pending', 3, 2),
('Implement Authentication', 30, '2024-08-15', '16:00:00', 'Pending', 4, 2),
('Test Application', 5, '2024-08-20', '10:00:00', 'Pending', 5, 3);


select * from tasks;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();


INSERT INTO users (username, email, password_hash, first_name, last_name) VALUES
('john_doe', 'john.doe@example.com', 'hashed_password_123', 'John', 'Doe'),
('jane_smith', 'jane.smith@example.com', 'hashed_password_456', 'Jane', 'Smith'),
('alice_jones', 'alice.jones@example.com', 'hashed_password_789', 'Alice', 'Jones'),
('bob_brown', 'bob.brown@example.com', 'hashed_password_012', 'Bob', 'Brown');

select * from users;

