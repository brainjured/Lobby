<?php
	session_start();
	require_once '../conf/connect.php';

	$nick = $_POST['nick'];
	$login = $_POST['login'];
	$password = $_POST['password'];
	$password_conf = $_POST['password_conf'];

	if ($password === $password_conf){
		$err = array();

		if (strlen($login) < 4 or strlen($login) > 20){
			$_SESSION['message'] = 'Length of login should be 4-20';
			$err[] = '0';
			header('Location: ../register.php');
		}
	
		$query = mysqli_query($connection, "SELECT * FROM users WHERE login = (\"$login\");");
		$row = mysqli_fetch_assoc($query);
		$match = $row["login"];
		if ($login === $match){
			$_SESSION['message'] = 'User already exists';
			$err[] = '2';
			header('Location: ../register.php');
		}

		if (!preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,25}$/", $password)){
			$_SESSION['message'] = 'Password(5-25 length) must contain letters(up & low) and numbers';
			$err[] = '1';
			header('Location: ../register.php');
		}
		if (count($err) == 0){
			$password = password_hash($password, PASSWORD_BCRYPT);
			mysqli_query($connection, "INSERT INTO `users`(`nick`, `login`, `pass`) VALUES ('$nick','$login','$password')");
			//$_SESSION['message'] = 'Success!!!';
			header('Location: ../index.html');
		} else {
			//$_SESSION['message'] = 'Something went wrong...';
			header('Location: ../register.php');
		}
	} else {
		$_SESSION['message'] = 'ALERT: Passwords not matching!!!';
		header('Location: ../register.php');
	}
?>