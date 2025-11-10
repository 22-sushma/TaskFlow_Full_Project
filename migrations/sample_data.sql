INSERT INTO users (name, email, role) VALUES 
('Alice', 'alice@example.com', 'admin'),
('Bob', 'bob@example.com', 'user'),
('Charlie', 'charlie@example.com', 'user');

INSERT INTO teams (name, description) VALUES ('Platform', 'Platform team'), ('Mobile', 'Mobile apps');

INSERT INTO team_members (team_id, user_id, role) VALUES (1,1,'lead'), (1,2,'member'), (2,3,'lead');

INSERT INTO projects (name, description, team_id, start_date, end_date) VALUES 
('TaskFlow MVP', 'MVP for TaskFlow', 1, '2025-11-01', '2025-12-15'),
('Mobile App', 'Mobile client for TaskFlow', 2, '2025-11-05', '2026-01-20');

INSERT INTO tasks (title, description, project_id, priority, status, due_date) VALUES
('Setup DB', 'Create schema and run migrations', 1, 'high', 'done', '2025-11-03'),
('API: Projects', 'Implement project endpoints', 1, 'high', 'in_progress', '2025-11-10'),
('Design mobile screens', 'Initial UX', 2, 'medium', 'todo', '2025-11-20');
