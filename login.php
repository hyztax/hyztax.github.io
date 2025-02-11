<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $db_host = "localhost";
    $db_user = "id22250136_hyztax";
    $db_password = "test1234!";
    $db_name = "id22250136_logincreate";

    $conn = new mysqli($db_host, $db_user, $db_password, $db_name);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $username = $conn->real_escape_string($_POST["username"]);
    $password = $conn->real_escape_string($_POST["password"]);

    $sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        $_SESSION["username"] = $username;
        echo "success";
    } else {
        echo "Invalid username or password.";
    }

    $conn->close();
} else {
    echo "Invalid request.";
}
?>

