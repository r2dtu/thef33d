<?php

ini_set('display_errors',1);
error_reporting(E_ALL);

if($_FILES['photo']['name']) {

	if(!$_FILES['photo']['error']) {
		$valid_file = true;
		if($_FILES['photo']['size'] > (1024000)) {
			$valid_file = false;
			die('Your file\'s size is too large. File size must be <= 1MB');
		}
		if(!getimagesize($_FILES['photo']['tmp_name'])) {
			die("Please make sure you are uploading an image.");
		}

		if($valid_file) {

			$username = "dctu@ucsd.edu";
			$targetfolder = "../bg_images/" + $username;
			if (!file_exists($targetfolder)) {
				// THIS DOES NOT WORK ON THE HOST SERVER!!!!!
				mkdir($targetfolder, 0777, true);
			}
			$targetfolder = $targetfolder . basename($_FILES['photo']['name']);
			if (move_uploaded_file($_FILES['photo']['tmp_name'], $targetfolder)) {
				echo("The file ". basename( $_FILES['photo']['name']). " is uploaded");
			}
			else {
				die("Problem uploading file. Please try again later.");
			}
		}
	}	else {
		die('Your upload triggered the following error:  '.$_FILES['photo']['error']);
	}
}
?>
