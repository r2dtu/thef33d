<?php

session_start();

/*
 * $monster_data => {

 *   "$Cats videos" => {

 *     "background_img" => "$local_background_img_url";

 *     "y_subs" => {
 *       "$y_sub_id_1",
 *       "$y_sub_id_2",
 *       "$y_sub_id_3",
 *     },

 *     "$r_subs" => {
 *       "$r_sub_id_1",
 *       "$r_sub_id_2",
 *     },

 *     "p_subs" => {
 *       "$p_sub_id_1",
 *       "$p_sub_id_2",
 *       "$p_sub_id_3",
 *       "$p_sub_id_4",
 *     };
 *   },

 *   "$Cooking videos" => {

 *     "background_img" => "$local_background_img_url";

 *     "y_subs" => {
 *       "$y_sub_id_1",
 *       "$y_sub_id_2",
 *       "$y_sub_id_3",
 *     },

 *     "$r_subs" => {
 *       "$r_sub_id_1",
 *       "$r_sub_id_2",
 *     },

 *     "p_subs" => {
 *       "$p_sub_id_1",
 *       "$p_sub_id_2",
 *       "$p_sub_id_3",
 *       "$p_sub_id_4",
 *     };
 *   };
 * };
 */

include 'error.php';

try{

  $conn = new PDO("mysql:host=localhost;dbname=cseclasses", root, root);

  $username = $_SESSION["username"];

  /* GET ALL OF USER'S CATEGORIES */
  $query_categories = $conn->query("SELECT * FROM categories WHERE username='$username'")->fetchAll(PDO::FETCH_UNIQUE);


  /* LOOP THROUGH EVERY CATEGORY AND GET CATEGORY INFORMATION */
  foreach($query_categories as $category_data){


    $category_name = $category_data["category_name"];
    $background_img = $category_data["background_img"];


    $monster_data["$category_name"]["background_img"] = $background_img;


    $query = $conn->query("SELECT y_sub FROM y_subs WHERE username='$username' AND category_name='$category_name'")->fetchAll(PDO::FETCH_COLUMN);
    $y_subs = array();
    foreach($query as $y_sub){
      array_push($y_subs, $y_sub);
    }
    $monster_data["$categoryname"]["y_subs"] = $y_subs;


    $query = $conn->query("SELECT r_sub FROM r_subs WHERE username='$username' AND category_name='$category_name'")->fetchAll(PDO::FETCH_COLUMN);
    $r_subs = array();
    foreach($query as $r_sub){
      array_push($r_subs, $r_sub);
    }
    $monster_data["$categoryname"]["r_subs"] = $r_subs;


    $query = $conn->query("SELECT p_sub FROM p_subs WHERE username='$username' AND category_name='$category_name'")->fetchAll(PDO::FETCH_COLUMN);
    $p_subs = array();
    foreach($query as $p_sub){
      array_push($p_subs, $p_sub);
    }
    $monster_data["$categoryname"]["p_subs"] = $p_subs;

  }

  echo json_encode($monster_data);

}

catch(PDOException $e){
  error_out();
}

?>
