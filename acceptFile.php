<?php

ini_set('display_errors',1);
error_reporting(E_ALL);
//if they DID upload a file...
if($_FILES['photo']['name'])
{
	//if no errors...
	if(!$_FILES['photo']['error'])
	{

		$valid_file = true;
		if($_FILES['photo']['size'] > (1024000)) //can't be larger than 1 MB
		{
			$valid_file = false;
			$message = 'Oops!  Your file\'s size is to large.';
			echo $message;
		}

		//if the file has passed the test
		if($valid_file)
		{
			//move it to where we want it to be
			$targetfolder = "uploads/";
			if (!file_exists($targetfolder)) {
				mkdir($targetfolder, 0777, true);
			}
			$targetfolder = $targetfolder . basename( $_FILES['photo']['name']);
			if (move_uploaded_file($_FILES['photo']['tmp_name'], $targetfolder)) {
				echo "The file ". basename( $_FILES['photo']['name']). " is uploaded";
			}
			else {
				echo "Problem :(";
			}
		}
	}
	//if there is an error...
	else
	{
		//set that to be the returned message
		$message = 'Ooops!  Your upload triggered the following error:  '.$_FILES['photo']['error'];
		echo $message;
	}

}
?>
