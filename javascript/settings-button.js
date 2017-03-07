function generic_show(id){
    
    $("#mainparallax" + id).toggleClass('parallax_main_shrink');
    $("#showButton" + id).toggleClass('show-button-shink');
    $("#settingsButton" + id).toggleClass('settings-button-shrink');
    $("#parallaxSettings" + id).toggleClass('parallax-settings-hide');
    
}

function generic_settings(id){
    
    $("#settingsButton" + id).toggleClass('settings-button-open');
    $("#parallaxSettings" +id).toggleClass('parallax-settings');
    
    // Get the subscriptions
    
}

function fetchMedia(name, id) {
    var subs = $("#subs1");
    subs.empty();
    subs.append('<br>Subscriptions to Include: <br>');
    
    switch (name) {
        case "YouTube":
            alert("Getting YouTube subscriptions");

            
            subs.append(
            '<form class="categorySubscriptions">' +
            '<input type="checkbox" name="subscription" value="Science"> Science <br>' +
            '<input type="checkbox" name="subscription" value="League of Legends"> League of Legends <br>' +
            '<input type="checkbox" name="subscription" value="Art History"> Art History <br>' +
            '<input type="checkbox" name="subscription" value="Wild Turtle Footage"> Wild Turtle Footage <br>' +
            '<input type="submit">' +
            '</form>');
            
            getYouTubeSubscriptions(subs);
            
            
            
            break;
        case "Reddit":
            alert("Getting Reddit subreddits");
            break;
        case "Pinterest":
            alert("Getting Pinterest boards");
            break;
        default:
            break;
    }
}

function getYouTubeSubscriptions(subs) {
    var createData = {"action": "getSubs"};

    var request = $.ajax({
      url: "youtube_api/YouTube_API.php",
      type: "POST",
      data: createData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        var response = JSON.parse(response);
        alert("Finished authorizing YouTube account and updating user Subscriptions.");
        
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        alert("HTTPRequest: " + textStatus + " " + errorThrown);
    });    
}
