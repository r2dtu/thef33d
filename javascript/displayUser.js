$(document).ready(function(){


  var request = $.ajax({
      url: "php/displayUser.php",
      type: "POST",
  });

  // Callback handler that will be called on success
  request.done(function (response, textStatus, jqXHR){
    var c_data = JSON.parse(response);
    //var asdf = JSON.stringify(c_data, undefined, 2);
    //alert(asdf);
    var $panels = $('.panels');
    var $navList = $('.nav-menu-list');
    var numPanels = 3;


      var settings = '<div class="parallax-settings">' +
                          '<form class="settings-form">' +
                              '<div class="settings-categoryName">' +
                                  'Category:' +
                                  '<br>' +
                                  '<input type="text" id="categoryName' + numPanels + '" placeholder="Name of category" class="categoryName">' +
                                  '<input type="submit" value="Submit" onclick="updateMenuName( ' + numPanels + ' )">' +
                              '</div>' +
                              '<div class="settings-categoryBackground">' +
                                  '<br> Background Image:' +
                                  '<br>' +
                                  '<input type="file" id="categoryBackground' + numPanels + '" class="categoryBackgroundSelect">' +
                                  '<input type="submit" value="Submit" onclick="updateBackground( ' + numPanels + ' )">' +
                              '</div>' +
                              '<div class="settings-categoryOrganized">' +
                                  '<br> Organized:' +
                                  '<br>' +
                                  '<select id="categoryOrganized' + numPanels + '" name="organized" style="width: 180px;">' +
                                      '<option value="a-z">' +
                                          'a-z:A-Z' +
                                      '</option>' +
                                      '<option value="z-a">' +
                                          'z-a:Z-A' +
                                      '</option>' +
                                  '</select>' +
                              '</div>' +
                          '</form>' +
                          '<div class="panel-information">' +
                              '<div class="panel-information-accounts">' +
                                  '<br> Account:' +
                                  '<br>' +
                                  '<select id="categoryAccounts3" name="accounts" style="width: 50%;" class="categoryAccounts" onchange="fetchMedia(this.value, 3)">' +
                                      '<option value="YouTube">' +
                                          'Youtube' +
                                      '</option>' +
                                      '<option value="Pinterest">' +
                                          'Pinterest' +
                                      '</option>' +
                                      '<option value="Reddit">' +
                                          'Reddit' +
                                      '</option>' +
                                  '</select>' +
                              '</div>' +
                              '<div class="panel-information-subscriptions">' +
                                  '<br> Subscriptions to Include:' +
                                  '<br>' +
                                  '<form class="categorySubscriptions">' +
                                      '<input type="checkbox" name="subscription" value="Science"> Science' +
                                      '<br>' +
                                      '<input type="checkbox" name="subscription" value="League of Legends"> League of Legends' +
                                      '<br>' +
                                      '<input type="checkbox" name="subscription" value="Art History"> Art History' +
                                      '<br>' +
                                      '<input type="checkbox" name="subscription" value="Wild Turtle Footage"> Wild Turtle Footage' +
                                      '<br>' +
                                      '<input type="submit">' +
                                  '</form>' +
                              '</div>' +
                      '</div>';

    printData(c_data);

    for(var c_id in c_data){

      if(c_id == "username") continue;

      numPanels = numPanels + 1;

      $panels.append( '<div id="mainparallax' + numPanels + '" class="parallax_main parallax_main_general">\n\
                        <div id="settingsButton' + numPanels + '" class="settings-button" onclick="generic_settings(' + numPanels + ')">\n\
                            <img src="CSS/img/settings-gear.jpg" height="20px" width="20px" />\n\
                        </div>\n\
                        <div id="showButton' + numPanels + '" class="show-button" onclick="generic_show(' + numPanels + ')">\n\
                            <img src="CSS/img/show.jpeg" height="20px" width="20px" />\n\
                        </div>\n\
                        <div id="parallaxSettings' + numPanels + '" class="parallax-settings-wrap">' +
                        settings +
                        '</div>\n\
                      </div>' );

      /*$panels.append( '<div id="mainparallax' + numPanels + '" class="parallax_main parallax_main_general"><div id="settingsButton' + numPanels + '" class="settings-button" onclick="generic_settings(' + numPanels + ')"><img src="CSS/img/settings-gear.jpg" height="20px" width="20px" /></div><div id="showButton' + numPanels + '" class="show-button" onclick="generic_show(' + numPanels + ')"><img src="CSS/img/show.jpeg" height="20px" width="20px" /></div><div id="parallaxSettings' + numPanels + '" class="parallax-settings-wrap"><div class="parallax-settings"><form class="settings-form">Category:<br><input type="text" name="categoryName" placeholder="Name of category" class="categoryName"><br></form></div></div></div>');*/

      $navList.append('<li draggable="true" onclick="hideMenu()"><a href="#mainparallax' + numPanels + '">Untitled</a></li>');


      //style each parallax div with .css

      // Get all videos from subscriptions
      for(var y_sub in c_data[c_id]["y_subs"]){
/*          var actionData = {"action": "getVids"};
          var request = $.ajax({
              url: "youtube_api/YouTube_API.php",
              type: "POST",
              data: action_data
          });

          request.done(function (response, textStatus, jqXHR)) {
            var sub_data = JSON.parse(response);

            // append embedded videos to panel
          }*/
      }

      for(var r_sub in c_data[c_id]["r_subs"]){
      }

      for(var p_sub in c_data[c_id]["p_subs"]){
      }
    }


  });

  // Callback handler that will be called on failure
  request.fail(function (jqXHR, textStatus, errorThrown){
      alert("HTTPRequest: " + textStatus + " " + errorThrown);
  });
});



function printData(c_data){

  var out = "";

  out += "Category info for user: " + c_data["username"] + "\n\n";

  for(var c_id in c_data){

    if(c_id == "username") continue;

    out += "c_id: " + c_id + "\n"
    out += "c_name: " + c_data[c_id]["c_name"] + "\n";
    out += "background_img: " + c_data[c_id]["img"] + "\n";

    for(var y_sub in c_data[c_id]["y_subs"]){
      out += "  y_sub: " + c_data[c_id]["y_subs"][y_sub] + "\n";
    }

    for(var r_sub in c_data[c_id]["r_subs"]){
      out += "  r_sub: " + c_data[c_id]["y_subs"][r_sub] + "\n";
    }

    for(var p_sub in c_data[c_id]["p_subs"]){
      out += "  p_sub: " + c_data[c_id]["y_subs"][p_sub] + "\n";
    }
    out += "\n";
  }

  alert(out);

}
