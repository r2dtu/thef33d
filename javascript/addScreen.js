$(document).ready(function() {

    var $addButton = $('.addScreen');

    var numPanels = 3;

    var settings = '<div class="parallax-settings">' +
                        '<form class="settings-form">' +
                            '<div class="settings-categoryName">' +
                                'Category:' +
                                '<br>' +
                                '<input type="text" id="categoryName' + numPanels + '" placeholder="Name of category" class="categoryName">' +
                                '<input type="submit" value="Submit" onclick="updateMenuName( ' + numPanels + ' )">' +
                            '</div>' +
                            '<div class="settings-categoryBackground">' +
                                '<br> Background Image:' +
                                '<br>' +
                                '<input type="file" id="categoryBackground' + numPanels + '" class="categoryBackgroundSelect">' +
                                '<input type="submit" value="Submit" onclick="updateBackground( ' + numPanels + ' )">' +
                            '</div>' +
                            '<div class="settings-categoryOrganized">' +
                                '<br> Organized:' +
                                '<br>' +
                                '<select id="categoryOrganized' + numPanels + '" name="organized" style="width: 180px;">' +
                                    '<option value="a-z">' +
                                        'a-z:A-Z' +
                                    '</option>' +
                                    '<option value="z-a">' +
                                        'z-a:Z-A' +
                                    '</option>' +
                                '</select>' +
                            '</div>' +
                        '</form>' +
                        '<div class="panel-information">' +
                            '<div class="panel-information-accounts">' +
                                '<br> Account:' +
                                '<br>' +
                                '<select id="categoryAccounts3" name="accounts" style="width: 50%;" class="categoryAccounts" onchange="fetchMedia(this.value, 3)">' +
                                    '<option value="YouTube">' +
                                        'Youtube' +
                                    '</option>' +
                                    '<option value="Pinterest">' +
                                        'Pinterest' +
                                    '</option>' +
                                    '<option value="Reddit">' +
                                        'Reddit' +
                                    '</option>' +
                                '</select>' +
                            '</div>' +
                            '<div class="panel-information-subscriptions">' +
                                '<br> Subscriptions to Include:' +
                                '<br>' +
                                '<form class="categorySubscriptions">' +
                                    '<input type="checkbox" name="subscription" value="Science"> Science' +
                                    '<br>' +
                                    '<input type="checkbox" name="subscription" value="League of Legends"> League of Legends' +
                                    '<br>' +
                                    '<input type="checkbox" name="subscription" value="Art History"> Art History' +
                                    '<br>' +
                                    '<input type="checkbox" name="subscription" value="Wild Turtle Footage"> Wild Turtle Footage' +
                                    '<br>' +
                                    '<input type="submit">' +
                                '</form>' +
                            '</div>' +
                    '</div>';

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

        $panels.append( '<div id="mainparallax' + numPanels + '" class="parallax_main parallax_main_general">\n\
                          <div id="settingsButton' + numPanels + '" class="settings-button" onclick="generic_settings(' + numPanels + ')">\n\
                              <img src="CSS/img/settings-gear.jpg" height="20px" width="20px" />\n\
                          </div>\n\
                          <div id="showButton' + numPanels + '" class="show-button" onclick="generic_show(' + numPanels + ')">\n\
                              <img src="CSS/img/show.jpeg" height="20px" width="20px" />\n\
                          </div>\n\
                          <div id="parallaxSettings' + numPanels + '" class="parallax-settings-wrap">' +
                          settings +
                          '</div>\n\
                        </div>' );
        /*$panels.append( '<div id="mainparallax' + numPanels + '" class="parallax_main parallax_main_general"><div id="settingsButton' + numPanels + '" class="settings-button" onclick="generic_settings(' + numPanels + ')"><img src="CSS/img/settings-gear.jpg" height="20px" width="20px" /></div><div id="showButton' + numPanels + '" class="show-button" onclick="generic_show(' + numPanels + ')"><img src="CSS/img/show.jpeg" height="20px" width="20px" /></div><div id="parallaxSettings' + numPanels + '" class="parallax-settings-wrap"><div class="parallax-settings"><form class="settings-form">Category:<br><input type="text" name="categoryName" placeholder="Name of category" class="categoryName"><br></form></div></div></div>');*/

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
