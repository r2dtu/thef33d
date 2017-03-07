$(document).ready(function(){
    
    $("#getCid").click(function(){

      var createData = {"action": "getCid"};

      var request = $.ajax({
          url: "youtube_api/YouTube_API.php",
          type: "POST",
          data: createData
      });

      // Callback handler that will be called on success
      request.done(function (response, textStatus, jqXHR){
          alert("Finished authorizing YouTube account and updating user Channel ID.");
      });

      // Callback handler that will be called on failure
      request.fail(function (jqXHR, textStatus, errorThrown){
          alert("HTTPRequest: " + textStatus + " " + errorThrown);
      });
    });
    
    $("#getSubs").click(function(){

      var createData = {"action": "getSubs"};

      var request = $.ajax({
          url: "youtube_api/YouTube_API.php",
          type: "POST",
          data: createData
      });

      // Callback handler that will be called on success
      request.done(function (response, textStatus, jqXHR){
          alert("Finished authorizing YouTube account and updating user Subscriptions.");
      });

      // Callback handler that will be called on failure
      request.fail(function (jqXHR, textStatus, errorThrown){
          alert("HTTPRequest: " + textStatus + " " + errorThrown);
      });
    });
    
    $("#getVids").click(function(){

      var createData = {"action": "getVids"};

      var request = $.ajax({
          url: "youtube_api/YouTube_API.php",
          type: "POST",
          data: createData
      });

      // Callback handler that will be called on success
      request.done(function (response, textStatus, jqXHR){
          alert("Finished authorizing YouTube account and updating user Subscriptions.");
      });

      // Callback handler that will be called on failure
      request.fail(function (jqXHR, textStatus, errorThrown){
          alert("HTTPRequest: " + textStatus + " " + errorThrown);
      });
    });

}