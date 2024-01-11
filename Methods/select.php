<?php
/*$i = 0;
$sort = NULL;
if(isset($_POST['num_1'])){
	$sort = $_POST['num_1'];
}

$query = mysqli_query($connect, "SELECT * FROM taski");
if($sort == 1){
	$query = mysqli_query($connect, "SELECT * FROM taski ORDER BY task_text ASC");
}elseif($sort == 2){
	$query = mysqli_query($connect, "SELECT * FROM taski ORDER BY task_text DESC");
}	
*/
include "setup.php";
$connect = mysqli_connect($host, $user, $pass, $db);

if ($connect->connect_error){
	die('Connection lost');
}
/*
$data = json_decode(file_get_contents("php://input"), true);
if (!empty($data["value"])) {
	$sort = $data["value"];
    echo json_decode($sort);
} else {
    echo "Fail";
}*/

$sql = "SELECT * FROM taski ORDER BY id ASC";
$query = mysqli_query($connect, $sql);
$data = [];
if (mysqli_num_rows($query) > 0){
    while ($row = mysqli_fetch_assoc($query)){
        $data[] = $row;
    }
} else {
    $data['empty'] = "empty";
}
echo json_encode($data);
?>