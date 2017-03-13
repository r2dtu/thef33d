function saveCategorySettings(id) {
alert("SAVE CALLED");
  var parallax = $('#mainparallax' + id);
  var c_id = parallax.attr("c_id");
  var c_newname = $("#categoryName" + id).val();
  var c_oldname = parallax.attr("c_name");

  var category_data = {};


  if(c_newname == ""){
    alert("Please enter a category name");
    return;
  }

  if(c_newname == c_oldname){
    name = false;
  }

  // if(name == "false" && !background){
  //   alert("You did not adjust any settings");
  //   return;
  // }

  if(background){
    var fileSelect = document.getElementById('categoryBackground'+id);
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
  }

  var subs = {};

  $('#subs' + id).find('input').each(function () {
    if (this.type == "checkbox" && this.checked == true) {
      subs[this.name] = this.value;
    }
  });

  console.log(subs);
  category_data["subs"] = subs;

  if (background) {
    var filename = document.getElementById('categoryBackground'+id).files[0]["name"];
    category_data["c_img"] = "http://localhost/bg_images/dctu@ucsd.edu/" + filename; // TODO Change
  }


  if(c_id == ""){ //CREATE CATEGORY

    category_data["message"] = "create";
    category_data["c_newname"] = c_newname;

  }else{ //UPDATE CATEGORY

    category_data["message"] = "update";
    category_data["c_id"] = c_id;
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

      updateSettings(id);
      parallax.attr({"c_id" : c_id});
      parallax.attr({"c_name" : c_newname});

    }else if(response["can_update_or_create"] == "no"){

      alert("You already have a category with named \"" + c_newname + "\". Please pick another name.");
    }
  });

  request.fail(function (jqXHR, textStatus, errorThrown){
    alert("HTTPRequest: " + textStatus + " " + errorThrown);
  });
}


function deletePanel(id){
  var parallax = $('#mainparallax' + id);
  var c_id = parallax.attr("c_id");

  if(c_id != ""){

    var request = $.ajax({
        url: "php/category.php",
	type: "POST",
	data: {"message" : "deleteCategory", "c_id" : c_id}
    });


  }

  deleteCategory(id);

}

function displayCheckMarks(id, c_id, table){

  var sub_names = [];

  var sublist = $("#subs" + id);
  sublist.find('input').each(function () {
    if (this.type == "checkbox") {
      sub_names.push(this.name);
    }
  });

  var sub_name_data = {"message" : "subsInCat", "sub_names" : sub_names, "c_id" : c_id, "table" : table}

  var request = $.ajax({
    url: "php/category.php",
    type: "POST",
    data: sub_name_data
  });

  request.done(function (response, textStatus, jqXHR){

    var response = JSON.parse(response);

    for(var i in response){

      var sub_name = response[i];
      var checkbox = sublist.children('name=' + sub_name + ']');
      checkbox.toggle('click');
    }

  });

  request.fail(function (jqXHR, textStatus, errorThrown){
    alert("HTTPRequest: " + textStatus + " " + errorThrown);
  });

}
