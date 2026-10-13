<?php
/**
 * Contact Form API Handler for Hostinger MySQL Database
 * 
 * Handles submissions from the "Initiate Conversation" form.
 * Supports JSON payloads and standard form POSTs.
 */

// --------------------------------------------------------------------------
// 1. CORS & Response Headers
// --------------------------------------------------------------------------
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); // Update with your domain in production (e.g., https://yourdomain.com)
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle CORS Preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "error" => "Method not allowed. Only POST requests are accepted."
    ]);
    exit();
}

// --------------------------------------------------------------------------
// 2. Hostinger Database Configuration
// --------------------------------------------------------------------------
// Replace these with your actual Hostinger MySQL database credentials
// found in Hostinger hPanel -> Databases -> Management
define('DB_HOST', 'localhost');              // Usually 'localhost' on Hostinger
define('DB_NAME', 'u123456789_mukeshrai');   // Your Hostinger Database Name
define('DB_USER', 'u123456789_dbuser');      // Your Hostinger Database Username
define('DB_PASS', 'YOUR_DATABASE_PASSWORD');  // Your Hostinger Database Password
define('DB_CHARSET', 'utf8mb4');

// Optional Email Notification Config
define('SEND_EMAIL_NOTIFICATION', false);     // Set to true to receive emails on new submission
define('NOTIFICATION_RECIPIENT', 'contact@aaprin.com');

// --------------------------------------------------------------------------
// 3. Parse & Sanitize Input Data
// --------------------------------------------------------------------------
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

// Fallback to standard $_POST if not JSON
if (!is_array($data) || empty($data)) {
    $data = $_POST;
}

// Anti-spam Honeypot Check (if 'website' field is populated, ignore silently)
if (!empty($data['website'])) {
    echo json_encode(["success" => true, "message" => "Inquiry received."]);
    exit();
}

$name = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$organization = isset($data['organization']) ? trim(strip_tags($data['organization'])) : '';
$email = isset($data['email']) ? trim(filter_var($data['email'], FILTER_SANITIZE_EMAIL)) : '';
$message = isset($data['message']) ? trim(strip_tags($data['message'])) : '';

// --------------------------------------------------------------------------
// 4. Validation
// --------------------------------------------------------------------------
$errors = [];

if (empty($name)) {
    $errors[] = "Name is required.";
} elseif (mb_strlen($name) > 100) {
    $errors[] = "Name must not exceed 100 characters.";
}

if (empty($email)) {
    $errors[] = "Email is required.";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Please provide a valid email address.";
} elseif (mb_strlen($email) > 150) {
    $errors[] = "Email must not exceed 150 characters.";
}

if (empty($message)) {
    $errors[] = "Message is required.";
} elseif (mb_strlen($message) < 5) {
    $errors[] = "Message must be at least 5 characters.";
} elseif (mb_strlen($message) > 5000) {
    $errors[] = "Message must not exceed 5000 characters.";
}

if (mb_strlen($organization) > 150) {
    $errors[] = "Organization must not exceed 150 characters.";
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode([
        "success" => false,
        "error" => implode(" ", $errors)
    ]);
    exit();
}

// --------------------------------------------------------------------------
// 5. Connect to Database & Store Data
// --------------------------------------------------------------------------
$ipAddress = $_SERVER['REMOTE_ADDR'] ?? null;
$userAgent = substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 255);

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);

    // Auto-create table if it doesn't exist yet
    $createTableSql = "
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
    ";
    $pdo->exec($createTableSql);

    // Insert Inquiry
    $insertSql = "INSERT INTO `inquiries` (`name`, `organization`, `email`, `message`, `ip_address`, `user_agent`) 
                  VALUES (:name, :organization, :email, :message, :ip_address, :user_agent)";
    
    $stmt = $pdo->prepare($insertSql);
    $stmt->execute([
        ':name'         => $name,
        ':organization' => $organization ?: null,
        ':email'        => $email,
        ':message'      => $message,
        ':ip_address'   => $ipAddress,
        ':user_agent'   => $userAgent
    ]);

    $insertedId = $pdo->lastInsertId();

    // --------------------------------------------------------------------------
    // 6. Optional Email Notification
    // --------------------------------------------------------------------------
    if (SEND_EMAIL_NOTIFICATION && !empty(NOTIFICATION_RECIPIENT)) {
        $emailSubject = "New Executive Inquiry from " . $name;
        $emailBody = "You have received a new inquiry from your website:\n\n"
                   . "Name: " . $name . "\n"
                   . "Organization: " . ($organization ?: 'N/A') . "\n"
                   . "Email: " . $email . "\n"
                   . "IP: " . $ipAddress . "\n"
                   . "Date: " . date('Y-m-d H:i:s') . "\n\n"
                   . "Message:\n" . $message . "\n";
        
        $emailHeaders = "From: no-reply@" . ($_SERVER['SERVER_NAME'] ?? 'localhost') . "\r\n"
                      . "Reply-To: " . $email . "\r\n"
                      . "X-Mailer: PHP/" . phpversion();

        @mail(NOTIFICATION_RECIPIENT, $emailSubject, $emailBody, $emailHeaders);
    }

    // --------------------------------------------------------------------------
    // 7. Success Response
    // --------------------------------------------------------------------------
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Inquiry successfully received and stored.",
        "id" => $insertedId
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    // In production, avoid leaking sensitive credentials; log message locally
    error_log("Database Error: " . $e->getMessage());
    echo json_encode([
        "success" => false,
        "error" => "Database connection or execution failed. Please verify DB credentials."
    ]);
}
