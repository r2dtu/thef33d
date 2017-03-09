youtubeList = [
  
    'https://www.youtube.com/embed/FhC9R9oCAVk',
    'https://www.youtube.com/embed/_Z-f3RSNUsQ',
    'https://www.youtube.com/embed/3rSer5Lqg5w',
    'https://www.youtube.com/embed/UXnJ95N0F8I',
    'https://www.youtube.com/embed/0pdCW9-eiVU',
    'https://www.youtube.com/embed/U5uRtxTax7w',
    'https://www.youtube.com/embed/c5CSm8RjPJY'
    
];

pinList = [
    
    'http://pin.it/A7zKBWU',
    'http://pin.it/gf5mMMp',
    'http://pin.it/xc9cZ8N',
    'http://pin.it/xJu_gVe'
    
];

redditList = [
    
    
];

var youtubeIndexStart = 0;
var youtubeIndexEnd = 3;
var pinIndexStart = 0;
var pinIndexEnd = 3;
var redditIndexStart = 0;
var redditIndexEnd = 3;

function addYoutubeList( list ){
    
    var spot = 0;
    
    for( i = 0; i < youtubeList.length; i++ ){
        
        if( i >= youtubeIndexStart && i <= youtubeIndexEnd ){
            addYoutubeVideo( youtubeList[ i ], spot );
            spot++;
        }
        
    }
    
} addYoutubeList( youtubeList );

function addPinList( list ){
    
    var spot = 0;
    
    for( i = 0; i < pinList.length; i++ ){
        
        if( i >= pinIndexStart && i <= pinIndexEnd ){
            addPin( pinList[ i ], spot );
            spot++;
        }
        
    }
    
} addPinList( pinList );

function addRedditList( list ){
    
    var spot = 0;
    
    for( i = 0; i < redditList.length; i++ ){
        
        if( i >= redditIndexStart && i <= redditIndexEnd ){
            addReddit( redditList[ i ], spot );
            spot++;
        }
        
    }
    
} addRedditList( redditList );

function removeChildren(){
    
    $('#mainparallax1-youtube').find('li').each(function(){
        $(this).remove();
    });
    
    //$('#mainparallax1-youtube').remove("li");
    
}

function addYoutubeVideo( link, num ){
    
    $('#mainparallax1-youtube').append('<li class="youtubeVideo' + num + '"><iframe class="youtubeVideoFrame' + num + '" width="300" height="200" src="' + link + '" frameborder="0" allowfullscreen></iframe></li>');
    
    $('.youtubeVideo' + num).css( 'top', '10%' );
    $('.youtubeVideo' + num).css( 'left', ((num*20) + 11) + '%' );
    
}

function addPin( link, num ){
    
    $('#mainparallax1-pin').append('<li class="pin' + num + '"><a data-pin-do="embedPin" href="https://www.pinterest.com/pin/99360735500167749/"></a></li>');
    
    $('.pin' + num).css( 'top', '10%' );
    $('.pin' + num).css( 'left', ((num*20) + 11) + '%' );
    
}

function addReddit( link, num ){
    
    $('#mainparallax1-reddit').append('<li class="reddit' + num + '"></li>');
    
    $('.reddit' + num).css( 'top', '10%' );
    $('.reddit' + num).css( 'left', ((num*20) + 11) + '%' );
    
}

function shiftLeft( social ){
    
    if(social == "youtube" && youtubeIndexStart != 0){
        
        youtubeIndexStart -= 3;
        youtubeIndexEnd -= 3;
        removeChildren();
        addYoutubeList( youtubeList );
        
    }
    
    if(social == "pin" && pinIndexStart != 0){
        
        pinIndexStart -= 3;
        pinIndexEnd -= 3;
        removeChildren();
        addPinList( pinList );
        
    }
    
    if(social == "reddit" && redditIndexStart != 0){
        
        redditIndexStart -= 3;
        redditIndexEnd -= 3;
        removeChildren();
        addRedditList( redditList );
        
    }
    
}

function shiftRight( social ){
    
    if( social == "youtube" && !(youtubeIndexEnd >= youtubeList.length) ){
        
        youtubeIndexStart += 3;
        youtubeIndexEnd += 3;
        removeChildren();
        addYoutubeList( youtubeList );
        
    }
    
    if( social == "pin" && !(pinIndexEnd >= pinList.length) ){
        
        pinIndexStart += 3;
        pinIndexEnd += 3;
        removeChildren();
        addPinList( pinList );
        
    }
    
    if( social == "reddit" && !(redditIndexEnd >= redditList.length) ){
        
        redditIndexStart += 3;
        redditIndexEnd += 3;
        removeChildren();
        addRedditList( redditList );
        
    }
    
}

function adjustSize( size ){
    
    for( i = 0; i < youtubeList.length; i++ ){
        
        //$('.youtubeVideoFrame' + num).css( 'width', ((size*2) + 200) +'px' );
        //$('.youtubeVideoFrame' + num).css( 'height', ((size*2) + 100) +'px' );
        
    }
    
}