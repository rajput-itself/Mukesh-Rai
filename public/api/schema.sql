-- Hostinger MySQL Database Schema for Executive Inquiries
-- You can run this directly in phpMyAdmin under your database's SQL tab.

CREATE TABLE IF NOT EXISTS `inquiries` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `organization` VARCHAR(150) DEFAULT NULL,
    `email` VARCHAR(150) NOT NULL,
    `message` TEXT NOT NULL,
    `ip_address` VARCHAR(45) DEFAULT NULL,
    `user_agent` VARCHAR(255) DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional Index for faster queries on submission date & email
CREATE INDEX `idx_inquiries_created_at` ON `inquiries` (`created_at`);
CREATE INDEX `idx_inquiries_email` ON `inquiries` (`email`);
