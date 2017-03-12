<?php
session_start();

/********* OPEN PDO DATABASE CONNECTION *********/
$conn = new PDO("mysql:host=localhost;dbname=thefeed", root, WTF110lecture);

$username = $_SESSION["username"];
$message = $_POST["message"];
$c_id = $_POST["c_id"];
$c_newname = $_POST['c_newname'];
//$c_img


if(isset($c_newname)){
  $q_result = $conn->query("SELECT c_id FROM categories WHERE username='$username' AND c_name='$c_newname'")->fetchColumn();
  if(isset($q_result){
    $result["can_update_or_create"] = "no";
    echo json_encode($result);
    exit();
  } 
}


if($_POST['message'] == "create"){

    $c_id = uniqid();
    $statement = $conn->prepare("INSERT INTO categories (c_id, c_name, username, img) VALUES ('$c_id', '$c_newname', '$username', '$c_img')")->execute();
    $result["can_create"] = "yes";
    echo json_encode($result);
    exit();

}else if($_POST['message'] == "update"){


    if(isset($c_newname)){

      $statement = $conn->prepare("UPDATE categories SET c_name='$c_newname' WHERE c_id='$c_id'")->execute();
    }

    if(isset($c_img)){

      $statement = $conn->prepare("UPDATE categories SET img='$c_img' WHERE c_id='$c_id'")->execute();
    }
}

$result["can_update_or_create"] = "yes";
echo json_encode($result);

?>
