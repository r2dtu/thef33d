<?php

session_start();

/*
 * $monster_data => {

 *   "$id" => {

 *     "category_name" => "$category_name"
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

 *   "$id" => {

 *     "category_name" => "$category_name"
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

  $conn = new PDO("mysql:host=localhost;dbname=thefeed", root, root);

  $username = $_SESSION["username"];

  /* GET ALL OF USER'S CATEGORIES */
  $monster_data = $conn->query("SELECT * FROM categories WHERE username='$username'")->fetchAll(PDO::FETCH_UNIQUE);

  /* LOOP THROUGH EVERY CATEGORY AND GET CATEGORY INFORMATION */
  foreach($monster_data as $c_id => $category_data){

    $query = $conn->query("SELECT sub FROM y_subs WHERE c_id='$c_id'")->fetchAll(PDO::FETCH_COLUMN);
    $y_subs = array();
    foreach($query as $sub){
      array_push($y_subs, $sub);
    }
    $monster_data["$c_id"]["y_subs"] = $y_subs;


    $query = $conn->query("SELECT sub FROM r_subs WHERE c_id='$c_id'")->fetchAll(PDO::FETCH_COLUMN);
    $r_subs = array();
    foreach($query as $sub){
      array_push($r_subs, $sub);
    }
    $monster_data["$c_id"]["r_subs"] = $r_subs;


    $query = $conn->query("SELECT sub FROM p_subs WHERE c_id='$c_id'")->fetchAll(PDO::FETCH_COLUMN);
    $p_subs = array();
    foreach($query as $sub){
      array_push($p_subs, $sub);
    }
    $monster_data["$c_id"]["p_subs"] = $p_subs;

  }

  $monster_data["username"] = $username;

  echo json_encode($monster_data);

}

catch(PDOException $e){
  error_out();
}

?>
