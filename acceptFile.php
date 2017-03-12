<?php

ini_set('display_errors',1);
error_reporting(E_ALL);
//if they DID upload a file...
if($_FILES['photo']['name'])
{
	//if no errors...
	if(!$_FILES['photo']['error'])
	{
		//now is the time to modify the future file name and validate the file
		$new_file_name = strtolower($_FILES['photo']['tmp_name']); //rename file
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
			if (!file_exists($_SERVER['HTTP_HOST']."uploads")) {
				mkdir($_SERVER['HTTP_HOST']."uploads", 0777, true);
			}
			if (move_uploaded_file($_FILES['photo']['tmp_name'], getcwd().'/uploads'.$new_file_name)) {
				$message = 'Congratulations!  Your file was accepted. Stored in: '.getcwd().'/uploads'.$new_file_name;
				echo $message;
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
