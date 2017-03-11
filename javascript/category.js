$(document).ready(function(){

  $("#createCategory").click(function(){
    var c_name = $("#c_name");
    var c_img = $("#c_img");
    var c_data = {"message": "create_category", "c_name": c_name, "c_img": c_img}

    var request = $.ajax({
        url: "php/category.php",
        type: "POST",
        data: c_data
    });

    request.done(function (response, textStatus, jqXHR){

      var response = JSON.parse(response);

      if(response["can_create"] == "yes"){
        //create category on UI
      }else if(response["can_create"] == "no"){
        //notify that category name already exists
      }else{

      }

    });

    request.fail(function (jqXHR, textStatus, errorThrown){

    });


  });
});