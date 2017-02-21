<?php
session_start();
include 'error.php';

try{
  $conn = new PDO("mysql:host=localhost;dbname=cseclasses", root, root);

  $username = $_SESSION["username"];

  $query_categories = $conn->query("SELECT * FROM categories WHERE username='$username'")->fetchAll(PDO::FETCH_UNIQUE);

  foreach($query_categories as $category_data){


    $category_name = $category_data["category_name"];
    $background_img = $category_data["background_img"];


    $monster_data["$category_name"]["background_img"] = $background_img;


    $query = $conn->query("SELECT y_sub FROM y_subs WHERE username='$username' AND category_name='$category_name'")->fetchAll(PDO::FETCH_COLUMN);
    foreach($y_query as $y_sub){
      $monster_data["$categoryname"]["y_subs"]["$y_sub"] = 1;
    }


    $query = $conn->query("SELECT r_sub FROM r_subs WHERE username='$username' AND category_name='$category_name'")->fetchAll(PDO::FETCH_COLUMN);
    foreach($query as $r_sub){
      $monster_data["$categoryname"]["r_subs"]["$r_sub"] = 1;
    }


    $query = $conn->query("SELECT p_sub FROM p_subs WHERE username='$username' AND category_name='$category_name'")->fetchAll(PDO::FETCH_COLUMN);
    foreach($query as $p_sub){
      $monster_data["$categoryname"]["p_subs"]["$p_sub"] = 1;
    }

  }

  echo json_encode($monster_data);

}

catch(PDOException $e){
  error_out();
}

?>
