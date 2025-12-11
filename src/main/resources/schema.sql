-- Create Database
CREATE DATABASE IF NOT EXISTS todoapp_db;
USE todoapp_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contact VARCHAR(20),
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

-- Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    priority VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_priority (priority),
    INDEX idx_status (status),
    CONSTRAINT chk_priority CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')),
    CONSTRAINT chk_status CHECK (status IN ('PENDING', 'IN_PROGRESS', 'COMPLETED'))
);

-- Tags Table
CREATE TABLE IF NOT EXISTS tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    INDEX idx_tag_name (name)
);

-- TaskTags Table (Many-to-Many relationship)
CREATE TABLE IF NOT EXISTS task_tags (
    task_tag_id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,
    tag_id INT NOT NULL,
    FOREIGN KEY (task_id) REFERENCES tasks(task_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE,
    UNIQUE KEY unique_task_tag (task_id, tag_id),
    INDEX idx_task_id (task_id),
    INDEX idx_tag_id (tag_id)
);

-- Insert Sample Data
INSERT INTO users (name, email, contact) VALUES
('John Doe', 'john.doe@example.com', '1234567890'),
('Jane Smith', 'jane.smith@example.com', '0987654321'),
('Bob Johnson', 'bob.johnson@example.com', '5555555555')
ON DUPLICATE KEY UPDATE name=name;

INSERT INTO tags (name, description) VALUES
('Work', 'Work-related tasks'),
('Personal', 'Personal tasks'),
('Urgent', 'Urgent tasks requiring immediate attention'),
('Shopping', 'Shopping and errands'),
('Health', 'Health and fitness related')
ON DUPLICATE KEY UPDATE name=name;

