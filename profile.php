<?php
    session_start();
    if (!$_SESSION['row']){
        header('Location: /index.html');
        die();
    } else {
        $now = time();
        if ($now > $_SESSION['expire']){
            unset($_SESSION['row']);
            header('Location: ../index.html');
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
    	<meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="Styles\style-profile.css">
        <title>Profile</title>
    </head>
    <body>
        <div class="box">
            <div class="box0">
            <h2 style="margin: 10px 0;">User: <span id="nick"> <?= $_SESSION['row']['name'] ?> </span></h2>
            <p>Total score: <span id="score"> <?= $_SESSION['row']['score'] ?> </span> </p>
            <p>Games played: <span id="games"> <?= $_SESSION['row']['games'] ?> </span> </p>
            <button class="logout"><a href="methods/logout.php">Logout</a></button>
            </div>
        </div>
        
        <div class="box1">
            <p><input id="btn1" type="submit" value="Find Game" onclick='location.href="game/games.html"'></p>
            <form action="methods/open-game.php">
                <p><input id="btn" type="submit" value="Open Game" ></p>
            </form>
            <p><button class="chpass"><a href="newpass.php">Change password</a></button></p>
        </div>
    </body>
</html>