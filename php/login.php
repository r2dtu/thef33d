<?php
session_start();
//ini_set('display_errors',1);
//error_reporting(E_ALL);
include 'error.php';

try{
  $conn = new PDO("mysql:host=localhost;dbname=thefeed", root, WTF110lecture);
}
catch(PDOException $e){
  error_out();
}

$username = $_POST['username'];
$password = $_POST['password'];
$message = $_POST["message"];

$question = $_POST["security_question"];
$answer = $_POST["security_answer"];

if($message == "login"){
  try{
    $q_result = $conn->query("SELECT * FROM accounts WHERE username='$username'")->fetch(PDO::FETCH_ASSOC);
  }
  catch(PDOException $e){
    error_out();
  }
  if($q_result["password"] != $password){
    $q_result["can_login"] = "no";
    echo json_encode($q_result);
    exit();
  }

  $q_result["can_login"] = "yes";
  echo json_encode($q_result);
  $_SESSION["username"] = $username;

}else if($message == "create_account"){ //CASE: user is trying to create account

  $q_result = $conn->query("SELECT * FROM accounts WHERE username='$username'")->fetch(PDO::FETCH_ASSOC);

  if(isset($q_result["username"])){
    $q_result["can_create"] = "no";
    echo json_encode($q_result);
    exit();
  }

  $q_result["can_create"] = "yes";
  $statement = $conn->prepare("INSERT INTO accounts (username, password, security_question, security_answer) VALUES ('$username', '$password', '$question', '$answer')")->execute();
  $_SESSION["username"] = $username;
  echo json_encode($q_result);

}else if($message == "forgot_password"){

  $q_result = $conn->query("SELECT * FROM accounts WHERE username='$username'")->fetch(PDO::FETCH_ASSOC);
  if($q_result["security_question"] == $question && $q_result["security_answer"] == $answer){
    $result["password"] = $q_result["password"];
    $result["display_password"] = "yes";
  }
  echo json_encode($result);
}

?>
