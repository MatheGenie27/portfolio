<?php

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): // Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;

    case ("POST"): // Send the email.
        header("Access-Control-Allow-Origin: *");

        // Payload is not sent to $_POST; it is sent as raw input.
        $json = file_get_contents('php://input');
        $params = json_decode($json); // Parse the Payload from JSON to PHP object.

        // Extract data from parsed JSON.
        $email = $params->email ?? ''; // Use null coalescing operator for safety.
        $name = $params->name ?? '';
        $userMessage = $params->message ?? '';

        // Define email recipient, subject, and content.
        $recipient = 'info@bjoern-bressler.de';
        $subject = "Contact Form Submission from <$email>";
        $message = "
            <html>
            <head>
                <title>Contact Form Submission</title>
            </head>
            <body>
                <p><strong>From:</strong> $name &lt;$email&gt;</p>
                <p><strong>Message:</strong></p>
                <p>$userMessage</p>
            </body>
            </html>
        ";

        // Define email headers.
        $headers = array();
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = "From: noreply@bjoern-bressler.de";

        // Send the email.
        if (mail($recipient, $subject, $message, implode("\r\n", $headers))) {
            echo json_encode(["status" => "success", "message" => "Email sent successfully."]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to send email."]);
        }
        break;

    default: // Reject any non-POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}

