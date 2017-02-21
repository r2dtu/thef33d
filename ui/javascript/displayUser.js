$(document).ready(function(){

  var request = $.ajax({
      url: "php/displayUser.php",
      type: "POST",
  });

  // Callback handler that will be called on success
  request.done(function (response, textStatus, jqXHR){
    var category_data = JSON.parse(response);
    for(var category_name in category_data){

      //create new parallax

      var background_img = category_data[category_name][background_img];

      //disply category name and img

      for(var y_sub in category_data[category_name]["y_subs"]){
        //get videos from that subscription and display them
      }

      for(var r_sub in category_data[category_name]["r_subs"]){
        //get feeds from that subscription and display them
      }

      for(var p_sub in category_data[category_name]["p_subs"]){
        //get feedss from that subscription and display them
      }
    }

  });

  // Callback handler that will be called on failure
  request.fail(function (jqXHR, textStatus, errorThrown){
      alert("HTTPRequest: " + textStatus + " " + errorThrown);
  });
});
