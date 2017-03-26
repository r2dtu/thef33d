<?php

/*
 * File: gUser.php
 * Description: Our server side Google User class.
 */
class gUser {
		private $dbHost     = "localhost";
    private $dbUsername = "root";
    private $dbPassword = "WTF110lecture";
    private $dbName     = "thefeed";
    private $userTbl    = 'accounts';

    /*
     * Creates the database connection object.
     */
	function __construct() {
        if (!isset($this->db)) {
            // Connect to the database
            $conn = new mysqli($this->dbHost, $this->dbUsername, $this->dbPassword, $this->dbName);
            if ($conn->connect_error) {
                die("Failed to connect with MySQL: " . $conn->connect_error);
            } else {
                $this->db = $conn;
            }
        }
    }

    /*
     * Stores or updates the user's Google data in the database.
     * @TODO check if oauth_provider & oauth_uid are meant for our site (rather than some outside attacker).
     */
		function checkUser($userData = array()) {

        if (!empty($userData)) {

            //Check whether user data already exists in database
            $prevQuery = "SELECT * FROM ".$this->userTbl." WHERE oauth_provider = '".$userData['oauth_provider']."' AND oauth_uid = '".$userData['oauth_uid']."'";
            $prevResult = $this->db->query($prevQuery);

            if ($prevResult->num_rows < 1) {

                // Insert user data
		$query = "INSERT INTO ".$this->userTbl." (username, first_name, oauth_provider, oauth_uid) VALUES
		('".$userData['email']."',
		'".$userData['first_name']."',
                '".$userData['oauth_provider']."',
                '".$userData['oauth_uid']."')";
                $insert = $this->db->query($query);
            }

            // Get user data from the database
            $result = $this->db->query($prevQuery);
            $userData = $result->fetch_assoc();
        }

        return $userData;
    }
}
?>
