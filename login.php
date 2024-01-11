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
        <title>Authorization</title>
    </head>
    <body>
        <form action="methods/signin.php" method="POST">
            <label>Login:</label>
            <input type="text" name="login" placeholder="Login">
            <label>Password:</label>
            <input type="password" name="password" placeholder="Password">
            <button type="submit">login</button>
            <p>
                No account? -> <a href="register.php">Create</a>
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
