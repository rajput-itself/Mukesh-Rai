<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "error" => "Method not allowed. Only POST requests are accepted."
    ]);
    exit();
}

if (file_exists(__DIR__ . '/config.local.php')) {
    require_once __DIR__ . '/config.local.php';
}

defined('DB_HOST') || define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
defined('DB_NAME') || define('DB_NAME', getenv('DB_NAME') ?: 'u123456789_mukeshrai');
defined('DB_USER') || define('DB_USER', getenv('DB_USER') ?: 'u123456789_dbuser');
defined('DB_PASS') || define('DB_PASS', getenv('DB_PASS') ?: 'YOUR_DATABASE_PASSWORD');
defined('DB_CHARSET') || define('DB_CHARSET', 'utf8mb4');

defined('SEND_EMAIL_NOTIFICATION') || define('SEND_EMAIL_NOTIFICATION', false);
defined('NOTIFICATION_RECIPIENT') || define('NOTIFICATION_RECIPIENT', 'contact@aaprin.com');

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data) || empty($data)) {
    $data = $_POST;
}

if (!empty($data['website'])) {
    echo json_encode(["success" => true, "message" => "Inquiry received."]);
    exit();
}

$name = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$organization = isset($data['organization']) ? trim(strip_tags($data['organization'])) : '';
$email = isset($data['email']) ? trim(filter_var($data['email'], FILTER_SANITIZE_EMAIL)) : '';
$message = isset($data['message']) ? trim(strip_tags($data['message'])) : '';

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

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Inquiry successfully received and stored.",
        "id" => $insertedId
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    error_log("Database Error: " . $e->getMessage());
    echo json_encode([
        "success" => false,
        "error" => "Database connection or execution failed. Please verify DB credentials."
    ]);
}
