<?php
class redditConfig{
    //standard, oauth token fetch, and api request endpoints
    static $ENDPOINT_STANDARD = 'http://www.reddit.com';
    static $ENDPOINT_OAUTH = 'https://oauth.reddit.com';
    static $ENDPOINT_OAUTH_AUTHORIZE = 'https://www.reddit.com/api/v1/authorize';
    static $ENDPOINT_OAUTH_TOKEN = 'https://www.reddit.com/api/v1/access_token';
    static $ENDPOINT_OAUTH_REDIRECT = "http://thef33d.me/callback/try.php";
    // can't use "http://" . $_SERVER['HTTP_HOST'] . " here, since it's static

    //access token configuration from https://ssl.reddit.com/prefs/apps
    static $CLIENT_ID = 'IXBFNdCtseybUQ';
    static $CLIENT_SECRET = 'uT40Xr_nNlo-Yc03JYrE6CPDzTU';

    //access token request scopes
    //full list at http://www.reddit.com/dev/api/oauth
    static $SCOPES = 'save,modposts,identity,edit,flair,history,modconfig,modflair,modlog,modposts,modwiki,mysubreddits,privatemessages,read,report,submit,subscribe,vote,wikiedit,wikiread';
}
?>
