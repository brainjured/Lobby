<?php
	session_start();
	require_once '../conf/connect.php';

	$password = $_POST['password'];
	$password_conf = $_POST['password_conf'];
	$login = $_SESSION['row']['login'];

	if ($password === $password_conf){
		$err = array();
		/*
		$query = mysqli_query($connection, "SELECT * FROM users WHERE login = (\"$login\");");
		$row = mysqli_fetch_assoc($query);
		$match = $row["login"];
		if ($login === $match){
			$_SESSION['message'] = 'User already exists';
			$err[] = '2';
			header('Location: ../register.php');
		}
		*/
		if (!preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,25}$/", $password)){
			$_SESSION['message'] = 'Password(5-25 length) must contain letters(up & low) and numbers';
			$err[] = '1';
			header('Location: ../newpass.php');
		}
		if (count($err) == 0){
			$password = password_hash($password, PASSWORD_BCRYPT);
			mysqli_query($connection, "UPDATE users SET pass = (\"$password\") WHERE login = (\"$login\");");
			//$_SESSION['message'] = 'Success!!!';
			header('Location: ../profile.php');
		} else {
			//$_SESSION['message'] = 'Something went wrong...';
			header('Location: ../newpass.php');
		}
	} else {
		$_SESSION['message'] = 'ALERT: Passwords not matching!!!';
		header('Location: ../newpass.php');
	}
?>