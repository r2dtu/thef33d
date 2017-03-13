function saveCategorySettings(id) {

  var parallax = $('#mainparallax' + id);
  var c_id = parallax.attr("c_id");
  var parallax_name = parallax.attr("id");
  var numPanel = parallax_name.charAt(parallax_name.length - 1);
  var c_newname = $("#categoryName" + numPanel).val();

  var category_data = {};

  // if(name == "false" && !background){
  //   alert("You did not adjust any settings");
  //   return;
  // }

  if(background){
    var fileSelect = document.getElementById('categoryBackground1');
    var file = fileSelect.files[0];
    var fileData = new FormData();
    fileData.append("bg_image", file);
    var request1 = $.ajax({
      url: 'php/uploadFile.php',
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

  var subs = {};

  $('#subs' + id).find('input').each(function () {
    if (this.type == "checkbox" && this.checked == true) {
      subs[this.name] = this.value;
    }
  });

  console.log(subs);
  category_data["subs"] = subs;

  if(c_id == ""){

    category_data["message"] = "create";
    category_data["c_newname"] = c_newname;
    //deal with image. category_data["c_img"] =

  }else{

    category_data["message"] = "update";
    category_data["c_id"] = c_id;

    if (background) {
      var filename = document.getElementById('categoryBackground1').files[0]["name"];
      category_data["c_img"] = "http://localhost/bg_images/dctu@ucsd.edu/" + filename; // TODO Change
    }

    if(name == "true"){
      category_data["c_newname"] = c_newname;
    }
  }

  var e = document.getElementById("categoryAccounts" + id);
  var social = e.options[e.selectedIndex].value;
  switch (social) {
    case 'YouTube':
      category_data["table"] = "y_subs";
      break;
    case 'Pinterest':
      category_data["table"] = "p_subs";
      break;
    case 'Reddit':
      category_data["table"] = "r_subs";
      break;
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
      parallax.attr({"c_id" : c_id});

    }else if(response["can_update_or_create"] == "no"){

      alert("You already have a category with named \"" + c_newname + "\". Please pick another name.");
    }
  });

  request.fail(function (jqXHR, textStatus, errorThrown){
    alert("HTTPRequest: " + textStatus + " " + errorThrown);
  });
}

$(document).ready(function(){

  $(".updateSettingsButton").click(function(){
  });


  $(".deleteCategoryButton").click(function(){

    var $parallax = $(this).parent().parent().parent();
    var c_id = $parallax.attr("c_id");
    var numPanel = parallax_name.charAt(parallax_name.length - 1);

    if(c_id != ""){

      request = $.ajax({
        url: "php/category.php",
	type: "POST",
	data: {"message" : "deleteCategory", "c_id" : c_id}
      });


      request.done(function (response, textStatus, jqXHR){

        var response = JSON.parse(response);

      });

      request.fail(function (jqXHR, textStatus, errorThrown){
        alert("HTTPRequest: " + textStatus + " " + errorThrown);
      });
    }

    deleteCategory(numPanel);

  });

});
