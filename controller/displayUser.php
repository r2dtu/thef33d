<?php

session_start();

include 'error.php';

if (!isset($_SESSION["username"])) {
  die("Please log into the site.");
}

try{
  $conn = new PDO("mysql:host=localhost;dbname=thefeed", root, WTF110lecture);

  $username = $_SESSION["username"];

  /* GET ALL OF USER'S CATEGORIES */
  $monster_data = $conn->query("SELECT * FROM categories WHERE username='$username'")->fetchAll(PDO::FETCH_UNIQUE);

  /* LOOP THROUGH EVERY CATEGORY AND GET CATEGORY INFORMATION */
  foreach($monster_data as $c_id => $category_data){

    $query = $conn->query("SELECT sub_id FROM y_subs WHERE c_id='$c_id'")->fetchAll(PDO::FETCH_COLUMN);

    $y_subs = array();
    foreach($query as $sub_id){
        array_push($y_subs, $sub_id);
    }

    $monster_data["$c_id"]["y_subs"] = $y_subs;

    $r_subs = array();
    $query = $conn->query("SELECT sub_name FROM r_subs WHERE c_id='$c_id'")->fetchAll(PDO::FETCH_COLUMN);
    foreach($query as $sub_name){
      array_push($r_subs, $sub_name);
    }
    $monster_data["$c_id"]["r_subs"] = $r_subs;

    $p_subs = array();
    $query = $conn->query("SELECT sub_id FROM p_subs WHERE c_id='$c_id'")->fetchAll(PDO::FETCH_COLUMN);
    foreach($query as $sub_id){
      array_push($p_subs, $sub_id);
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
