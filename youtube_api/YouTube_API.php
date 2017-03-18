<?php

// Make sure composer is installed! Then just load Google's Client API Library
require_once __DIR__ . '/vendor/autoload.php';
include_once('pretty_json.php');
include '../php/error.php';

session_start();

if (!isset($_SESSION["username"])) {
  echo 'http://' . $_SERVER['HTTP_HOST'] . '/login.html';
  exit();
}

// We will be using YouTube's Data API
$SCOPES = 'https://www.googleapis.com/auth/youtube';

// Client ID/Secret are specific to a project. Make sure they are copied from API Console
$OAUTH2_CLIENT_ID = '139115646685-qmbuj1k1tul57ns973bh2dtvqfi9tknd.apps.googleusercontent.com';
$OAUTH2_CLIENT_SECRET = 'cmB7NFc0s3NFVgumQ3nmvWc1';

$client = new Google_Client();
$client->setApplicationName("Getting YouTube Data...");
$client->setClientId($OAUTH2_CLIENT_ID);
$client->setClientSecret($OAUTH2_CLIENT_SECRET);
$client->setScopes($SCOPES);

$redirectURL = filter_var('http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'], FILTER_SANITIZE_URL);
$client->setRedirectUri($redirectURL);

// Define an object that will be used to make all API requests.
$youtube = new Google_Service_YouTube($client);

// Check if an auth token exists for the required scopes
$tokenSessionKey = 'token-' . $client->prepareScopes();

try {

  $conn = new PDO("mysql:host=localhost;dbname=thefeed", root, WTF110lecture);
  $username = $_SESSION['username'];
  $result = $conn->query("SELECT y_rtoken FROM accounts WHERE username='$username'")->fetch(PDO::FETCH_ASSOC);

  if ($result["y_rtoken"] !== null) {
      $refreshToken = $result["y_rtoken"];
      $client->refreshToken($refreshToken);
      $_SESSION[$tokenSessionKey] = $client->getAccessToken();
      $client->setAccessToken($_SESSION[$tokenSessionKey]);
  }

  // Check to ensure that the access token was successfully acquired.
  if ($client->getAccessToken()) {

      if($client->isAccessTokenExpired()) {
        $conn = new PDO("mysql:host=localhost;dbname=thefeed", root, WTF110lecture);
        $username = $_SESSION['username'];
        $result = $conn->query("SELECT y_rtoken FROM accounts WHERE username='$username'")->fetch(PDO::FETCH_ASSOC);

        if ($result["y_rtoken"] !== null) {
            $refreshToken = $result["y_rtoken"];
            $client->authenticate($refreshToken);
            $_SESSION[$tokenSessionKey] = $client->getAccessToken();
        }
      }
      try {
          $result = array();
          switch ($_POST["action"]) {
            case "getSubs":
              $result = getSubscriptions(getChannelIdFromDB());
              break;
            case "getVids":
              $json = $_POST["sql_data"];
              foreach($json as $c_id => $c_data) {
                $y_links = array();
                foreach ($c_data["y_subs"] as $sub_id) {
                  $tmp_links = getChannelVideos($sub_id);
                  foreach($tmp_links as $y_link){
                    array_push($y_links, $y_link);
                  }
                }
                $result[$c_id]["y_links"] = $y_links;
              }
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

  }
  else {
    $state = mt_rand();
    $client->setState($state);
    $_SESSION['state'] = $state;

    $authUrl = $client->createAuthUrl();

    header('Location: ' . $authUrl);
  }

} catch (PDOException $e) {
  echo ("Database error");
  exit();
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

    $response = $youtube->subscriptions->listSubscriptions('snippet', array('channelId' => $channel_id, 'maxResults' => '50'));
    $subscriptions = $response->getItems();
    foreach ($subscriptions as $subscription_channel) {

        $cid = $subscription_channel->getSnippet()->getResourceId()->getChannelId();
        $subs[$subscription_channel->getSnippet()->getTitle()] = $cid;
    }
    // $nextPageToken = $response->getNextPageToken();
    // while ($nextPageToken !== "") {
    //   $response1 = $youtube->subscriptions->listSubscriptions('snippet', array('channelId' => $channel_id, 'pageToken' => '$nextPageToken'));
    //   $subscriptions = $response1->getItems();
    //   foreach ($subscriptions as $subscription_channel) {
    //
    //       $cid = $subscription_channel->getSnippet()->getResourceId()->getChannelId();
    //       $subs[$subscription_channel->getSnippet()->getTitle()] = $cid;
    //   }
    //   $nextPageToken = $response1->getNextPageToken();
    // }

    return $subs;
}


function getChannelVideos($channel_id) { // TODO add sorting
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
        $videos_response = $youtube->playlistItems->listPlaylistItems('snippet', array('playlistId' => $upload_id, 'maxResults' => '15'));
        $videos = $videos_response->getItems();

        // @TODO get nextPageToken and prevPageToken (use as input to $parts)
        foreach($videos as $video) {
            array_push($embed_videos, generateEmbedLink($video->getSnippet()->getResourceId()->getVideoId(), 250, 157));
        }
    }
    return $embed_videos;
}

function generateEmbedLink($video_id, $width, $height) {
  // https://www.youtube.com/embed/FhC9R9oCAVk
    return 'https://www.youtube.com/embed/' . $video_id;
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
