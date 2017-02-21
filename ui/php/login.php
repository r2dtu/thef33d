<?php
session_start();
include 'error.php';

try{
  $conn = new PDO("mysql:host=localhost;dbname=cseclasses", root, root);
}
catch(PDOException $e){
  error_out();
}


if($_POST['message'] == "login"){ //CASE: user is trying to log in

  $username = $_POST['username'];
  $password = $_POST['password'];

  try {
    //$result = $conn->query("SELECT * FROM accounts WHERE username='$username'");
    //$q_result = $result->fetch(PDO::FETCH_ASSOC);
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

  $username = $_POST['username'];
  $password = $_POST['password'];

  try {
    $q_result = $conn->query("SELECT * FROM accounts WHERE username='$username'")->fetch(PDO::FETCH_ASSOC);

    if(isset($q_result["username"])){
      $q_result["can_create"] = "no";
      echo json_encode($q_result);
      exit();
    }

    $q_result["can_create"] = "yes";
    $statement = $conn->prepare("INSERT INTO accounts (username, password) VALUES ('$username', '$password')")->execute();
    echo json_encode($q_result);
    exit();

  }
  catch(PDOException $e){
    error_out();
  }

}

?>
