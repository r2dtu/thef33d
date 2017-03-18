<?php
/*
 * File: login.php
 * Description: This file handles the login of a user. Only accounts that exist
 *              in the database with a username and password (encrypted) will be
 *              able to login. Those with just a user name must have signed in
 *              with Google, and must continue to do so. This also handles
 *              forgotten password retrieval and account creation.
 */

session_start();
include 'error.php';

try{
  $conn = new PDO("mysql:host=localhost;dbname=thefeed", root, WTF110lecture);
}
catch(PDOException $e) {
  error_out();
}

// Get the user name, password, and what kind of account mode we're in
$first_name = $_POST['first_name'];
$username = $_POST['username'];
$password = $_POST['password'];
$message = $_POST["message"];

// For forgotten password retrieval & creating account
$question = $_POST["security_question"];
$answer = $_POST["security_answer"];

// Encrypt the password with BCrypt. Optional - we can change the cost
//$enc_pwd = password_hash($password, PASSWORD_DEFAULT);
$enc_pwd = $password;

if ($message == "login") {
  try {
    $q_result = $conn->query("SELECT * FROM accounts WHERE username='$username'")->fetch(PDO::FETCH_ASSOC);
  }
  catch (PDOException $e) {
    error_out();
  }
  if (!$q_result) {
    $q_result["can_login"] = "no";
    echo json_encode($q_result);
    exit();
  }
  if ($q_result["password"] != $enc_pwd) {
    $q_result["can_login"] = "no";
    echo json_encode($q_result);
    exit();
  }

  // Google Sign-In
  if (!$q_result["password"] && $q_result["oauth_provider"] == 'google') {
    $q_result["can_login"] = "google";
    echo json_encode($q_result);
    exit();
  }

  $q_result["can_login"] = "yes";
  echo json_encode($q_result);
  $_SESSION["username"] = $username;

} else if ($message == "create_account") {
  $q_result = $conn->query("SELECT * FROM accounts WHERE username='$username'")->fetch(PDO::FETCH_ASSOC);

  if (isset($q_result["username"])) {
    $q_result["can_create"] = "no";
    echo json_encode($q_result);
    exit();
  }

  $q_result["can_create"] = "yes";
  $statement = $conn->prepare("INSERT INTO accounts (username, password, first_name) VALUES ('$username', '$enc_pwd', '$first_name')")->execute();
  $statement = $conn->prepare("UPDATE accounts SET security_answer='$answer' WHERE username='$username'")->execute();
  $statement = $conn->prepare("UPDATE accounts SET s_question='$question' WHERE username='$username'")->execute();
  $_SESSION["username"] = $username;
  echo json_encode($q_result);

} else if ($message == "forgot_password") {

  $q_result = $conn->query("SELECT * FROM accounts WHERE username='$username'")->fetch(PDO::FETCH_ASSOC);
  if ($q_result["s_question"] == $question && $q_result["security_answer"] == $answer) {
    $result["password"] = $q_result["password"];
    $result["display_password"] = "yes";
  } else {
    $result["display_password"] = "no";
  }
  echo json_encode($result);
}

?>
