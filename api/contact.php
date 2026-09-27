<?php
/**
 * URTH Studio — Contact form mailer
 *
 * Upload this file to your PHP host (e.g. https://yourdomain.com/api/contact.php)
 * then set NEXT_PUBLIC_CONTACT_API_URL in the Next.js env to that URL.
 */

header('Content-Type: application/json; charset=utf-8');

// --- Config (edit these) ---
$to_email       = 'hello@urth.studio';   // Where enquiry emails are delivered
$from_email     = 'noreply@urth.studio'; // Must be a domain mailbox on this server when possible
$from_name      = 'URTH Website';
$subject_prefix = 'URTH enquiry';

// Origins allowed to call this endpoint (your Next.js site)
$allowed_origins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    // 'https://www.urth.studio',
];

// --- CORS ---
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Credentials: true');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Vary: Origin');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// --- Parse body (JSON or form-urlencoded / multipart) ---
$content_type = $_SERVER['CONTENT_TYPE'] ?? '';
$input = [];

if (stripos($content_type, 'application/json') !== false) {
    $raw = file_get_contents('php://input');
    $decoded = json_decode($raw, true);
    $input = is_array($decoded) ? $decoded : [];
} else {
    $input = $_POST;
}

// Honeypot — bots fill this; humans leave it empty
if (!empty($input['website'])) {
    http_response_code(200);
    echo json_encode(['ok' => true]);
    exit;
}

$name    = trim((string)($input['name'] ?? ''));
$email   = trim((string)($input['email'] ?? ''));
$project = trim((string)($input['project'] ?? ''));
$message = trim((string)($input['message'] ?? ''));

$errors = [];

if ($name === '' || mb_strlen($name) < 2) {
    $errors[] = 'Please enter your name.';
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please enter a valid email.';
}
if ($message === '' || mb_strlen($message) < 10) {
    $errors[] = 'Please enter a longer message.';
}
if (mb_strlen($name) > 120 || mb_strlen($email) > 180 || mb_strlen($project) > 200 || mb_strlen($message) > 5000) {
    $errors[] = 'One or more fields are too long.';
}

if ($errors) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => implode(' ', $errors)]);
    exit;
}

$safe = static function (string $value): string {
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
};

$subject = $subject_prefix . ' from ' . $name;
if ($project !== '') {
    $subject .= ' — ' . $project;
}

$body  = "New enquiry from the URTH website\n";
$body .= str_repeat('-', 40) . "\n\n";
$body .= "Name:    {$name}\n";
$body .= "Email:   {$email}\n";
$body .= "Project: " . ($project !== '' ? $project : '—') . "\n\n";
$body .= "Message:\n{$message}\n\n";
$body .= str_repeat('-', 40) . "\n";
$body .= 'Sent: ' . gmdate('Y-m-d H:i:s') . " UTC\n";
$body .= 'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";

$encoded_from_name = '=?UTF-8?B?' . base64_encode($from_name) . '?=';
$headers = [
    "From: {$encoded_from_name} <{$from_email}>",
    "Reply-To: {$name} <{$email}>",
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: URTH-Contact-PHP',
];

$sent = @mail(
    $to_email,
    '=?UTF-8?B?' . base64_encode($subject) . '?=',
    $body,
    implode("\r\n", $headers)
);

if (!$sent) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Could not send email. Please try again or email us directly.',
    ]);
    exit;
}

http_response_code(200);
echo json_encode(['ok' => true, 'message' => 'Thank you. We will be in touch soon.']);
