$(document).ready(function(){

  $(".updateSettingsButton").click(function(){

    var $parallax = $(this).parent().parent().parent();
    var c_id = $parallax.attr("c_id");
    var parallax_name = $parallax.attr("id");
    var numPanel = parallax_name.charAt(parallax_name.length - 1);

    //check if parallax_name already exists. If so, alert. If not, continue

    if(c_id == ""){
      //possibly create category
    }else{
      //possibly update category
    }

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

  $(".deleteCategoryButton").click(function(){

    var request = $.ajax({
        url: "php/category.php",
        type: "POST",
        data:
    });

    request.done(function (response, textStatus, jqXHR){

      var response = JSON.parse(response);


    });

    request.fail(function (jqXHR, textStatus, errorThrown){

    });


  });
});
