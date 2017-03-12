$(document).ready(function(){

  $(".updateSettingsButton").click(function(){

    var $parallax = $(this).parent().parent().parent();
    var c_id = $parallax.attr("c_id");
    var parallax_name = $parallax.attr("id");
    var numPanel = parallax_name.charAt(parallax_name.length - 1);
    var c_newname = $("#categoryName" + numPanel).val();

    var category_data = {}
    alert(name + "   " + background);
    if(name == "false" && background == false){
      alert("You did not adjust any settings");
      return;
    }

    if(background == true){
      var fileSelect = document.getElementById('categoryBackground1');
      var file = fileSelect.files[0];
      var fileData = new FormData();
      fileData.append("photo", file);
      var request1 = $.ajax({
        url: 'php/acceptFile.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: fileData
      });

      request1.done(function(response, textStatus, jqXHR) {
        console.log(response);
      });
      request1.fail(function(jqXHR, textStatus, errorThrown) {
        alert("Upload failed: " + errorThrown);
      });
    }

    if(c_id == ""){

      category_data["message"] = "create";
      category_data["c_newname"] = c_newname;
      //deal with image. category_data["c_img"] =

    }else{

      category_data["message"] = "update";
      category_data["c_id"] = c_id;

      var filename = document.getElementById('categoryBackground1').files[0]["name"];
      category_data["c_img"] = "http://thef33d.me/bg_images/dctu@ucsd.edu/" + filename; // TODO Change

      if(name == "true"){
        category_data["c_newname"] = c_newname;
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
