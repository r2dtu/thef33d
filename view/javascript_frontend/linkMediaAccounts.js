$(document).ready(function(){

    $("#linkYButton").click(function(){

      var y_email = $("#y_email").val();
      var y_password = $("#y_password").val();

      //VERIFY WITH YOUTUBE THIS ACCOUNT and get channel ID

      var y_id; //get from YOUTUBE api

      var y_data = {"message": "link_y", "y_id": y_id}

      request = $.ajax({
          url: "controllerlinkMediaAccounts.php",
          type: "POST",
          data: y_data
      });

      request.done(function (response, textStatus, jqXHR){
        //do something
      });

      request.fail(function (jqXHR, textStatus, errorThrown){
        alert("HTTPRequest: " + textStatus + " " + errorThrown);
      });

    });

    //LINK REDDIT AND PINTEREST

});
