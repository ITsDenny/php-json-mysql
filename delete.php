<?php 
require("modules/connect.php");

$id = $_POST['id'];

$sql = "DELETE FROM todolist WHERE id = $id";

if($mysqli -> query($sql)===TRUE){
    echo "Data berhasil dihapus";
} else{
    echo "Error : ". $sql ."<br>".$mysqli->error;
}

$mysqli->close();
?>