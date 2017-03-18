<?php
/*
 * File: google_auth.php
 * Description: Handles the authorization for our site to use a user's Google
 *              account. The user must allow permission.
 */

    // Include GP config file && User class
    require 'gpConfig.php';
    require 'gUser.php';

    // If we have a code back from OAuth 2.0, need to exchange with
    // authenticate() function. We store the token in the session, and redirect
    // to ourself.
    if(isset($_GET['code'])) {
        $gClient->authenticate($_GET['code']);
        $_SESSION['token'] = $gClient->getAccessToken();
        // $refreshToken = $gClient->getRefreshToken();
        // try {
        //   $conn = new PDO("mysql:host=localhost;dbname=thefeed", root, WTF110lecture);
        //   $statement = $conn->prepare("UPDATE accounts SET google_token='$refreshToken' WHERE username='$username'")->execute();
        // } catch (PDOException $e) {
        //   echo ("DATABASE ERROR");
        // }
        header('Location: ' . filter_var($redirectURL, FILTER_SANITIZE_URL));
    }

    // If we have an access token, we can make requests - otherwise, authorize
    if (isset($_SESSION['token'])) {
        $gClient->setAccessToken($_SESSION['token']);
    } else {

        // Check for refresh token
        // try {
        //   $conn = new PDO("mysql:host=localhost;dbname=thefeed", root, WTF110lecture);
        //   $statement = $conn->prepare("UPDATE accounts SET google_token='$refreshToken' WHERE username='$username'")->execute();
        // } catch (PDOException $e) {
        //   echo ("DATABASE ERROR");
        // }
        $authUrl = $gClient->createAuthUrl();
        header('Location: ' . filter_var($authUrl, FILTER_SANITIZE_URL));
        die();
    }

    // If we're signed in, we can retrieve the ID token
    if ($gClient->getAccessToken()) {

        // Get user profile data from google
        $gpUserProfile = $google_oauthV2->userinfo->get();

        // Initialize User class
        $user = new gUser();

        // Insert or update user data to the database
        $gpUserData = array(
            'oauth_provider'=> 'google',
            'first_name'    => $gpUserProfile['given_name'],
            'last_name'     => $gpUserProfile['family_name'],
            'oauth_uid'     => $gpUserProfile['id'],
            'email'         => $gpUserProfile['email'],
        );
        $userData = $user->checkUser($gpUserData);

        // Storing user data into session
        $_SESSION['userData'] = $userData;
        $_SESSION['username'] = $gpUserData['email'];

        header('Location: http://'.$_SERVER['HTTP_HOST'].'/');
        die();
    }
?>
