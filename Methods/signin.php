<?php
	session_start();
	require_once '../conf/connect.php';

	$login = $_POST['login'];
	$password = $_POST['password'];

	$query = mysqli_query($connection, "SELECT * FROM users WHERE login = (\"$login\");"); //UPDATE taski SET task_text = (\"$value\") WHERE id = (\"$id\");
	$row = mysqli_fetch_assoc($query);
	$hash = $row["pass"];
	$role = $row["role"];


	if (password_verify($password, $hash)) {
    	//echo 'Пароль правильный!';
		if ($role == 1){
			$_SESSION['row'] = [
				"id" => $row['id'],
				"name" => $row['nick'],
				"login" => $row['login'],
				"score" => $row['score'],
				"games" => $row['games_played']
			];
			$_SESSION['start'] = time();
			$_SESSION['expire'] = $_SESSION['start'] + 10000;
			
			header('Location: ../profile.php');
		} elseif ($role == 0) {
			$_SESSION['row'] = [
				"id" => $row['id'],
				"name" => $row['nick'],
				"login" => $row['login']
			];
			$_SESSION['start'] = time();
			$_SESSION['expire'] = $_SESSION['start'] + 10000;
			
			header('Location: ../Admin/Panel.php');
		}
	} else {
		$_SESSION['message'] = 'ALERT: Invalid login or password';
		header('Location: ../login.php');
    	//echo 'Пароль неправильный.';
	}
?>