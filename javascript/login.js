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

      request.fail(function (jqXHR, textStatus, errorThrown){
          alert("HTTPRequest: " + textStatus + " " + errorThrown);
      });
    });
/*
    $("#forgotPassword").click(function(){

      var email = $("#forgotEmail").val();
      var question = $("#forgotDropdown").val();
      var answer = $("#forgotAnswer").val();

      var forgottenData = {"message": "forgot_password", "username": email, "security_question" : question, "security_answer" : answer}

      var request = $.ajax({
          url: "php/login.php",
          type: "POST",
          data: forgottenData
      });

      request.done(function (response, textStatus, jqXHR){
          var response = JSON.parse(response);
          if(response["display_password"] == "yes"){
            alert("Your password is: \"" + response["password"] + "\"");
          }else{
            alert("Wrong security answer");
          }
      });

      request.fail(function (jqXHR, textStatus, errorThrown){
          alert("HTTPRequest: " + textStatus + " " + errorThrown);
      });


    });*/
});
/***** Slide the accountInfo div to the left and display the createAccount fields *****/
function generic_slide(){

    $('#test').toggleClass('createAccountInfo-slide');
    $('#CreateAccount').toggleClass('hide');

}

/***** Show the Forgot Password panel  and retrieval fields *****/
var x = 0;

function transition_forgot(){
  if( x % 2 == 0){
    $("#container").animate({left: '+=300px'}, 1000, function() {
          $("#forgotPasswordCont").css('zIndex', '10000');
          $("#container").animate({left: '-=300px'}, 1000);
        });
    x = x + 1;
  }
  else{
    $("#forgotPasswordCont").animate({left: '+=300px'}, 1000, function() {
          $("#forgotPasswordCont").css('zIndex', '0');
          $("#forgotPasswordCont").animate({left: '-=300px'}, 1000);
        });
        x = x + 1;

  }
}


function showProfile( idTag ){
    $( '#' + idTag ).css( 'opacity', '100' );
}

function hideProfile( idTag ){
  $( '#' + idTag ).css( 'opacity', '0' );

}
