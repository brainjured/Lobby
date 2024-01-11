<?php
session_start();
require_once '../conf/connect.php';

$stat1 = 'close';
$id = $_POST['id'];
$name = $_SESSION['row']['name'];
$login = $_SESSION['row']['login'];
$score = $_SESSION['row']['score'];
$games = $_SESSION['row']['games'];
mysqli_query($connection, "UPDATE games SET status = (\"$stat1\") WHERE id = (\"$id\");");

header("Location: http://192.168.0.104:3000/?nick={$name}&login={$login}&score={$score}&games={$games}");
?>