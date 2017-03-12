var youtube_subscriptions = [
    
    'Science',
    'Engineering',
    'Dogs',
    'Clouds',
    'Orange Dragons'
    
];

function updateSettings( id ){
    
    if( name ){
        
        updateMenuName( id );
        name = false;
        
    }
    
    if( background ){
        
        updateBackground( id );
        background = false;
        
    }
    
    if( size ){
     
        adjustSize( 75 );
        size = false;
        
    }
    
    if( organized ){
        
        organized = false;
        
    }
    
    generic_settings( id );
    
}

function resetFlags(){
    
    name = false;
    background = false;
    size = false;
    organized = false;
    ob = null;
    
}

var name = false;
function nameFlag(){
    
    name = true;
    
}

var background = false;
var fileRef = null;
function backgroundFlag( ob ){
    
    background = true;
    fileRef = ob;
    
}

var size = false;
function sizeFlag(){
    
    size = true;
    
}

var organized = false;
function organizedFlag(){
    
    organized = true;
    
}

function updateMenuName( id ){

    name = document.getElementById("categoryName" + id).value;

    document.getElementById("name" + id).innerHTML = name;

}

function handleFileSelect(evt, id) {
    
    var files = evt.target.files; // FileList object
    
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
            
            $('#mainparallax' + id ).css('background-image', 'url("' + e.target.result + '")' );
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }

} document.getElementById('categoryBackground1').addEventListener('change', function(evt){ handleFileSelect(evt, 1) }, false);

function displaySubs( id, subList ){
    
    for( i = 0; i < youtube_subscriptions.length; i++ ){
        
        $('#subs'+id).find('form').append( '<input type="checkbox" name="subscription" value="'+ youtube_subscriptions[ i ] +'">' + youtube_subscriptions[ i ] + '<br>' );
        
    }
    
} displaySubs( 1, youtube_subscriptions );

function removeSubs( id ){
    
    $('#subs'+id).find('form').empty();
    
}

function updateSubs( id ){
    
    removeSubs( id );
    
    var e = document.getElementById("categoryAccounts" + id);
    var social = e.options[e.selectedIndex].value;
    
    if( social == 'YouTube' ){
        displaySubs( id, youtube_subscriptions );
    }else if( social == 'Pinterest' ){
        alert("Pinterest");
    }else{
        alert("Reddit");
    }

}

function generic_show(id){
    
    $("#mainparallax" + id).toggleClass('parallax_main_shrink');
    $("#showButton" + id).toggleClass('show-button-shink');
    $("#settingsButton" + id).toggleClass('settings-button-shrink');
    $("#parallaxSettings" + id).toggleClass('parallax-settings-hide');
    $("#embedded" + id).toggleClass('embedded-hide');
    
}

function generic_settings(id){
    
    $("#settingsButton" + id).toggleClass('settings-button-open');
    $("#parallaxSettings" +id).toggleClass('parallax-settings');
    resetFlags();
    
}

function deleteCategory( id ){
    
    var element = 1;
    
    $('.panels').find('#mainparallax' + id).remove();
    $('.nav-menu-list').find('li').each(function(){
        
        if( element == id ){
            $(this).remove();
        }
        element++;
    });
    
}