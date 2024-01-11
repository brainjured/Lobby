<?php
session_start();
require_once '../conf/connect.php';

$x = 1;
$sql = "SELECT * FROM users WHERE role = '{$x}'";
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
?>