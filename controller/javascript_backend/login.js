$(document).ready(function() {

    /***** LOG IN TO ACCOUNT *****/
    $("#loginButton").click(function() {

      var username = $("#username").val();
      var password = $("#password").val();
      var loginData = {"message": "login", "username": username, "password": password}
      if (username == "") {
        alert("Please input a username.");
        return;
      }

      request = $.ajax({
          url: "../controller/login.php",
          type: "POST",
          data: loginData
      });

      request.done(function (response, textStatus, jqXHR) {
          var user_info = JSON.parse(response);
          if (user_info.can_login == "yes") {
            window.location.href = "index.html";
          } else if (user_info.can_login == "no") {
            alert("Wrong username or password. Try again or make an account below.");
      	    $("#username").val("");
      	    $("#password").val("");
      	    $("#username").focus();
          } else if (user_info.can_login == "google") {
            alert("You signed up with an e-mail linked to Google. Please sign-in using Google.");
          } else {
            alert("Database issue: " + user_info.error);
          }
      });

      request.fail(function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR);
          alert("HTTPRequest: " + textStatus + " " + errorThrown);
      });

    });

    /***** SUBMIT ACCOUNT *****/
    $("#submitAccount").click(function() {

      var first_name = $("#nameInput").val();
      var username = $("#emailInput").val();
      var password = $("#passwordInput").val();
      var question = $("#securityQuestionDropdown option:selected").text();
      var answer = $("#securityAnswer").val();
      var createData = {"message": "create_account", "first_name": first_name, "username": username, "password": password, "security_question" : question, "security_answer" : answer}

     if (first_name == "" || username == "" || password == "" || answer == "") {
       alert("Please enter values for all input fields.");
       return;
     }

      var request = $.ajax({
          url: "../controller/login.php",
          type: "POST",
          data: createData
      });
      request.done(function (response, textStatus, jqXHR) {
          console.log(response);
          var user_info = JSON.parse(response);
          if (user_info.can_create == "yes") {
            window.location.href = "index.html";
          }else if (user_info.can_create == "no") {
            alert("Email already exists with a current account");
          }else{
            alert("Database issue: " + user_info["error"]);
          }
      });

      request.fail(function (jqXHR, textStatus, errorThrown) {
          alert("HTTPRequest: " + textStatus + " " + errorThrown);
      });
    });

    $("#forgotSubmit").click(function() {
      var email = $("#forgotEmail").val();
      var question = $("#forgotDropdown option:selected").text();
      var answer = $("#forgotAnswer").val();
      var forgottenData = {"message": "forgot_password", "username": email, "security_question" : question, "security_answer" : answer}

      var request = $.ajax({
          url: "../controller/login.php",
          type: "POST",
          data: forgottenData
      });
      request.done(function (response, textStatus, jqXHR) {
          var response = JSON.parse(response);
          if (response["display_password"] == "yes") {
            alert("Your password is: \"" + response["password"] + "\"");
          }else{
            alert("Incorrect email or security answer");
          }
      });

      request.fail(function (jqXHR, textStatus, errorThrown) {
          alert("HTTPRequest: " + textStatus + " " + errorThrown);
      });


    });
});
/***** Slide the accountInfo div to the left and display the createAccount fields *****/
function generic_slide() {

    $('#test').toggleClass('createAccountInfo-slide');
    $('#CreateAccount').toggleClass('hide');

}

/***** Show the Forgot Password panel  and retrieval fields *****/
var x_counter = 0;
var locked = false;
function transition_forgot() {
  if (!locked) {
    locked = true;
    if ( x_counter % 2 == 0) {
      $("#container").animate({left: '+=300px'}, 1000, function() {
            $("#forgotPasswordCont").css('zIndex', '10000');
            $("#container").animate({left: '-=300px'}, 1000);
          });
      x_counter = x_counter + 1;
    }
    else {
      $("#forgotPasswordCont").animate({left: '+=300px'}, 1000, function() {
            $("#forgotPasswordCont").css('zIndex', '0');
            $("#forgotPasswordCont").animate({left: '-=300px'}, 1000);
          });
          x_counter = x_counter + 1;

    }
    setTimeout(unlock, 2000);
  }
}

function unlock() {
  locked = false;
}

function showProfile( idTag ) {
    $( '#' + idTag ).css( 'opacity', '100' );
}

function hideProfile( idTag ) {
  $( '#' + idTag ).css( 'opacity', '0' );

}
