$(document).ready(function(){

  var actionData = {"action": "getVids"};

  var request = $.ajax({
      url: "youtube_api/YouTube_API.php",
      type: "POST",
      data: actionData
  });

  // Callback handler that will be called on success
  request.done(function (response, textStatus, jqXHR){
    console.log(response);
    var c_data = JSON.parse(response);

    printData(c_data);

    var $panels = $('.panels');
    var $navList = $('.nav-menu-list');
    var numPanels = 0;

    for(var c_id in c_data){

      if(c_id == "username") continue;

      numPanels = numPanels + 1;

      createNewParallax(numPanels, c_id);

      addYoutubeList(c_data[c_id]["y_links"], numPanels);

      console.log("success");
    }

  }); //End of request.done

  request.fail(function (jqXHR, textStatus, errorThrown){
      alert("HTTPRequest: " + textStatus + " " + errorThrown);
      console.log(jqXHR);
  });

}); //END OF $(document).ready


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
