<?php
session_start();

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if username and password are set and not empty
    if (isset($_POST["username"]) && isset($_POST["password"]) && !empty($_POST["username"]) && !empty($_POST["password"])) {
        // Replace these values with your actual database credentials
        $db_host = "your_database_host";
        $db_user = "your_database_username";
        $db_password = "your_database_password";
        $db_name = "your_database_name";

        // Create a database connection
        $conn = new mysqli($db_host, $db_user, $db_password, $db_name);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Escape user inputs to prevent SQL injection
        $username = $conn->real_escape_string($_POST["username"]);
        $password = $conn->real_escape_string($_POST["password"]);

        // Query to check if the username and password match
        $sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
        $result = $conn->query($sql);

        if ($result->num_rows == 1) {
            // Login successful
            $_SESSION["username"] = $username;
            header("Location: welcome.php"); // Redirect to the welcome page
            exit;
        } else {
            // Login failed
            $login_error = "Invalid username or password.";
        }

        // Close the database connection
        $conn->close();
    } else {
        // Username or password is missing
        $login_error = "Please enter username and password.";
    }
} else {
    // Redirect to the login page if accessed directly without submitting the form
    header("Location: login.html");
    exit;
}
?>
