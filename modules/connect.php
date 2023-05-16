<?php 
$host = "localhost";
$username = "root";
$pswd = "";
$database = "todoapp";


$mysqli = new mysqli($host, $username, $pswd, $database);

if($mysqli -> connect_error){
    die("Koneksi gagal: " . $mysqli->connect_error);
}


?>