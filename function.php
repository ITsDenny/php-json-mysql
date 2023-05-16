<?php 
require('modules\connect.php');

$sql = "SELECT * FROM todolist";
$result = $mysqli->query($sql);

if ($result -> num_rows > 0){
    $data = array();

    while ($row = $result->fetch_assoc()){
        $data[] = $row;
    }

    echo json_encode($data);
} else{
    echo json_encode(array("message" => "Data tidak ada"));
}

$mysqli -> close();

?>