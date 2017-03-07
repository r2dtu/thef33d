$(document).ready(function() {

    var $dropdownButton = $('.dropdown-button');

    // Dropdown button
    $dropdownButton.on('click', function() {
        $(this).toggleClass('pullup-button');

    });
});
