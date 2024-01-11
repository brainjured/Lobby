<?php
    session_start();
    if (!$_SESSION['row']){
        header('Location: /index.html');
        die();
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="Styles\style-inup.css">
    <title>New password</title>
</head>
    <body>
        <form action="methods/updatepass.php" method="POST">
        	<label>Password:</label>
            <input type="password" name="password" placeholder="New password">
            <label>Confirm:</label>
            <input type="password" name="password_conf" placeholder="Confirm password">
            <button type="submit">Update password</button>
        	<p>
        		<a href="profile.php">Back</a>
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
