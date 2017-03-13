youtubeList = [];
pinList = [

    'https://www.pinterest.com/makeuseof/gaming/',
    'https://www.pinterest.com/makeuseof/gaming/',
    'https://www.pinterest.com/makeuseof/gaming/',
    'https://www.pinterest.com/makeuseof/gaming/',
    'https://www.pinterest.com/makeuseof/gaming/',
    'https://www.pinterest.com/makeuseof/gaming/',
    'https://www.pinterest.com/makeuseof/gaming/'

];

redditList = [

    'funny',
    'worldnews',
    'gaming',
    'AskReddit'

];

$(document).ready(function() {
  addUserInfo();

  var request = $.ajax({
    url: "php/displayUser.php",
    type: "POST"
  });

  // Now actually load the social media feed
  request.done(function (response, textStatus, jqXHR) {

    if (response == 'Please log into the site.') {
      location.href = '../login.html';
    }

    var c_data = JSON.parse(response);
    // printData(c_data);
    var numPanels = 0;
    for(var c_id in c_data) {
      if(c_id == "username") continue;

      numPanels = numPanels + 1;

      createNewParallax(numPanels, c_id, c_data[c_id]["c_name"], c_data[c_id]["img"]);
//      document.getElementById('categoryBackground' + numPanels).addEventListener('change', function(evt){ handleFileSelect(evt, numPanels) }, false);
    }

    // Get YouTube subscriptions
    var actionData = {"action": "getVids", "sql_data": c_data};
    console.log(c_data);
    var request = $.ajax({
        url: "youtube_api/YouTube_API.php",
        type: "POST",
        data: actionData
    });

    request.done(function (response, textStatus, jqXHR){
      if (response.includes("http://") || response.includes("https://")) {
        location.href = response;
      }
      if (response) {
      var i = 0;
      var parsed_data = JSON.parse(response);
      console.log(parsed_data);
      for (var c_id in parsed_data) {
        youtubeList.push(parsed_data[c_id]["y_links"]);
        if (youtubeList[i]) {
          addYoutubeList(youtubeList[i], i + 1);          
        }
        i += 1;
      }
      }

//[c_id]["y_subs"]

    });

    // Get Pinterest subscriptions
    //addPinList( pinList, numPanels );

    // Get Reddit subscriptions
    //addRedditList( redditList, numPanels );
  });

}); //END OF $(document).ready

function addUserInfo() {
  var userPage = $('#userPage');
  var userInfo = '<h1 class="userHeader">Welcome, User.</h1>' +
                 '<h1 class="userAccountsHeader">Click to Link Accounts</h1>' +
                 '<ul class="userAccountsList">' +
                     '<li id="youtube"><img src="CSS/img/YouTube-icon-full_color.png" width="100px" ; height="100px" ; onclick="authorizeYouTube()"></li>' +
                     '<li id="pintrest"><img src="CSS/img/Pinterest_logo-2.png" width="100px" ; height="100px" ; onclick="pinterest.login()"></li>' +
                     '<li id="reddit"><img src="CSS/img/Reddit_logo.png" width="100px" ; height="110px" ; onclick="linkReddit();"></li>' +
                 '</ul>';
  userPage.append(userInfo);
}

function printData(c_data){

  var out = "";
  out += "Category info for user: " + c_data["username"] + "\n\n";

  for(var c_id in c_data){

    if(c_id == "username") continue;

    out += "c_id: " + c_id + "\n"
    out += "c_name: " + c_data[c_id]["c_name"] + "\n";
    out += "background_img: " + c_data[c_id]["img"] + "\n";

    for(var y_link in c_data[c_id]["y_subs"]){
      out += "  y_link: " + c_data[c_id]["y_subs"][y_link] + "\n";
    }

    for(var r_link in c_data[c_id]["r_subs"]){
      out += "  r_link: " + c_data[c_id]["r_subs"][r_link] + "\n";
    }

    for(var p_link in c_data[c_id]["p_subs"]){
      out += "  p_sub: " + c_data[c_id]["p_subs"][p_link] + "\n";
    }

    out += "\n";
  }

  alert(out);

}
