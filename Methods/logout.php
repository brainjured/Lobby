<?php
	session_start();
	unset($_SESSION['row']);
	header('Location: ../index.html');
?>