<?php
    session_start();
    if (!$_SESSION['row']){
        header('Location: /index.php');
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
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="../Styles/style-panel.css">
	<title>Admin Panel</title>
</head>
<body>
	<div class="box">
        <div class="box0">
        <h2 style="margin: 10px 0;">User: <span id="nick"> <?= $_SESSION['row']['name'] ?> </span></h2>
		<p><input id="btn1" type="submit" value="All Games"></p>
        <p><input id="btn" type="submit" value="All Users" ></p>
		<p><button class="chpass"><a href="../methods/updatepass.php">Change password</a></button></p>
        <button class="logout"><a href="../methods/logout.php">Logout</a></button>
        </div>
    </div>
        
    <div class="box1">
	<table>
		<tbody id="tbody0"></tbody>
		<tbody id="tbody">
		</tbody>
	</table>
    </div>
	<!--NiMdA:D3C0DeTh1s !-->
</body>
<script src="script.js"></script>
</html>
