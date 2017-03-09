$(document).ready(function() {

// Get user client secret
var userSecret = "";

//var clientOAuth2 = require('client-oauth2');
  
// Initialize Reddit Wrapper w/ Our credentials for now

/* Returns an unordered list object which contains a list of the relevant info
 * from a reddit post.
 */
function createPost(contentTitle, contentText, contentLink, commentLink, thumbLink){
    /* List */
    var list = $("<ul></ul>");
    list.addClass("redditPost");

    /* Post Title */
    var listTitle = $("<li></li>");

    //listTitle.addClass("redditPost");

    /* Post Link */
    var listLink = $("<a></a>");
    listLink.attr("href", contentLink);
    listLink.text("Title: " + contentTitle);

    //listLink.addClass("redditPost");
    var listText = $("<li></li>").text("Text: " + contentText);
    //listText.addClass("redditPost");

    /* Comments */
    var listComments = $("<li></li>");
    var listCLink = $("<a></a>");
    listCLink.attr("href", commentLink);
    listCLink.text("View Comments");


    //listCLink.addClass("redditPost");
    //var listTLink = $("<li></li>").text("Thumbnail Link: " + thumbLink);
    //listTLink.addClass("redditPost");

    list.append(listTitle);
    listTitle.append(listLink);
    list.append(listText);
    list.append(listComments);
    listComments.append(listCLink);
    //list.append(listTLink);

    /* Append the list to the embedded section of the parallax */
    $("#mainparallax1 .redditList").append(list);

};


// function createPost(contentTitle, contentText, contentLink, thumbLink){
//   /* Makin' the outline of the left button */
//   var section = $("<section></section>");
//
//   $("#postings").after(section);
//
//   section.addClass("section--center mdl-grid mdl--no-spacing mdl-shadow--2dp");
//   var thumbnail = $("<header></header>");
//   thumbnail.addClass("section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white");
//   thumbnail.css("background-image", "url(" + thumbLink +")" );
//   var playButton = $("<i></i>").addClass("material-icons").text("play_circle_filled");
//   playButton.attr("href", contentLink);
//
//   /* Combining the elemnts of left button */
//   section.append(thumbnail.append(playButton));
//
//   /* Makin' the outline of the main content */
//   var content = $("<div></div>");
//   content.addClass("mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone");
//   var contentTextBlock = $("<div></div>");
//   contentTextBlock.addClass("mdl-card__supporting-text");
//   var contentHeader = $("<h4></h4>");
//   contentHeader.text(contentTitle);
//   contentTextBlock.text(contentText);
//   contentTextBlock.prepend(contentHeader);
//
//   /* Outline of actions */
//   var actions = $("<div></div>");
//   actions.addClass("mdl-card__actions");
//   var actionLink = $("<a></a>");
//   actionLink.addClass("mdl-button");
//   actionLink.text("View comments");
//   actionLink.attr('href', contentLink);
//
//   /* Outline of Button thing */
//   var button = $("<button></button>");
//   button.addClass("mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon");
//   var buttonThing = $("<i></i>");
//   buttonThing.addClass("material-icons");
//   buttonThing.text("more_vert");
//
//   var buttonList = $("<ul></ul>");
//   buttonList.addClass("mdl-menu mdl-js-menu mdl-menu--bottom-right");
//   var item1 = $("<li></li>");
//   item1.addClass("mdl-menu__item");
//   item1.text("lorem");
//
//
//   /* Combining the elements of the main content */
//
//   section.append(content.append(contentTextBlock));
//   section.append(content.append(actions.append(actionLink)));
//   section.append(button.append(buttonThing));
//   section.append(buttonList.append(item1));
//
//   updateButtons();
//
// }

function mergeSubs(subreddits){
  for(var i =0; i < subreddits.length; i++){
    console.log(subreddits[i]);
  }
}

var reddit;
    
$("#add").click(
  function () {

    console.log(refresh);
          
    reddit = new window.snoowrap({
    userAgent: 'Testing accessing and sorting subscribed subreddits in javascript. By /u/teamfeed',
    clientId: 'IXBFNdCtseybUQ',
    clientSecret: 'uT40Xr_nNlo-Yc03JYrE6CPDzTU',
    refreshToken: refresh
    //username: 'teamfeed',
    //password: 'WTF110lecture'
    });
    //console.log()

    getSubs();

    //var clone = $("#postings").clone();

    //$("#postings").after(clone);
    /*
    $("#settingsButton1").toggleClass('settings-button-open');
    $("#parallaxSettings1").toggleClass('parallax-settings');
    
    var subreddits = reddit.getSubscriptions();
    mergeSubs(subreddits);
    var subredditName = prompt("Please enter a subreddit", "corgi");
    reddit.getHot(subredditName).then(console.log);
    var subredditHot = reddit.getHot(subredditName);
    */

    /* For each post, get information needed to create the post on the site */
    
    /*subredditHot.then(function(listing){
      for(var i = 0; i < listing.length; i++){
        var contentTitle = listing[i].title;
        var contentText = listing[i].selftext;
        var contentLink = listing[i].url;
        var commentLink = "http://www.reddit.com" + listing[i].permalink;
        var thumbLink = listing[i].thumbnail;
        createPost(contentTitle, contentText, contentLink, commentLink, thumbLink);
        console.log(listing[i].title);
      }
    });
    */

  }
);

function getSubs(){
  var subreddits = reddit.getSubscriptions();
  var subredditNames = [];
  subreddits.then(function(subreddit){
    console.log(subreddit);
    for(var i = 0; i < subreddit.length; i++){
      console.log(subreddit[i].display_name);
      subredditNames[i] = subreddit[i].display_name;
    }
    console.log(subredditNames);
    return subredditNames;
  })
}

});