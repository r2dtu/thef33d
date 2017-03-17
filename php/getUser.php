<?php
include 'error.php';

if (!isset($_SESSION["username"])) {
  die("Please log into the site.");
}

try {
  $conn = new PDO("mysql:host=localhost;dbname=thefeed", root, WTF110lecture);

  $username = $_SESSION["username"];

  /* GET ALL OF USER'S CATEGORIES */
  $result = $conn->query("SELECT first_name FROM accounts WHERE username='$username'")->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($result);
  exit();

}

catch(PDOException $e) {
  error_out();
}

?>
