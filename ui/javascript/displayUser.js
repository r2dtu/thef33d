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
    var numPanels = 0;

    printData(c_data);

    for(var c_id in c_data){

      if(c_id == "username") continue;

      numPanels = numPanels + 1;

      $panels.append( '<div id="mainparallax' + numPanels + '" cid="' + c_id + '"cname="' + c_data[c_id]["c_name"] + '"class="parallax_main parallax_main_general"><div id="settingsButton' + numPanels + '" class="settings-button" onclick="generic_settings(' + numPanels + ')"><img src="CSS/img/settings-gear.jpg" height="20px" width="20px" /></div><div id="showButton' + numPanels + '" class="show-button" onclick="generic_show(' + numPanels + ')"><img src="CSS/img/show.jpeg" height="20px" width="20px" /></div><div id="parallaxSettings' + numPanels + '" class="parallax-settings-wrap"><div class="parallax-settings"></div></div></div>');
      $navList.append('<li draggable="true" onclick="hideMenu()"><a href="#mainparallax' + numPanels + '">Untitled</a></li>');

      //style each parallax div with .css

      for(var y_sub in c_data[c_id]["y_subs"]){
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
