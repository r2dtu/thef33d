$(document).ready(function(){

  $(".updateSettingsButton").click(function(){

    var $parallax = $(this).parent().parent().parent();
    var c_id = $parallax.attr("c_id");
    var parallax_name = $parallax.attr("id");
    var numPanel = parallax_name.charAt(parallax_name.length - 1);
    var c_newname = $("#categoryName" + numPanel).val();

    var category_data = {}
    alert(name + "   " + background);
    if(name == "false" && background == "false"){
      alert("You did not adjust any settings");
      return;
    }

    if(c_id == ""){

      category_data["message"] = "create";
      category_data["c_newname"] = c_newname;
      //deal with image. category_data["c_img"] =

    }else{

      data["message"] = "update";
      category_data["c_id"] = c_id;

      if(name == "true"){
        category_data["c_newname"] = c_newname;
      }

      if(background == "true"){
        //deal with image. category_data["c_img"] =
      }
    }

    var request = $.ajax({
    	url: "php/category.php",
	type: "POST",
	data: category_data
    });

    request.done(function (response, textStatus, jqXHR){

      var response = JSON.parse(response);

      if(response["can_update_or_create"] == "yes"){

        updateSettings(numPanel);

      }else if(response["can_update_or_create"] == "no"){

        alert("You already have a category with named \"" + c_newname + "\". Please pick another name.");
      }
    });

    request.fail(function (jqXHR, textStatus, errorThrown){
      alert("HTTPRequest: " + textStatus + " " + errorThrown);
    });


  });

});
