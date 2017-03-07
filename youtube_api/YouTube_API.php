<?php

// Make sure composer is installed! Then just load Google's Client API Library
require_once __DIR__ . '/vendor/autoload.php';
include_once('pretty_json.php');
include '../php/error.php';

session_start();

// We will be using YouTube's Data API
$SCOPES = 'https://www.googleapis.com/auth/youtube';

// Client ID/Secret are specific to a project. Make sure they are copied from API Console
$OAUTH2_CLIENT_ID = '139115646685-qmbuj1k1tul57ns973bh2dtvqfi9tknd.apps.googleusercontent.com';
$OAUTH2_CLIENT_SECRET = 'cmB7NFc0s3NFVgumQ3nmvWc1';

$client = new Google_Client();
$client->setApplicationName("Getting YouTube Data...");
$client->setClientId($OAUTH2_CLIENT_ID);
$client->setClientSecret($OAUTH2_CLIENT_SECRET);
$client->setScopes($SCOPES);$redirectURL = filter_var('http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'], FILTER_SANITIZE_URL);
$client->setRedirectUri($redirectURL);

// Define an object that will be used to make all API requests.
$youtube = new Google_Service_YouTube($client);

// Check if an auth token exists for the required scopes
$tokenSessionKey = 'token-' . $client->prepareScopes();
if (isset($_GET['code'])) {
    if (strval($_SESSION['state']) !== strval($_GET['state'])) {
        die('The session state did not match.');
    }
    $client->authenticate($_GET['code']);
    $_SESSION[$tokenSessionKey] = $client->getAccessToken();
    header('Location: ' . $redirectURL);
}

// Set access token if we've retrieved one from authenticate()
if (isset($_SESSION[$tokenSessionKey])) {
  $client->setAccessToken($_SESSION[$tokenSessionKey]);
}

// Check to ensure that the access token was successfully acquired.
if ($client->getAccessToken()) {
    
    try {
        $result["hey"] = "what";
        switch ($_POST["action"]) {
            case "getCid":
//                $channel_id = getChannelId();
//                $result[$username] = $channel_id;
                break;
            case "getSubs":
                $result = getSubscriptions(getChannelIdFromDB());
                break;
            case "getVids":
//                $subs = getSubscriptions(getChannelIdFromDB());
//                
//                foreach ($subs as $sub_title => $sub_id) {
//                    results[$sub_title] = getChannelVideos($sub_id);
//                }
                break;
            default:
                break;
        }
        
        echo json_encode($result);
        
    } catch (Google_Service_Exception $e) {
        $htmlBody .= sprintf('<p>A service error occurred: <code>%s</code></p>', htmlspecialchars($e->getMessage()));
    } catch (Google_Exception $e) {
        $htmlBody .= sprintf('<p>An client error occurred: <code>%s</code></p>', htmlspecialchars($e->getMessage()));
    }

    // Update the access token
    $_SESSION[$tokenSessionKey] = $client->getAccessToken();
    exit();

} else {
    
    // If the user has not authorized the application, start the OAuth 2.0 flow.
    $state = mt_rand();
    $client->setState($state);
    $_SESSION['state'] = $state;

    $authUrl = $client->createAuthUrl();
    header('Location: ' . $authUrl);
}


function getChannelId() {
    global $youtube;
    $channel_id = $youtube->subscriptions->listSubscriptions('snippet', array('mine' => 'true'))->getItems()[0]->getChannelId();
    return $channel_id;
}

function getChannelIdFromDB() {
    try {
      $conn = new PDO("mysql:host=localhost;dbname=thefeed", root, WTF110lecture);
    }
    catch(PDOException $e){
      error_out();
    }
    $username = $_SESSION['username'];
    $db_info = $conn->query("SELECT * FROM accounts WHERE username='$username'")->fetch(PDO::FETCH_ASSOC);
    $channel_id = $db_info['y_id'];
    return $channel_id;
}

function getSubscriptions($channel_id) {
    global $youtube;

    $response = $youtube->subscriptions->listSubscriptions('snippet', array('channelId' => $channel_id));
    $subscriptions = $response->getItems();
    $subs = array();

    foreach ($subscriptions as $subscription_channel) {
        $cid = $subscription_channel->getSnippet()->getResourceId()->getChannelId();
        $subs[$subscription_channel->getSnippet()->getTitle()] = $cid;
    }

    return $subs;
}

function getChannelVideos($channel_id) {
    global $youtube;

    // Get a list of channel's videos
    $channels_response = $youtube->channels->listChannels('contentDetails', array('id' => $channel_id));
    $channels = $channels_response->getItems();

    $embed_videos = array();

    // Print each channel's videos
    foreach ($channels as $channel) {

        // Grab the upload channel id
        $upload_id = $channel->getContentDetails()->getRelatedPlaylists()->getUploads();
        // Grab the videos from playlistItems
        $videos_response = $youtube->playlistItems->listPlaylistItems('snippet', array('playlistId' => $upload_id, 'maxResults' => '50'));
        $videos = $videos_response->getItems();

        // @TODO get nextPageToken and prevPageToken (use as input to $parts)
        $count = 1;
        foreach($videos as $video) {
            $embed_videos[$count] = generateEmbedLink($video->getSnippet()->getResourceId()->getVideoId(), 250, 157);
    
            $count += 1;
        }
    }

    echo json_encode($embed_videos);
    exit();
}

function generateEmbedLink($video_id, $width, $height) {
    return '<iframe width="' . $width . '" height="' . $height . '" src="https://www.youtube.com/embed/' . $videoId . '" frameborder="0" allowfullscreen></iframe>';
}

function insertSubscriptions($new_channel_id) {
    $resourceId = new Google_Service_YouTube_ResourceId();
    $resourceId->setChannelId($newChannelId);
    $resourceId->setKind('youtube#channel');

    // Create a snippet object and set its resource ID.
    $subscriptionSnippet = new Google_Service_YouTube_SubscriptionSnippet();
    $subscriptionSnippet->setResourceId($resourceId);

    // Create a subscription request that contains the snippet object.
    $subscription = new Google_Service_YouTube_Subscription();
    $subscription->setSnippet($subscriptionSnippet);

    // Execute the request and return an object containing information about the new subscription.
    $subscriptionResponse = $youtube->subscriptions->insert('id,snippet', $subscription, array());
    echo _format_json(json_encode($subscriptionResponse), true);
}

?>