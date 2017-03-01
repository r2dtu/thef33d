<?php
session_start();
include 'error.php';

try{
  $conn = new PDO("mysql:host=localhost;dbname=thefeed", root, root);
}
catch(PDOException $e){
  error_out();
}

$username = $_POST['username'];
$password = $_POST['password'];

if($_POST['message'] == "login"){

  try {

    $q_result = $conn->query("SELECT * FROM accounts WHERE username='$username'")->fetch(PDO::FETCH_ASSOC);
    if($q_result["password"] != $password){
      $q_result["can_login"] = "no";
      echo json_encode($q_result);
      exit();
    }

    $q_result["can_login"] = "yes";
    echo json_encode($q_result);
    $_SESSION["username"] = $username;
    exit();
  }
  catch(PDOException $e){
    error_out();
  }

}else if($_POST['message'] == "create_account"){ //CASE: user is trying to create account

  try {
    $q_result = $conn->query("SELECT * FROM accounts WHERE username='$username'")->fetch(PDO::FETCH_ASSOC);

    if(isset($q_result["username"])){
      $q_result["can_create"] = "no";
      echo json_encode($q_result);
      exit();
    }

    $q_result["can_create"] = "yes";
    $statement = $conn->prepare("INSERT INTO accounts (username, password) VALUES ('$username', '$password')")->execute();
    $_SESSION["username"] = $username;
    echo json_encode($q_result);
    exit();

  }
  catch(PDOException $e){
    error_out();
  }

}else if($_POST["message"] == "forgot_password"){

  try{

    $q_result = $conn->query("SELECT password FROM accounts WHERE username='$username'")->fetch(PDO::FETCH_ASSOC);
    if(!isset($q_result["password"])){
      $email = $_POST["username"];
      $subject = "The Feed Forgotten Password";
      $message = "Hello. Looks like someone has tried to reset your The Feed password. However, we couldn't find this email in our system. Trying creating a new account! If this wasn't you, then ignore this message.";
      mail($email, $subject, $message);
      echo $email;
      exit();
    }

    $email = $_POST["username"];
    $subject = "The Feed Forgotten Password";
    $message = "Hello. Looks like you have forgotten your password for The Feed. Try this: " + $q_result;
    mail($email, $subject, $message);
    exit();
  }
  catch(PDOException $e){
    error_out();
  }
}

?>
