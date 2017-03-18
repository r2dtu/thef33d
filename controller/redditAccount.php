<?php

session_start();

include 'error.php';

try{
  $conn = new PDO("mysql:host=localhost;dbname=thefeed", root, WTF110lecture);
}catch(PDOException $e){
  error_out();
}


$username = $_SESSION["username"];


try{

if($_POST['message'] == "get_rtoken"){

  $q_result = $conn->query("SELECT r_rtoken FROM accounts WHERE username='$username'")->fetch(PDO::FETCH_ASSOC);

  $echo_back["rtoken"] = $q_result;

  echo json_encode($echo_back);

}else if($_POST['message'] == "store_rtoken"){

  $rtoken = $_POST["rtoken"];

  $statement = $conn->prepare("UPDATE accounts SET r_rtoken='$rtoken' WHERE username='$username'")->execute();

}

}

catch(PDOException $e){
error_out();
}

?>
