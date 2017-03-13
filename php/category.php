<?php
session_start();

/********* OPEN PDO DATABASE CONNECTION *********/
$conn = new PDO("mysql:host=localhost;dbname=thefeed", root, WTF110lecture);

$username = $_SESSION["username"];
$message = $_POST["message"];
$c_id = $_POST["c_id"];
$c_newname = $_POST["c_newname"];
$subs = $_POST["subs"];
$c_img = $_POST["c_img"];

if($c_newname){
  $q_result = $conn->query("SELECT c_id FROM categories WHERE username='$username' AND c_name='$c_newname'")->fetchColumn();
  if($q_result){
    $result["can_update_or_create"] = "no";
    echo json_encode($result);
    exit();
  }
}

if($message == "create"){

    $c_id = uniqid();
    $statement = $conn->prepare("INSERT INTO categories (c_id, c_name, username, img) VALUES ('$c_id', '$c_newname', '$username', '$c_img')")->execute();
    $result["can_create"] = "yes";
    echo json_encode($result);
    exit();

} else if($message == "update"){

    if($c_newname){

      $statement = $conn->prepare("UPDATE categories SET c_name='$c_newname' WHERE c_id='$c_id'")->execute();
    }

    if($c_img){

      $statement = $conn->prepare("UPDATE categories SET img='$c_img' WHERE c_id='$c_id'")->execute();
    }

    if ($subs) {
      $result = $conn->prepare("DELETE FROM y_subs WHERE c_id='$c_id'")->execute();
      foreach ($subs as $sub_name => $sub_id) {
        $result = $conn->prepare("INSERT INTO y_subs (c_id, sub_name, sub_id) VALUES ('$c_id', '$sub_name', '$sub_id')")->execute();
      }
    }

} else if($message == "deleteCategory"){

    $q_result = $conn->prepare("DELETE FROM categories WHERE c_id='$c_id'")->execute();
    $q_result = $conn->prepare("DELETE FROM y-subs WHERE c_id='$c_id'")->execute();
    $q_result = $conn->prepare("DELETE FROM p_subs WHERE c_id='$c_id'")->execute();
    $q_result = $conn->prepare("DELETE FROM r_subs WHERE c_id='$c_id'")->execute();

}

$result["can_update_or_create"] = "yes";
echo json_encode($result);

?>
