$(document).ready(function(){

    /***** LOG IN TO ACCOUNT *****/
    $("#loginButton").click(function(){

      var username = $("#username").val();
      var password = $("#password").val();
      var loginData = {"message": "login", "username": username, "password": password}

      request = $.ajax({
          url: "php/login.php",
          type: "POST",
          data: loginData
      });

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

      request.fail(function (jqXHR, textStatus, errorThrown){

          alert("HTTPRequest: " + textStatus + " " + errorThrown);
      });

    });

    /***** SUBMIT ACCOUNT *****/
    $("#submitAccount").click(function(){

      var username = $("#emailInput").val();
      var password = $("#passwordInput").val();
      var question = $("#securityQuestionDropdown").val();
      var answer = $("#securityAnswer").val();
      var createData = {"message": "create_account", "username": username, "password": password, "security_question" : question, "security_answer" : answer}

      var request = $.ajax({
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

    $("#forgotPassword").click(function(){

      var email = $("#username").val();
      //get questoin and answer
      var forgottenData = {"message": "forgot_password", "username": email, "security_question" : question, "security_answer" : answer}

      var request = $.ajax({
          url: "php/login.php",
          type: "POST",
          data: forgottenData
      });

      request.done(function (response, textStatus, jqXHR){
          var response = JSON.parse(response);
          if(response["display_password"] == "yes"){
            //display password
          }else{
            alert("Wrong security answer");
          }
      });

      // Callback handler that will be called on failure
      request.fail(function (jqXHR, textStatus, errorThrown){
          alert("HTTPRequest: " + textStatus + " " + errorThrown);
      });


    });
});
