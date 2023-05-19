<?php 
require('modules/connect.php');

$id = $_POST['id'];
$newTaskname = $_POST['taskname'];
$newDescription = $_POST['description'];

$sql = "UPDATE todolist SET taskname = '$newTaskname' AND description = '$newDescription' WHERE id='$id'";

if($mysqli -> query($sql) === TRUE){
    echo "Data Updated!";
}else{
    echo "Eror update data= " .$mysqli->error; 
}

$mysqli->close();


