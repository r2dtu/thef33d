<?php

session_start();

include 'error.php';


try{
  $conn = new PDO("mysql:host=localhost;dbname=thefeed", root, root);
}catch(PDOException $e){
  error_out();
}


$username = $_SESSION["username"];

if($_POST['message'] == "link_y"){

  try{
    $y_id = $_POST["y_id"];

    $statement = $conn->prepare("UPDATE accounts SET y_id='$y_id' WHERE username='$username'")->execute();
  }

  catch(PDOException $e){
    error_out();
  }

}else if($_POST['message'] == "link_r"){

}else if($_POST['message'] == "link_p"){

}
 ?>
