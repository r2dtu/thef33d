$(document).ready(function() {

    var $addButton = $('.addScreen');

    var numPanels = 3;

    // + button
    $addButton.on('mouseover', function() {

        $addButton.css('opacity','0.5');
        //$addButton.toggleClass( 'animated' );
        //$addButton.toggleClass( 'headShake' );

    });

    $addButton.on('mouseout', function() {

        $addButton.css('opacity','1.0');
        //$addButton.toggleClass( 'animated' );
        //$addButton.toggleClass( 'headShake' );

    });

    $addButton.on('click', function() {

        var $panels = $('.panels');
        var $navList = $('.nav-menu-list');

        numPanels = numPanels + 1;

        $panels.append( '<div id="mainparallax' + numPanels + '" class="parallax_main parallax_main_general"><div id="settingsButton' + numPanels + '" class="settings-button" onclick="generic_settings(' + numPanels + ')"><img src="CSS/img/settings-gear.jpg" height="20px" width="20px" /></div><div id="showButton' + numPanels + '" class="show-button" onclick="generic_show(' + numPanels + ')"><img src="CSS/img/show.jpeg" height="20px" width="20px" /></div><div id="parallaxSettings' + numPanels + '" class="parallax-settings-wrap"><div class="parallax-settings"></div></div></div>');

        $navList.append('<li draggable="true" onclick="hideMenu()"><a href="#mainparallax' + numPanels + '">Untitled</a></li>');

        jump( ("mainparallax" + numPanels), numPanels );

    });

});

function jump( h, id ){

    var loc = "#" + h;
    window.location.href = loc;
    $('.toggle-button').click();
    $("#settingsButton" + id).click();

}
