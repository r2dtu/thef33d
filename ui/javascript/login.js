$(document).ready(function(){

    $("#login_button").click(function(){

      var username = $("#username").val();
      var password = $("#password").val();
      var loginData = {"message": "login", "username": username, "password": password}

      request = $.ajax({
          url: "php/login.php",
          type: "POST",
          data: loginData
      });

      // Callback handler that will be called on success
      request.done(function (response, textStatus, jqXHR){
          var user_info = JSON.parse(response);
          if(user_info.can_login == "yes"){
            window.location.href = "index.html";
          }else if(user_info.can_login == "no"){
            alert("Wrong username or password. Try again or make an account below.");
          }else{
            alert("Database issue: " + user_info.error);
          }
      });

      // Callback handler that will be called on failure
      request.fail(function (jqXHR, textStatus, errorThrown){
          alert("HTTPRequest: " + textStatus + " " + errorThrown);
      });

    });
    $("#create_button").click(function(){
      var username = $("#username").val();
      var password = $("#password").val();
      var createData = {"message": "create_account", "username": username, "password": password}

      var request;

      request = $.ajax({
          url: "php/login.php",
          type: "POST",
          data: createData
      });

      // Callback handler that will be called on success
      request.done(function (response, textStatus, jqXHR){
          var user_info = JSON.parse(response);
          if(user_info.can_create == "yes"){
            window.location.href = "index.html";
          }else if(user_info.can_create == "no"){
            alert("Email already exists with a current account");
          }else{
            alert("Database issue: " + user_info["error"]);
          }
      });

      // Callback handler that will be called on failure
      request.fail(function (jqXHR, textStatus, errorThrown){
          alert("HTTPRequest: " + textStatus + " " + errorThrown);
      });
    });
});
