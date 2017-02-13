$(document).ready(function() {

    var $toggleButton = $('.toggle-button'),
        $menuWrap = $('.menu-wrap'),
        $mainpanel = $('.main-panel');

    // Hamburger button
    $toggleButton.on('click', function() {
        $(this).toggleClass('button-open');
        $menuWrap.toggleClass('menu-show');
        $mainpanel.toggleClass('main-panel-shift');
    });
});
