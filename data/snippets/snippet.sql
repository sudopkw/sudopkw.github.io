CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email) VALUES 
('pkw', 'pkw@example.com'),
('galles', 'galles@example.com');

SELECT id, username, email, created_at 
FROM users
ORDER BY created_at DESC;

UPDATE users
SET email = 'updated_pkw@example.com'
WHERE username = 'pkw';

DELETE FROM users
WHERE username = 'galles';
-- simple sql snippet
