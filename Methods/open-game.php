<?php
session_start();
require_once '../conf/connect.php';

$stat1 = 'open';
$name = $_SESSION['row']['name'];
$login = $_SESSION['row']['login'];
$score = $_SESSION['row']['score'];
$games = $_SESSION['row']['games'];
mysqli_query($connection, "INSERT INTO `games`(`status`, `initiator`) VALUES ('$stat1','$name')");

$sql = "SELECT * FROM users WHERE login = '{$login}'";
$query = mysqli_query($connection, $sql);
$data = [];
if (mysqli_num_rows($query) > 0){
    while ($row = mysqli_fetch_assoc($query)){
        $data[] = $row;
    }
} else {
    $data['empty'] = "empty";
}
echo json_encode($data);
header("Location: http://192.168.0.104:3000/?nick={$name}&login={$login}&score={$score}&games={$games}");
/*
$data = json_decode(file_get_contents("php://input"), true);

if(!empty($data["value"])){
	$value = htmlentities(htmlspecialchars($data["value"]));

	$sql = "INSERT INTO taski (task_text) VALUES ('{$value}')";
	if (mysqli_query($connect, $sql)){
		echo "Succsessful addeed";
	} else {
		echo "Some problem";
	}
} else {
	echo "Please fill the fields";
}
*/
?>