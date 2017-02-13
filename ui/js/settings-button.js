$(document).ready(function() {

    var $settingsButton = $('.settings-button');

    // Settings button 1
    $("#settingsButton1").on('click', function() {
        $("#settingsButton1").toggleClass('settings-button-open');
        $("#parallaxSettings1").toggleClass('parallax-settings');
    });

    // Settings button 2
    $("#settingsButton2").on('click', function() {
        $("#settingsButton2").toggleClass('settings-button-open');
        $("#parallaxSettings2").toggleClass('parallax-settings');
    });

    // Settings button 3
    $("#settingsButton3").on('click', function() {
        $("#settingsButton3").toggleClass('settings-button-open');
        $("#parallaxSettings3").toggleClass('parallax-settings');
    });

    // Show button 1
    $("#showButton1").on('click', function() {
        $("#mainparallax1").toggleClass('parallax_main_shrink');
        $("#showButton1").toggleClass('show-button-shink');
        $("#settingsButton1").toggleClass('settings-button-shrink');
        $("#parallaxSettings1").toggleClass('parallax-settings-hide');
    });

    // Show button 2
    $("#showButton2").on('click', function() {
        $("#mainparallax2").toggleClass('parallax_main_shrink');
        $("#showButton2").toggleClass('show-button-shink');
        $("#settingsButton2").toggleClass('settings-button-shrink');
        $("#parallaxSettings2").toggleClass('parallax-settings-hide');
    });

    // Show button 3
    $("#showButton3").on('click', function() {
        $("#mainparallax3").toggleClass('parallax_main_shrink');
        $("#showButton3").toggleClass('show-button-shink');
        $("#settingsButton3").toggleClass('settings-button-shrink');
        $("#parallaxSettings3").toggleClass('parallax-settings-hide');
    });

});
