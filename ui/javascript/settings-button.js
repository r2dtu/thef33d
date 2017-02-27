function generic_show(id){
    
    $("#mainparallax" + id).toggleClass('parallax_main_shrink');
    $("#showButton" + id).toggleClass('show-button-shink');
    $("#settingsButton" + id).toggleClass('settings-button-shrink');
    $("#parallaxSettings" + id).toggleClass('parallax-settings-hide');
    
}

function generic_settings(id){
    
    $("#settingsButton" + id).toggleClass('settings-button-open');
    $("#parallaxSettings" +id).toggleClass('parallax-settings');
    
}