<?php
if (isset($_GET["error"]))
{
    echo("<pre>OAuth Error: " . $_GET["error"]."\n");
    echo('<a href="index.php">Retry</a></pre>');
    die;
}

$authorizeUrl = 'https://ssl.reddit.com/api/v1/authorize';
$accessTokenUrl = 'https://ssl.reddit.com/api/v1/access_token';
$clientId = 'IXBFNdCtseybUQ';
$clientSecret = 'uT40Xr_nNlo-Yc03JYrE6CPDzTU';
$userAgent = 'zhrong0725';

$redirectUrl = "http://thef33d.me/reddit/";

require("Client.php");
require("GrantType/IGrantType.php");
require("GrantType/AuthorizationCode.php");

$client = new OAuth2\Client($clientId, $clientSecret, OAuth2\Client::AUTH_TYPE_AUTHORIZATION_BASIC);
echo "hello";
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
    $client->setAccessToken($accessTokenResult["access_token"]);
    $client->setAccessTokenType(OAuth2\Client::ACCESS_TOKEN_BEARER);
    echo($accessTokenResult["access_token"]);
    echo('</br>');
    echo($accessTokenResult["refresh_token"]);
    $response = $client->fetch("https://oauth.reddit.com/api/v1/me.json");
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
    <script type="text/javascript">
        var refresh = "<?= $accessTokenResult["refresh_token"] ?>";
    </script>
    <script type="text/javascript" src="reddit.js">
    </script>
    <!--script src="jsoauth2/test/user.js" type="text/javascript"></script-->
    
</html>
