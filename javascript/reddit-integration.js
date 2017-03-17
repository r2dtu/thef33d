var greddit;
$(document).ready(function(){
    // Check if reddit account is linked.
    const clientId = "8-kkjNXlTfpV0Q";
    const clientSecret = "J6W5Y5UgCiJssMxapEGtsIX4Ebk";
//    const clientId = "V5gDAsfre7yTWg";
//    const clientSecret = "1-BXkiGXxLuENy3tPpU1aRizwN4";
    var promiseLinked = redditLink();
    var refresh;

    // Evaluate promise
    promiseLinked.then(function(rtoken){
	greddit = newReddit(clientId, clientSecret, rtoken);
	greddit.getHot().then(console.log);
    })
    .catch(function(){
    	console.log("No reddit refresh token!");
    })

    // TODO DELET THIS
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
});

/*
 * Displays subreddit checkboxes in category settings
 */
function displayRedditSubs( id ) {
	redditLink().then(function(){
	var subBox = $('#subs' + id);
	subBox.css({'width': '350px', 'height': '400px', 'overflow-y': 'scroll'});
	var subsPromise = getSubs(greddit);
	subsPromise.then(function(subs){
		for(var i = 0; i < subs.length; i++){
			subBox.append(
			'<input type="checkbox" value="0" name="' + subs[i] + '"> ' + subs[i] + ' <br>');
		}
    displayCheckMarks(id, c_id, "r_subs");
	})
	.catch(function(error){
		alert("You need to reauthorize your Reddit account. Please quit and try again.");
	});
	})
	.catch(function(){
		alert("You need to reauthorize your Reddit account. Please quit and try again.");
	});
}

/*
 * Promise that resolves with refresh token if it exists. Rejects if not.
 */
function redditLink(){
    var promise = new Promise(function(resolve, reject){
        var message = {"message" : "get_rtoken"}
        // Request refresh token from database.
        var request = $.ajax({
            url: "php/redditAccount.php",
            type: "POST",
            data: message
        });
        request.done(function (response, textStatus, jqXHR){
	    var decoded = JSON.parse(response);
	    var rtoken = decoded.rtoken.r_rtoken;
	    if(rtoken === null || rtoken === "" || rtoken === false){
	    	reject();
	    }
	    else{
            	resolve(rtoken);
	    }
        });
        request.fail(function (jqXHR, textStatus, errorThrown){
            reject();
        });
    });
    return promise;
}

/*
 * Returns a promise resolving into an array of hot posts.
 *
 * Takes a reddit, list of subreddit name STRINGS, and a number of posts to get
 * for each one.
 */
function getHots(reddit, subreddits, num){
    // Array of hot posts to return.
    var hotArray;
    // Promise to return
    var promise = new Promise(function(resolve, reject){
        // Iterate through each subreddit
        for(var i = 0; i < subreddits.length; i++){
            var hotPromise = reddit.getHot(subreddit[i], {limit: num});
            //hotPromise.then(function())
        }
    });
    return promise;
}

/*
 * Redirects user to reddit authentication page.
 */
function linkReddit(){
    var redditPromise = redditLink();
    redditPromise.catch(function(){location.href = "/php/reddit/index.php";});
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
        subredditsAllPromise = subreddits.fetchAll();
        subredditsAllPromise.then(function(subredditAll){
            for(var i = 0; i < subredditAll.length; i++){
              subredditNames[i] = subredditAll[i].display_name;
            }
            resolve(subredditNames);
        })
        .catch(function(error){
            reject("Error fetching all subreddits!" + error);
        })
      })
      .catch(function(error){
          reject("Error fetching subreddits!" + error);
      })
  });
  return promise;
}
