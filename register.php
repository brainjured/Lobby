<?php
    session_start();
    if (isset($_SESSION['row'])){
        header('Location: /profile.php');
    }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
    	<meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="Styles\style-inup.css">
        <title>Registration</title>
    </head>
    <body>
        <form action="methods/signup.php" method="POST">
            <label>NickName:</label>
            <input type="text" name="nick" placeholder="NickName">
            <label>Login:</label>
            <input type="text" name="login" placeholder="Login">
            <label>Password:</label>
            <input type="password" name="password" placeholder="Password">
            <label>Confirm:</label>
            <input type="password" name="password_conf" placeholder="Confirm password">
            <button type="submit">Register</button>
            <p>
                Already have account? -> <a href="login.php"> Go here!!!</a>
            </p>
            <p class="msg">
                <?php 
                    if(isset($_SESSION['message'])){
                        echo $_SESSION['message'];
                    } 
                    unset($_SESSION['message']);
                ?>
            </p>
        </form>
    </body>
</html>