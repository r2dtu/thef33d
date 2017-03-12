<?php

    // Include GP config file && User class
    include_once 'gpConfig.php';
    include_once 'gUser.php';

    // If we have a code back from OAuth 2.0, need to exchange with authenticate() function. We store the token in the session, and redirect to ourself.
    if(isset($_GET['code'])) {
        $gClient->authenticate($_GET['code']);
        $_SESSION['token'] = $gClient->getAccessToken();
        header('Location: ' . filter_var($redirectURL, FILTER_SANITIZE_URL));
    }

    // If we have an access token, we can make requests
    if (isset($_SESSION['token'])) {
        $gClient->setAccessToken($_SESSION['token']);
    } else {
        $authUrl = $gClient->createAuthUrl();
//        $output = '<a href="'.filter_var($authUrl, FILTER_SANITIZE_URL).'"><img src="images/glogin.png" alt=""/></a>';
        
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
            'first_name'    => 'given_name',
            'last_name'     => 'family_name',
            'oauth_uid'     => $gpUserProfile['id'],
            'email'         => $gpUserProfile['email'],
        );
        $userData = $user->checkUser($gpUserData);
        
        //Storing user data into session
        $_SESSION['userData'] = $userData;
        
        header('Location: http://'.$_SERVER['HTTP_HOST'].'/index.html');
        die();
    }
?>
