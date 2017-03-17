<?php

require_once 'composer/vendor/autoload.php';
session_start();

$scriptUri = "http://".$_SERVER["HTTP_HOST"].$_SERVER['PHP_SELF'];

// Call Google API
$client = new Google_Client();
$client->setAccessType('online');
$client->setApplicationName('The Feed');
$client->setClientId('139115646685-qmbuj1k1tul57ns973bh2dtvqfi9tknd.apps.googleusercontent.com');
$client->setClientSecret('cmB7NFc0s3NFVgumQ3nmvWc1');
$client->setRedirectUri($scriptUri);
$client->setDeveloperKey('AIzaSyA_dZuW2zI5FXBM63OsE7DIctXwhMAib3o'); // API key
$client->addScope(Google_Service_Youtube::YOUTUBE);
$client->addScope(Google_Service_Youtube::YOUTUBE_FORCE_SSL);
$client->addScope(Google_Service_Youtube::YOUTUBE_READONLY);
$client->addScope(Google_Service_Youtube::YOUTUBEPARTNER);

// If we haven't yet received auth code from a session, call Google's Auth URL creator
if (! isset($_GET['code'])) {
    $auth_url = $client->createAuthUrl();
    echo "GET CODE IS NOT SET";
    echo $auth_url;
    //header('Location: ' . filter_var($auth_url, FILTER_SANITIZE_URL));
}

// Otherwise, we can exchange it for an access token, and redirect to the main site (if logged in)
else {
    $client->authenticate($_GET['code']);
    $_SESSION['youtube_access_token'] = $client->getAccessToken();
    $_SESSION['youtube_refresh_token'] = $client->getRefreshToken();
    $redirect_uri = 'http://' . $_SERVER['HTTP_HOST'] . '/';
    echo "GET CODE IS SET IN OAUTH2";
    echo $_GET['code'];
    echo $client->getAccessToken();
    echo $client->getRefreshToken();
    echo $redirect_uri;
    //header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL));
}

?>
