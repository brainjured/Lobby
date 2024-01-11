<?php
session_start();
require_once '../conf/connect.php';

$stat1 = 'open';

$sql = "SELECT * FROM games ORDER BY status ASC";
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