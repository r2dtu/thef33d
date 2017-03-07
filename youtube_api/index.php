<?php

// Make sure composer is installed! Then just load Google's Client API Library
require_once __DIR__ . '/vendor/autoload.php';
include_once('pretty_json.php');
session_start();

// Client ID/Secret are specific to a project. Make sure they are copied from API Console
$OAUTH2_CLIENT_ID = '139115646685-qmbuj1k1tul57ns973bh2dtvqfi9tknd.apps.googleusercontent.com';
$OAUTH2_CLIENT_SECRET = 'cmB7NFc0s3NFVgumQ3nmvWc1';

// We will be using YouTube's Data API
$SCOPES = 'https://www.googleapis.com/auth/youtube';

// Create Google Client
$client = new Google_Client();
$client->setClientId($OAUTH2_CLIENT_ID);
$client->setClientSecret($OAUTH2_CLIENT_SECRET);
$client->setScopes($SCOPES);
$redirectURL = filter_var('http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'], FILTER_SANITIZE_URL);
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
    $htmlBody = '';
    
    try {
        
        // This commented code inserts a new subscription into the user's subscriptions list - it does not update immediately, and you must call listSubscriptions again.
        
        // This code subscribes the authenticated user to the specified channel.
        // Identify the resource being subscribed to by specifying its channel ID
        // and kind.
        /*$resourceId = new Google_Service_YouTube_ResourceId();
        $resourceId->setChannelId('UCtVd0c0tGXuTSbU5d8cSBUg');
        $resourceId->setKind('youtube#channel');
        
        // Create a snippet object and set its resource ID.
        $subscriptionSnippet = new Google_Service_YouTube_SubscriptionSnippet();
        $subscriptionSnippet->setResourceId($resourceId);
        
        // Create a subscription request that contains the snippet object.
        $subscription = new Google_Service_YouTube_Subscription();
        $subscription->setSnippet($subscriptionSnippet);
        
        // Execute the request and return an object containing information about the new subscription.
        $subscriptionResponse = $youtube->subscriptions->insert('id,snippet', $subscription, array());
        echo _format_json(json_encode($subscriptionResponse), true);*/

        // Get an object returning information about all of a user's subscriptions
        $sub = $youtube->subscriptions->listSubscriptions('snippet', array('mine' => 'true'));
        echo "<br>";
        $sub1 = $sub->getItems();
        foreach ($sub1 as $subscription_channel) {
            
            echo "Title: ";
            echo $subscription_channel->getSnippet()->getTitle();
            echo ", ";
            echo "Channel ID: ";
            $cid = $subscription_channel->getSnippet()->getResourceId()->getChannelId();
            echo $cid;
            echo "<br>";
            
            // Get a list of channel's videos
            $channelsResponse = $youtube->channels->listChannels('contentDetails', array('id' => $cid));
            $channels = $channelsResponse->getItems();
            
            // Print each channel's videos
            foreach ($channels as $channel) {

                // Grab the upload channel id
                $uploadId = $channel->getContentDetails()->getRelatedPlaylists()->getUploads();

                // Grab the videos from playlistItems
                $videosResponse = $youtube->playlistItems->listPlaylistItems('snippet', array('playlistId' =>                               $uploadId, 'maxResults' => '50'));
                $videos = $videosResponse->getItems();

                // @TODO get nextPageToken and prevPageToken (use as input to $parts)
                foreach($videos as $video) {
                    echo "Title: ";
                    echo $video->getSnippet()->getTitle();
                    echo "<br>";
                    echo "http://www.youtube.com/watch?v=";
                    echo $video->getSnippet()->getResourceId()->getVideoId();
                    echo "<br>";
                }
            }
        }
        
    } catch (Google_Service_Exception $e) {
        $htmlBody .= sprintf('<p>A service error occurred: <code>%s</code></p>', htmlspecialchars($e->getMessage()));
    } catch (Google_Exception $e) {
        $htmlBody .= sprintf('<p>An client error occurred: <code>%s</code></p>', htmlspecialchars($e->getMessage()));
    }

    // Update the access token
    $_SESSION[$tokenSessionKey] = $client->getAccessToken();

} else {
    
    // If the user has not authorized the application, start the OAuth 2.0 flow.
    $state = mt_rand();
    $client->setState($state);
    $_SESSION['state'] = $state;

    $authUrl = $client->createAuthUrl();
    $htmlBody = <<<END
    <h3>Authorization Required</h3>
    <p>You need to <a href="$authUrl">authorize access</a> before proceeding.<p>
END;
}

    function getChannelId() {
        global $youtube;
        return $youtube->subscriptions->listSubscriptions('snippet', array('mine' => 'true'))->getItems()[0]->getChannelId();
    }

    function getSubscriptions($channelId) {
        global $youtube;
        
//        $response = $youtube->subscriptions->listSubscriptions('snippet', array('mine' => 'true'));
        $response = $youtube->subscriptions->listSubscriptions('snippet', array('channelId' => $channelId));
        $subscriptions = $response->getItems();
        
 /*       foreach ($sub1 as $subscription_channel) {

            echo "Title: ";
            echo $subscription_channel->getSnippet()->getTitle();
            echo ", ";
            echo "Channel ID: ";
            $cid = $subscription_channel->getSnippet()->getResourceId()->getChannelId();
            echo $cid;
            echo "<br>";
        }
*/
        return subscriptions;
    }

    function getChannelVideos($channelId) {
        global $youtube;
        
        // Get a list of channel's videos
        $channelsResponse = $youtube->channels->listChannels('contentDetails', array('id' => $channelId));
        $channels = $channelsResponse->getItems();
        
        // Print each channel's videos
        foreach ($channels as $channel) {

            // Grab the upload channel id
            $uploadId = $channel->getContentDetails()->getRelatedPlaylists()->getUploads();
            // Grab the videos from playlistItems
            $videosResponse = $youtube->playlistItems->listPlaylistItems('snippet', array('playlistId' => $uploadId, 'maxResults' => '50'));
            $videos = $videosResponse->getItems();

            // @TODO get nextPageToken and prevPageToken (use as input to $parts)
            foreach($videos as $video) {
                echo "Title: ";
                echo $video->getSnippet()->getTitle();
                echo "<br>";
                echo "http://www.youtube.com/watch?v=";
                echo $video->getSnippet()->getResourceId()->getVideoId();
                echo "<br>";
            }
        }
    }

    function generateEmbedLink($videoId, $width, $height) {
        return '<iframe width="' . $width . '" height="' . $height . '" src="https://www.youtube.com/embed/' . $videoId . '" frameborder="0" allowfullscreen></iframe>';
    }

?>

<!doctype html>
<html>
<head>
<title>Returned Subscription</title>
</head>
<body>
  <?=$htmlBody?>
</body>
</html>