<?php

    // Log in using Google Sign-In Auth 2.0
    session_start();

    // Include Google client library 
    include_once 'src/Google_Client.php';
    include_once 'src/contrib/Google_Oauth2Service.php';

    // Configuration and setup Google API
    $clientId = '139115646685-qmbuj1k1tul57ns973bh2dtvqfi9tknd.apps.googleusercontent.com'; // ########-absdj######.apps.googleusercontent.com
    $clientSecret = 'cmB7NFc0s3NFVgumQ3nmvWc1'; //
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