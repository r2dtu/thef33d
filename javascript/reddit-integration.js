//$(document).ready(function(){
    // TODO DELETE THIS
    // var clientId = "V5gDAsfre7yTWg"
    // var clientSecret = "1-BXkiGXxLuENy3tPpU1aRizwN4"
    // if(typeof refresh_token !== 'undefined'){
    // const reddit = newReddit(clientId, clientSecret, refresh_token);
    // var subscribedPromise = getSubs(reddit);
    // subscribedPromise.then(function(fulfilled){
    //     console.log(fulfilled);
    // });
    //console.log(subscribed);
//    }
//});

/*
 * Returns true if user's reddit account is connected, false otherwise.
 */
function redditIsLinked(username){
    var message = {"message" : "get_rtoken"}
    // Request refresh token from database.
    var request = $.ajax({
        url: "php/redditAccount.php",
        type: "POST",
        data: message
    });
    request.done(function (response, textStatus, jqXHR){
        console.log(response);
        return true;
    });
    request.fail(function (jqXHR, textStatus, errorThrown){
        console.log(error);
        return false;
    });
}

/*
 * Redirects user to reddit authentication page.
 */
function linkReddit(){
    location.href = "/php/reddit/index.php";
}

/*
 * Unlinks reddit accounts by removing the refresh_token from the database.
 * Returns true if successful.
 * Takes a thef33d.me username.
 */
function unlinkReddit(username){
    // Request to remove refresh token from database.
    var request = $.ajax({
        url: "php/redditAccount.php",
        type: "POST",
        data: {"message": "store_rtoken", "rtoken": ""}
    });

}

/*
 * Constructs and returns a reddit object.
 * Requires: client id, secret, and refresh token.
 */
function newReddit(client_id, client_secret, refresh_token){
    const reddit = new window.snoowrap({
        userAgent: 'Reddit Functionality for thef33d.me by /u/teamfeed',
        clientId: client_id,
        clientSecret: client_secret,
        refreshToken: refresh_token
    });
    return reddit;
}

/*
 * Takes a reddit object. Needs to be authenticated.
 * Returns a promise storing array of strings containing subscribed subreddits.
 */
function getSubs(reddit){
  var subredditPromise = reddit.getSubscriptions();
  var subredditNames = [];
  var promise = new Promise(function(resolve, reject){
      subredditPromise.then(function(subreddits){
        for(var i = 0; i < subreddits.length; i++){
          subredditNames[i] = subreddits[i].display_name;
        }
        console.log(subredditNames);
        resolve(subredditNames);
      })
      .catch(function(error){
          reject("Error fetching subreddits!" + error);
      })
  });
  return promise;

}
