<?php

session_start();

//include '../youtube_api/YouTube_API.php';
include 'error.php';

try{
  $conn = new PDO("mysql:host=localhost;dbname=thefeed", root, WTF110lecture);

  $username = $_SESSION["username"];
  $username = "dctu@ucsd.edu";

  /* GET ALL OF USER'S CATEGORIES */
  $monster_data = $conn->query("SELECT * FROM categories WHERE username='$username'")->fetchAll(PDO::FETCH_UNIQUE);

  /* LOOP THROUGH EVERY CATEGORY AND GET CATEGORY INFORMATION */
  foreach($monster_data as $c_id => $category_data){

    $query = $conn->query("SELECT sub_id FROM y_subs WHERE c_id='$c_id'")->fetchAll(PDO::FETCH_COLUMN);

    $y_links = array();

    foreach($query as $sub_id){
       //$tmp_links = getChannelVideos($sub_id);
       $tmp_links = dummyIds();

       foreach($tmp_links as $y_link){
         array_push($y_links, $y_link);
       }
    }

    $monster_data["$c_id"]["y_links"] = $y_links;

    /*
    $query = $conn->query("SELECT sub_id FROM r_subs WHERE c_id='$c_id'")->fetchAll(PDO::FETCH_COLUMN);
    $r_subs = array();
    foreach($query as $sub){
      array_push($r_subs, $sub);
    }
    $monster_data["$c_id"]["r_subs"] = $r_subs;


    $query = $conn->query("SELECT board_id FROM p_subs WHERE c_id='$c_id'")->fetchAll(PDO::FETCH_COLUMN);
    $p_subs = array();
    foreach($query as $sub){
      array_push($p_subs, $sub);
    }
    $monster_data["$c_id"]["p_subs"] = $p_subs;
    */
  }
  $monster_data["username"] = $username;
  echo json_encode($monster_data);

}

catch(PDOException $e){
  error_out();
}


function dummyIds(){
  $arr = array();
  array_push($arr, uniqid());
  array_push($arr, uniqid());
  array_push($arr, uniqid());
  array_push($arr, uniqid());
  return $arr;
}

?>
