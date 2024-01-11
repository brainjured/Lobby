<?php
//$id = $_GET["id"];

require_once 'setup.php';
$connect = mysqli_connect($host, $user, $pass, $db);

if ($connect->connect_error){
	die('Connection lost');
}
/*
mysqli_query($connect, "DELETE FROM taski WHERE id = (\"$id\");");

header('Location: Lab-1.php');
*/
$data = json_decode(file_get_contents("php://input"), true);
if (!empty($data['id'])) {
	$id = $data['id'];
	$sql = "DELETE FROM taski WHERE id = '$id'";
	if (mysqli_query($connect, $sql)) {
		echo 'Delete successful';
	} else {
		echo 'Not deleted';
	}
}
?>