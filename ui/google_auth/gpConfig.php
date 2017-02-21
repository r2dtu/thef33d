<?php

    // Log in using Google Sign-In Auth 2.0
    session_start();

    // Include Google client library 
    include_once 'src/Google_Client.php';
    include_once 'src/contrib/Google_Oauth2Service.php';

    // Configuration and setup Google API
    $clientId = 'CLIENT_ID'; // ########-absdj######.apps.googleusercontent.com
    $clientSecret = 'CLIENT_SECRET'; //
    $redirectURL = 'http://'.$_SERVER['HTTP_HOST'].'/google_auth/index.php';

    // Call Google API
    $gClient = new Google_Client();
    $gClient->setApplicationName('Login to The Feed w/ Google');
    $gClient->setClientId($clientId);
    $gClient->setClientSecret($clientSecret);
    $gClient->setRedirectUri($redirectURL);

    // Call Google's OAuth 2.0
    $google_oauthV2 = new Google_Oauth2Service($gClient);

?>