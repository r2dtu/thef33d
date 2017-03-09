function createNewParallax(numPanels, c_id){

  var $panels = $('.panels');
  var $navList = $('.nav-menu-list');

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
                          '<br> Orangized:' +
                          '<br>' +
                          '<select id="categoryOrganized' + numPanels + '" name="organized" style="width: 50%;">' +
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
                          '<select id="categoryAccounts' + numPanels + '" name="accounts" style="width: 70%;" class="categoryAccounts">' +
                              '<option value="YouTube">' +
                                  'Youtube' +
                              '</option>' +
                              '<option value="Pintrest">' +
                                  'Pintrest' +
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
                  '</div>' +
              '</div>'

  $panels.append( '<div id="mainparallax' + numPanels + '" class="parallax_main parallax_main_general"><div id="settingsButton' + numPanels + '" class="settings-button" onclick="generic_settings(' + numPanels + ')"><img src="CSS/img/settings-gear.jpg" height="20px" width="20px" /></div><div id="showButton' + numPanels + '" class="show-button" onclick="generic_show(' + numPanels + ')"><img src="CSS/img/show.jpeg" height="20px" width="20px" /></div><div id="parallaxSettings' + numPanels + '" class="parallax-settings-wrap">' + settings + '</div></div>');

  /*$panels.append( '<div id="mainparallax' + numPanels + '" class="parallax_main parallax_main_general"><div id="settingsButton' + numPanels + '" class="settings-button" onclick="generic_settings(' + numPanels + ')"><img src="CSS/img/settings-gear.jpg" height="20px" width="20px" /></div><div id="showButton' + numPanels + '" class="show-button" onclick="generic_show(' + numPanels + ')"><img src="CSS/img/show.jpeg" height="20px" width="20px" /></div><div id="parallaxSettings' + numPanels + '" class="parallax-settings-wrap"><div class="parallax-settings"><form class="settings-form">Category:<br><input type="text" name="categoryName" placeholder="Name of category" class="categoryName"><br></form></div></div></div>');*/

  $navList.append('<li draggable="true" onclick="hideMenu()"><a href="#mainparallax' + numPanels + '"><b id="name' + numPanels + '">Untitled</b></a></li>');
}

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

        numPanels = numPanels + 1;

        createNewParallax(numPanels, "");

        jump( ("mainparallax" + numPanels), numPanels );

    });

});

function updateMenuName( id ){

    name = document.getElementById("categoryName" + id).value;

    document.getElementById("name" + id).innerHTML = name;

}

function updateBackground( id ){

    /*
    pic = document.getElementById("categoryBackground" + id).value;

    $('.parallax_main_1').css( 'background-image', 'img/snowy-mointain.jpg');
    */

}

function jump( h, id ){

    var loc = "#" + h;
    window.location.href = loc;
    $('.toggle-button').click();
    $("#settingsButton" + id).click();

}
