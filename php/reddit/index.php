<?php
session_start();
include 'error.php';

// Connect to database
try{
    $conn = new PDO("mysql:host=localhost;dbname=thefeed", root, WTF110lecture);
}catch(PDOException $e){
  error_out();
}

// Get f33d username
$username = $_SESSION["username"];

if (isset($_GET["error"]))
{
    echo("<pre>OAuth Error: " . $_GET["error"]."\n");
    echo('<a href="index.php">Retry</a></pre>');
    die;
}

$authorizeUrl = 'https://ssl.reddit.com/api/v1/authorize';
$accessTokenUrl = 'https://ssl.reddit.com/api/v1/access_token';
$clientId = '8-kkjNXlTfpV0Q';
$clientSecret = 'J6W5Y5UgCiJssMxapEGtsIX4Ebk';
$userAgent = 'Reddit Functionality for thef33d.me by /u/teamfeed';

$redirectUrl = "http://thef33d.me/php/reddit/";

require("Client.php");
require("GrantType/IGrantType.php");
require("GrantType/AuthorizationCode.php");
//echo "HelloO";
$client = new OAuth2\Client($clientId, $clientSecret, OAuth2\Client::AUTH_TYPE_AUTHORIZATION_BASIC);
//echo "hello";
$client->setCurlOption(CURLOPT_USERAGENT,$userAgent);

if (!isset($_GET["code"])){
    echo("Code not set");
    $authUrl = $client->getAuthenticationUrl($authorizeUrl, $redirectUrl, array("scope" => "read identity mysubreddits", "state" => "SomeUnguessableValue","duration"=>"permanent"));
    header("Location: ".$authUrl);
    die("Redirect");
}
else
{
    $params = array("code" => $_GET["code"], "redirect_uri" => $redirectUrl);
    $response = $client->getAccessToken($accessTokenUrl, "authorization_code", $params);
    $accessTokenResult = $response["result"];
    $rtoken = $accessToeknResult["refresh_token"];

    // Store refresh token in database to be retrieved by javascript
    try{
        $statement = $conn->prepare("UPDATE accounts SET r_rtoken='$rtoken' WHERE username='$username'")->execute();
    }
    catch(PDOException $e){
        error_out();
    }

    //$client->setAccessToken($accessTokenResult["access_token"]);
    //$client->setAccessTokenType(OAuth2\Client::ACCESS_TOKEN_BEARER);
    //echo($accessTokenResult["access_token"]);
    //echo('</br>');
    //echo($accessTokenResult["refresh_token"]);
    //$response = $client->fetch("https://oauth.reddit.com/api/v1/me.json");
    //$_SESSION['reddit_refresh'] = $(accessTokenResult["refresh_token"]);

    header('Location: http://thef33d.me/');

    //$response = $client->fetch("http://www.reddit.com/dev/api#GET_subreddits_mine_contributor");

    //echo('<strong>Response for fetch me.json:</strong><pre>');
    //print_r($response);
    //echo('</pre>');
}
?>
<!DOCTYPE html>
<html lang="en">
    <head>

    </head>
    <meta charset="UTF-8">
    <title>FEED REDDIT</title>
    <body><a href="#" id="add">Click me</a></body>
    <!--script type="text/javascript" src="snoowrap/src/snoowrap.js"></script-->

    <script src="https://not-an-aardvark.github.io/snoowrap/snoowrap-v1.js" type="text/javascript">
    </script>
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../javascript/reddit-integration.js">
    </script>
    <!--script src="jsoauth2/test/user.js" type="text/javascript"></script-->

</html>
