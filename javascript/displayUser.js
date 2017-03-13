youtubeList = null;
pinList = [

    'https://www.pinterest.com/pin/99360735500167749/',
    'https://www.pinterest.com/pin/99360735500167749/',
    'https://www.pinterest.com/pin/99360735500167749/',
    'https://www.pinterest.com/pin/99360735500167749/',
    'https://www.pinterest.com/pin/99360735500167749/',
    'https://www.pinterest.com/pin/99360735500167749/',
    'https://www.pinterest.com/pin/99360735500167749/',
    'https://www.pinterest.com/pin/99360735500167749/'

];

redditList = [

    'https://www.reddit.com/hot/.embed?limit=5&t=all',
    'https://www.reddit.com/hot/.embed?limit=5&t=all',
    'https://www.reddit.com/hot/.embed?limit=5&t=all',
    'https://www.reddit.com/hot/.embed?limit=5&t=all',
    'https://www.reddit.com/hot/.embed?limit=5&t=all',
    'https://www.reddit.com/hot/.embed?limit=5&t=all',
    'https://www.reddit.com/hot/.embed?limit=5&t=all',
    'https://www.reddit.com/hot/.embed?limit=5&t=all'

];

$(document).ready(function(){
  addUserInfo(c_data["username"]);

  var actionData = {"action": "getVids"};

  var request = $.ajax({
      url: "youtube_api/YouTube_API.php",
      type: "POST",
      data: actionData
  });

  // Callback handler that will be called on success
  request.done(function (response, textStatus, jqXHR){

    var c_data = JSON.parse(response);

    //printData(c_data);

    var $panels = $('.panels');
    var $navList = $('.nav-menu-list');
    var numPanels = 0;

    for(var c_id in c_data){

      if(c_id == "username") continue;

      numPanels = numPanels + 1;

      createNewParallax(numPanels, c_id, c_data[c_id]["c_name"], c_data[c_id]["img"]);

      youtubeList = c_data[c_id]["y_links"];

      addYoutubeList(c_data[c_id]["y_links"], numPanels);

      console.log("success");
    }

    addPinList( pinList, 1 );

    addRedditList( redditList, 1 );

  }); //End of request.done

  request.fail(function (jqXHR, textStatus, errorThrown){
      alert("HTTPRequest: " + textStatus + " " + errorThrown);
      console.log(jqXHR);
  });

  // TODO Get Pinterest data
  // TODO Get Reddit data

}); //END OF $(document).ready

function addUserInfo(username) {
  var userPage = $('#userPage');
  var userInfo = '<h1 class="userHeader">Welcome, User.</h1>' +
                 '<h1 class="userAccountsHeader">Click to Link Accounts</h1>' +
                 '<ul class="userAccountsList">' +
                     '<li id="youtube"><img src="CSS/img/YouTube-icon-full_color.png" width="100px" ; height="100px" ; onclick="authorizeYouTube()"></li>' +
                     '<li id="pintrest"><img src="CSS/img/Pinterest_logo-2.png" width="100px" ; height="100px" ; onclick=""></li>' +
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

    for(var y_link in c_data[c_id]["y_links"]){
      out += "  y_link: " + c_data[c_id]["y_links"][y_link] + "\n";
    }

    for(var r_link in c_data[c_id]["r_links"]){
      out += "  r_link: " + c_data[c_id]["r_links"][r_link] + "\n";
    }

    for(var p_link in c_data[c_id]["p_subs"]){
      out += "  p_sub: " + c_data[c_id]["p_subs"][p_link] + "\n";
    }

    out += "\n";
  }

  alert(out);

}
