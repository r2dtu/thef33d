angular
  .module('feedapp')
  .controller('loginController', function($scope, $window){
    'use strict';

    var user_info = new Firebase("https://thefeedproject-c1336.firebaseio.com/user_info");

    $scope.loginUser = function(){

      var user = user_info.orderByChild("email");

      var flag = false;

      user.on("child_added", function(data){
        if(data.val().email == $scope.email && data.val().password == $scope.password){
          flag = true;
        }
      });

      if(flag){
        $window.history.pushState('site', 'The Feed', 'main_page.html');
        $window.location.reload();
      }else{
        $scope.email = "";
        $scope.password = "";
        alert("Either email or password is incorrect :(");
      }
    };

    $scope.createAccount = function(){
      //verify account does not already exist

      var user = user_info.orderByChild("email");

      var flag = false;

      user.on("child_added", function(data){
        if(data.val().email == $scope.email){
          flag = true;
        }
      });

      if(flag){
        alert("That email already exists with a current account. Try logging in.");
      }else{
        user_info.push({
          email: $scope.create_email,
          password: $scope.create_password
        });

        $window.history.pushState('site', 'The Feed', 'main_page.html');
        $window.location.reload();

        alert("You account has been created!");
      }
    };
  });
