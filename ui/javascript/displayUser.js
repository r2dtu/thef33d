$(document).ready(function(){

  var request = $.ajax({
      url: "php/displayUser.php",
      type: "POST",
  });

  // Callback handler that will be called on success
  request.done(function (response, textStatus, jqXHR){
    var category_data = JSON.parse(response);

    var out = "";

    out += "Category info for user: " + category_data["username"] + "\n\n";

    for(var c_id in category_data){

      if(c_id == "username") continue;

      out += "c_id: " + c_id + "\n"
      out += "c_name: " + category_data[c_id]["c_name"] + "\n";

      for(var y_sub in category_data[c_id]["y_subs"]){
        out += "  y_sub: " + category_data[c_id]["y_subs"][y_sub] + "\n";
      }

      for(var r_sub in category_data[c_id]["r_subs"]){
        out += "  r_sub: " + category_data[c_id]["y_subs"][r_sub] + "\n";
      }

      for(var p_sub in category_data[c_id]["p_subs"]){
        out += "  p_sub: " + category_data[c_id]["y_subs"][p_sub] + "\n";
      }
      out += "\n";
    }

    alert(out);

  });

  // Callback handler that will be called on failure
  request.fail(function (jqXHR, textStatus, errorThrown){
      alert("HTTPRequest: " + textStatus + " " + errorThrown);
  });
});
