CREATE DATABASE IF NOT EXISTS tasks;

USE tasks;

CREATE TABLE tasks (
    id TINYINT(4) PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    description TEXT,
    isCompleted TINYINT(1),
    createdAt DATETIME 
);
