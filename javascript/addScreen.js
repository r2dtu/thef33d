function createNewParallax(numPanels, c_id, c_name, c_img){

  var $panels = $('.panels');
  var $navList = $('.nav-menu-list');

  var embed = '<div id="embedded'+numPanels+'" class="embedded">' +
                    '<h1 id="leftScrollYoutube' + numPanels + '" class="leftScrollYoutube" onmouseover="growLeft( 1, ' + numPanels + ' )" onmouseout="shrinkLeft(1, ' + numPanels + ')" onclick="shiftLeft(1, ' + numPanels + ')">&lt;</h1>' +
                    '<ul id="mainparallax' + numPanels + '-youtube">' +
                    '</ul>' +
                    '<h1 id="rightScrollYoutube' + numPanels + '" class="rightScrollYoutube" onmouseover="growRight( 1, ' + numPanels + ' )" onmouseout="shrinkRight(1, ' + numPanels + ')" onclick="shiftRight(1, ' + numPanels + ')">&gt;</h1>' +
                    '<h1 id="leftScrollPin' + numPanels + '" class="leftScrollPin" onmouseover="growLeft( 2, '+numPanels+' )" onmouseout="shrinkLeft(2, '+numPanels+')" onclick="shiftLeft(2, '+numPanels+')">&lt;</h1>' +
                    '<ul id="mainparallax'+numPanels+'-pin">' +
                    '</ul>' +
                    '<h1 id="rightScrollPin'+numPanels+'" class="rightScrollPin" onmouseover="growRight( 2, '+numPanels+' )" onmouseout="shrinkRight(2, '+numPanels+')" onclick="shiftRight(2, '+numPanels+')">&gt;</h1>' +
                    '<h1 id="leftScrollReddit'+numPanels+'" class="leftScrollReddit" onmouseover="growLeft( 3, '+numPanels+' )" onmouseout="shrinkLeft(3, '+numPanels+')" onclick="shiftLeft(3, '+numPanels+')">&lt;</h1>' +
                    '<ul id="mainparallax'+numPanels+'-reddit">' +
                    '</ul>' +
                    '<h1 id="rightScrollReddit'+numPanels+'" class="rightScrollReddit" onmouseover="growRight( 3, '+numPanels+' )" onmouseout="shrinkRight(3, '+numPanels+')" onclick="shiftRight(3, '+numPanels+')">&gt;</h1>' +
                '</div>'

  var settings = '<div class="parallax-settings">' +
                  '<form class="settings-form">' +
                      '<div class="settings-categoryName">' +
                          'Category:' +
                          '<br>' +
                          '<input type="text" id="categoryName' + numPanels + '" placeholder="Name of category" class="categoryName" oninput="nameFlag()">' +
                      '</div>' +
                      '<div class="settings-categoryBackground">' +
                          '<br> Background Image:' +
                          '<br>' +
                          '<input type="file" id="categoryBackground' + numPanels + '" class="categoryBackgroundSelect" onchange="backgroundFlag(this.files)">' +
                      '</div>' +
                      '<div class="settings-categorySize">' +
                                '<br> Size:' +
                                '<br>' +
                                '<input id="range'+numPanels+'" type="range" id="categorySize'+numPanels+'" class="categorySize" onchange="sizeFlag()">' +
                      '</div>' +
                      '<div class="settings-categoryOrganized">' +
                          '<br> Organized:' +
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
                  '<input class="updateSettingsButton" type="submit" value="Save Settings" onclick="saveCategorySettings(' + numPanels + ')">' +
                  '<input class="deleteCategoryButton" type="submit" value="Delete Panel">' +
                  '<div class="panel-information">' +
                      '<div class="panel-information-accounts">' +
                          '<br> Account:' +
                          '<br>' +
                          '<select id="categoryAccounts' + numPanels + '" name="accounts" style="width: 70%;" class="categoryAccounts" onchange="updateSubs('+numPanels+')">' +
                              '<option value="default">' +
                                  'Please select a media account to sync with...' +
                              '</option>' +
                              '<option value="YouTube">' +
                                  'Youtube' +
                              '</option>' +
                              '<option value="Pinterest">' +
                                  'Pintrest' +
                              '</option>' +
                              '<option value="Reddit">' +
                                  'Reddit' +
                              '</option>' +
                          '</select>' +
                      '</div>' +
                      '<div id="subs'+numPanels+'" class="panel-information-subscriptions">' +
                          '<br> Subscriptions to Include:' +
                          '<br>' +
                      '</div>' +
                  '</div>' +
              '</div>';

  $panels.append( '<div id="mainparallax' + numPanels + '" c_id="' + c_id + '" class="parallax_main parallax_main_general"><div id="settingsButton' + numPanels + '" class="settings-button" onclick="generic_settings(' + numPanels + ')"><img src="CSS/img/settings-gear.jpg" height="20px" width="20px" /></div><div id="showButton' + numPanels + '" class="show-button" onclick="generic_show(' + numPanels + ')"><img src="CSS/img/show.jpeg" height="20px" width="20px" /></div>' + embed + '<div id="parallaxSettings' + numPanels + '" class="parallax-settings-wrap">' + settings + '</div></div>');
  $navList.append('<li draggable="true" onclick="hideMenu()"><a href="#mainparallax' + numPanels + '"><b id="name' + numPanels + '">' + c_name + '</b></a></li>');

  $('#mainparallax' + c_id ).css('background-image', 'url("' + c_img + '")' );

  //document.getElementById('categoryBackground' + numPanels).addEventListener('change', function(evt){ handleFileSelect(evt, numPanels) }, false);

  // addYoutubeList( youtubeList, numPanels );
  // addPinList( pinList, numPanels );
  // addRedditList( redditList, numPanels );
  // displaySubs( numPanels, youtube_subscriptions );

}

$(document).ready(function() {

    var $addButton = $('.addScreen');

    var numPanels = 1;
    
    $('.reddit-card').css('position', 'absolute');

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
        console.log("ADDSCREEN");
        createNewParallax(numPanels, "");

        jump( ("mainparallax" + numPanels), numPanels );

    });

});

function jump( h, id ){

    var loc = "#" + h;
    window.location.href = loc;
    $('.toggle-button').click();
    $("#settingsButton" + id).click();

}
