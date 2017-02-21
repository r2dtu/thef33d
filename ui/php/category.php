<?php
session_start();

include 'error.php';

try{
  $conn = new PDO("mysql:host=localhost;dbname=cseclasses", root, root);
}
catch(PDOException $e){
  error_out();
}

$category_name = $_POST['category_name'];
$username = $_SESSION["username"];

if($_POST['message'] == "create_category"){

  try {

    $q_result = $conn->query("SELECT * FROM categories WHERE username='$username' AND category_name='$category_name'")->fetch(PDO::FETCH_ASSOC);

    if(isset($q_result["category_name"])){
      $q_result["can_create"] = "no";
      echo json_encode($q_result);
      exit();
    }
    $id = uniqid();
    $statement = $conn->prepare("INSERT INTO categories (id, category_name, username) VALUES ('$id', '$category_name', '$username')")->execute();
    $q_result["can_create"] = "yes";
    echo json_encode($q_result);
    exit();

  }
  catch(PDOException $e){
    error_out();
  }

}else if($_POST['message'] == "update_img"){

  try{

    $img_url = $_POST['img_url'];

    $q_result = $conn->query("SELECT * FROM categories WHERE username='$username' AND category_name='$category_name'")->fetch(PDO::FETCH_ASSOC);

    $id = $q_result["id"];

    $statement = $conn->prepare("UPDATE categories SET img_url='$img_url' WHERE id='$id'")->execute();

  }
  catch(PDOException $e){
    error_out();
  }

}else if($_POST['message'] == "update_name"){

  try{

    $new_name = $_POST['new_name'];

    $q_result = $conn->query("SELECT * FROM categories WHERE username='$username' AND category_name='$new_name'")->fetch(PDO::FETCH_ASSOC);

    if(isset($q_result["category_name"])){
      $q_result["can_update"] = "no";
      echo json_encode($q_result);
      exit();
    }

    $q_result = $conn->query("SELECT * FROM categories WHERE username='$username' AND category_name='$category_name'")->fetch(PDO::FETCH_ASSOC);

    $id = $q_result["id"];

    $statement = $conn->prepare("UPDATE categories SET category_name='$new_name' WHERE id='$id'")->execute();

    $q_result["can_update"] = "yes";
    echo json_encode($q_result);
    exit();

  }
  catch(PDOException $e){
    error_out();
  }
}

?>
