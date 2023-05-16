<?php 
$data = json_decode(file_get_contents('php://input'),true);

$taskname = $data['taskname'];
$description = $data['description'];

require('modules/connect.php');
//Method save dimulai dari sini..

$sql = "INSERT INTO todolist (taskname,description) VALUES ('$taskname','$description')";
if($mysqli -> query($sql)===true){
    echo "Data sudah tersimpan!";
}else{
    echo "Error" . $sql . "<br>" . $mysqli->error;
}

$mysqli -> close()
?>