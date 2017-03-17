<?php

session_start();

try {

  $username = $_SESSION["username"];
  $conn = new PDO("mysql:host=localhost;dbname=thefeed", root, WTF110lecture);
  $result = $conn->query("SELECT first_name FROM accounts WHERE username='$username'")->fetchAll(PDO::FETCH_UNIQUE);
  echo json_encode($result);
}
catch (PDOException $e) {

}

?>
