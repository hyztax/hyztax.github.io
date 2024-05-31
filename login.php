<?php
session_start();

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if username and password are set and not empty
    if (isset($_POST["username"]) && isset($_POST["password"]) && !empty($_POST["username"]) && !empty($_POST["password"])) {
        // Simulate database connection (replace with your actual database connection)
        $db_username = "user123";
        $db_password = "password123";

        // Retrieve username and password from the form
        $username = $_POST["username"];
        $password = $_POST["password"];

        // Check if username and password match
        if ($username === $db_username && $password === $db_password) {
            // Authentication successful
            $_SESSION["username"] = $username;
            header("Location: welcome.php");
            exit;
        } else {
            // Authentication failed
            $login_error = "Invalid username or password.";
        }
    } else {
        // Username or password is missing
        $login_error = "Please enter username and password.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h2>Login</h2>
    <?php if (isset($login_error)) : ?>
        <p><?php echo $login_error; ?></p>
    <?php endif; ?>
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
        <label for="username">Username:</label><br>
        <input type="text" id="username" name="username"><br>
        <label for="password">Password:</label><br>
        <input type="password" id="password" name="password"><br><br>
        <input type="submit" value="Login">
    </form>
</body>
</html>
