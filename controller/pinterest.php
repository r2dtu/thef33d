<?php
session_start();
include 'error.php';

try{
  $conn = new PDO("mysql:host=localhost;dbname=thefeed", root, WTF110lecture);
}
catch(PDOException $e){
  error_out();
}

$username = $_POST['username'];


$categories_info = $conn->query("SELECT * FROM categories WHERE username='$username'")->fetch(PDO::FETCH_UNIQUE);

foreach($categories_info as $c_id => $c_data){


  


}
