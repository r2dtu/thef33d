$(document).ready(function(){

  var request = $.ajax({
      url: "../server/displayUser.php",
      type: "POST",
  });

  // Callback handler that will be called on success
  request.done(function (response, textStatus, jqXHR){
      $("#user").text(response);
  });

  // Callback handler that will be called on failure
  request.fail(function (jqXHR, textStatus, errorThrown){
      alert("HTTPRequest: " + textStatus + " " + errorThrown);
  });

});
