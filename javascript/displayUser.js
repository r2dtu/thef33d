youtubeList = [[]];
pinList = [

    'https://www.pinterest.com/makeuseof/gaming/',
    'https://www.pinterest.com/makeuseof/gaming/',
    'https://www.pinterest.com/makeuseof/gaming/',
    'https://www.pinterest.com/makeuseof/gaming/',
    'https://www.pinterest.com/makeuseof/gaming/',
    'https://www.pinterest.com/makeuseof/gaming/',
    'https://www.pinterest.com/makeuseof/gaming/'

];

pinList2 = [

    'https://www.pinterest.com/pinterest/official-news/',
    'https://www.pinterest.com/pinterest/official-news/',
    'https://www.pinterest.com/pinterest/official-news/',
    'https://www.pinterest.com/pinterest/official-news/',
    'https://www.pinterest.com/pinterest/official-news/',
    'https://www.pinterest.com/pinterest/official-news/'

];

pinList3 = [

    'https://www.pinterest.com/pinterest/pin-tips/',
    'https://www.pinterest.com/pinterest/pin-tips/',
    'https://www.pinterest.com/pinterest/pin-tips/',
    'https://www.pinterest.com/pinterest/pin-tips/',
    'https://www.pinterest.com/pinterest/pin-tips/',
    'https://www.pinterest.com/pinterest/pin-tips/'

];

// redditList = [
//
//     'funny',
//     'worldnews',
//     'gaming',
//     'AskReddit'
//
// ];

var master_name;

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
    for (var c_id in c_data) {
      if (c_id == "username") {
        master_name = c_data[c_id];
        continue;
      }

      createNewParallax(c_id, c_data[c_id]["c_name"], c_data[c_id]["img"]);
    }

    // Get YouTube subscriptions
    var actionData = {"action": "getVids", "sql_data": c_data};
    var request = $.ajax({
        url: "youtube_api/YouTube_API.php",
        type: "POST",
        data: actionData
    });

    request.done(function (response, textStatus, jqXHR) {
      if (response.includes("http://") || response.includes("https://")) {
        location.href = response;
      }
      if (response) {
        var panel = 1;
        var parsed_data = JSON.parse(response);
        console.log(parsed_data);
        for (var c_id in parsed_data) {
          youtubeList[panel] = [];
          if (c_id == "username") continue;
          for (var link in parsed_data[c_id]["y_links"]) {
            youtubeList[panel].push(parsed_data[c_id]["y_links"][link]);
          }
          shuffle(youtubeList[panel]);
          addYListFirst(youtubeList[panel], panel);
          panel += 1;
        }
      }
    });

    //Get Pinterest subscriptions
    // addPinList( pinList, 1);
    // addPinList( pinList2, 2);
    // addPinList( pinList3, 3);

    // Get Reddit subscriptions

    var request2 = $.ajax({
        url: "php/displayUser.php",
        type: "POST"
    });

    request2.done(function (response, textStatus, jqXHR) {
      var parse = JSON.parse(response);
    	var userDisplay = 1;
      for (var c_id in parse) {
    	  var r_subs = [];
    	  for (var r_sub in parse[c_id]["r_subs"]) {
          r_subs.push(parse[c_id]["r_subs"][r_sub]);
    	  }
        addRedditList( r_subs , userDisplay++ );
      }
    });
      request2.fail(function (jqXHR, textStatus, errorThrown) {
          console.log("ERROR");
    });
  });
}); //END OF $(document).ready

function addUserInfo() {
  console.log("Adding user info");
  var request = $.ajax({
    url: 'php/getUser.php',
    type: 'POST'
  });
  request.done(function (response, textStatus, jqXHR) {
    var parsed_data = JSON.parse(response);
    var f_name = "";
    for (var name in parsed_data) {
      f_name = parsed_data[name]["first_name"];
    }
    var userPage = $('#userPage');
    var userInfo = '<h1 class="userHeader">Welcome, ' + f_name + '.</h1>' +
                   '<h1 class="userAccountsHeader">Click to Link Accounts</h1>' +
                   '<ul class="userAccountsList">' +
                       '<li id="youtube"><img src="CSS/img/YouTube-icon-full_color.png" width="100px" ; height="100px" ; onclick="authorizeYouTube()"></li>' +
                       '<li id="reddit"><img src="CSS/img/Reddit_logo.png" width="100px" ; height="110px" ; onclick="linkReddit();"></li>' +
                   '</ul>';
    userPage.append(userInfo);
  });
  request.fail(function (jqXHR, textStatus, errorThrown) {
  });
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function printData(c_data) {

  var out = "";
  out += "Category info for user: " + c_data["username"] + "\n\n";
  for (var c_id in c_data) {

    if (c_id == "username") continue;
    out += "c_id: " + c_id + "\n"
    out += "c_name: " + c_data[c_id]["c_name"] + "\n";
    out += "background_img: " + c_data[c_id]["img"] + "\n";

    for (var y_link in c_data[c_id]["y_subs"]) {
      out += "  y_link: " + c_data[c_id]["y_subs"][y_link] + "\n";
    }

    for (var r_link in c_data[c_id]["r_subs"]) {
      out += "  r_link: " + c_data[c_id]["r_subs"][r_link] + "\n";
    }

    for (var p_link in c_data[c_id]["p_subs"]) {
      out += "  p_sub: " + c_data[c_id]["p_subs"][p_link] + "\n";
    }
    out += "\n";
  }
  alert(out);
}
