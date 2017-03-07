<?php

session_start();

function error_out(){
  $q_result["error"] = "Connection failed: " . $e->getMessage();
  echo json_encode($q_result);
}
//$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

?>
