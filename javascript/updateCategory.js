function updateSettings( id ) {

    if ( name ) {
        updateMenuName( id );
        name = false;
    }

    if ( background ) {
        updateBackground( id );
        background = false;
    }

    if ( size ) {
        adjustSize( 75 );
        size = false;
    }

    if ( organized ) {
        organized = false;
    }

    generic_settings( id );
}

function resetFlags() {

    name = false;
    background = false;
    size = false;
    organized = false;
    ob = null;
}

var name = false;
function nameFlag() {
    name = true;
}

var background = false;
var fileRef = null;
function backgroundFlag( ob ) {

    if (ob[0].type.match('image.*')) {
      fileRef = ob;
      background = true;
    }
    else {
      alert("The file you have chosen is not an image file. Please try again.");
      background = false;
    }
}

var size = false;
function sizeFlag() {

    size = true;
}

var organized = false;
function organizedFlag() {

    organized = true;
}

function updateMenuName( id ) {

    name = document.getElementById("categoryName" + id).value;
    document.getElementById("name" + id).innerHTML = name;
}

function updateBackground( id ) {
  var reader = new FileReader();

  // Closure to capture the file information.
  reader.onload = (function (theFile) {
    return function(e) {
        $('#mainparallax' + id ).css('background-image', 'url("' + e.target.result + '")' );
    };
  })(fileRef[0]);

  // Read in the image file as a data URL.
  reader.readAsDataURL(fileRef[0]);
}

function adjustSize( id, size ) {

}

function displayYouTubeSubs( id, c_id ) {

    var subs = $('#subs' + id);

    var createData = {"action": "getSubs"};
    var request = $.ajax({
      url: "youtube_api/YouTube_API.php",
      type: "POST",
      data: createData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR) {
        var sub_data = JSON.parse(response);
        for (var sub_name in sub_data) {
            subs.append(
                '<input type="checkbox" name="' + sub_name + '" value="' + sub_data[sub_name] + '"> ' + sub_name + ' <br>');
        }
        displayCheckMarks(id, c_id, "y_subs");
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown) {
        alert("You need to reauthorize your YouTube access. Please quit Chrome and retry again.");
    });
}


function removeSubs( id ) {

    $('#subs' + id).empty();

}

function updateSubs( id ) {

    var c_id = $("#mainparallax" + id).attr("c_id");

    removeSubs( id );

    var e = document.getElementById("categoryAccounts" + id);
    var social = e.options[e.selectedIndex].value;

    if ( social == 'YouTube' ) {
      displayYouTubeSubs( id, c_id );
    } else if ( social == 'Pinterest' ) {
      alert("Pinterest");
      displayCheckMarks(id, c_id, "p_subs");
    } else if ( social == 'Reddit') {
      displayRedditSubs( id );
      displayCheckMarks(id, c_id, "r_subs");
    }
}

function generic_show(id) {

    $("#mainparallax" + id).toggleClass('parallax_main_shrink');
    $("#showButton" + id).toggleClass('show-button-shink');
    $("#settingsButton" + id).toggleClass('settings-button-shrink');
    $("#parallaxSettings" + id).toggleClass('parallax-settings-hide');
    $("#embedded" + id).toggleClass('embedded-hide');

}

function generic_settings(id) {

    $("#settingsButton" + id).toggleClass('settings-button-open');
    $("#parallaxSettings" +id).toggleClass('parallax-settings');
    var c_name = $("#mainparallax" + id).attr("c_name");
    $("#categoryName" + id).val(c_name);
    id_stuff = id;
    resetFlags();

}

function deleteCategory( id ) {
    var element = 1;

    $('.panels').find('#mainparallax' + id).remove();
    $('.nav-menu-list').find('li').each(function() {

        if ( element == id ) {
            $(this).remove();
        }
        element++;
    });
}
