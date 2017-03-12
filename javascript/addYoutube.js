youtubeList = [

    'https://www.youtube.com/embed/FhC9R9oCAVk',
    'https://www.youtube.com/embed/_Z-f3RSNUsQ',
    'https://www.youtube.com/embed/3rSer5Lqg5w',
    'https://www.youtube.com/embed/UXnJ95N0F8I',
    'https://www.youtube.com/embed/_Z-f3RSNUsQ',
    'https://www.youtube.com/embed/3rSer5Lqg5w',
    'https://www.youtube.com/embed/UXnJ95N0F8I'

];

pinList = [

    'https://www.pinterest.com/pin/99360735500167749/',
    'https://www.pinterest.com/pin/99360735500167749/',
    'https://www.pinterest.com/pin/99360735500167749/',
    'https://www.pinterest.com/pin/99360735500167749/',
    'https://www.pinterest.com/pin/99360735500167749/',
    'https://www.pinterest.com/pin/99360735500167749/',
    'https://www.pinterest.com/pin/99360735500167749/',
    'https://www.pinterest.com/pin/99360735500167749/'

];

redditList = [

    'https://www.reddit.com/hot/.embed?limit=5&t=all',
    'https://www.reddit.com/hot/.embed?limit=5&t=all',
    'https://www.reddit.com/hot/.embed?limit=5&t=all',
    'https://www.reddit.com/hot/.embed?limit=5&t=all',
    'https://www.reddit.com/hot/.embed?limit=5&t=all',
    'https://www.reddit.com/hot/.embed?limit=5&t=all',
    'https://www.reddit.com/hot/.embed?limit=5&t=all',
    'https://www.reddit.com/hot/.embed?limit=5&t=all'

];

var youtubeIndexStart = 0;
var youtubeIndexEnd = 3;
var pinIndexStart = 0;
var pinIndexEnd = 3;
var redditIndexStart = 0;
var redditIndexEnd = 3;

function addYoutubeList( list, numPanel ){

    var spot = 0;

    for( i = 0; i < youtubeList.length; i++ ){

        if( i >= youtubeIndexStart && i <= youtubeIndexEnd ){
            addYoutubeVideo( youtubeList[ i ], spot, numPanel );
            spot++;
        }

    }

} addYoutubeList( youtubeList, 1 );

function addPinList( list, numPanel ){

    var spot = 0;

    for( i = 0; i < pinList.length; i++ ){

        if( i >= pinIndexStart && i <= pinIndexEnd ){
            addPin( pinList[ i ], spot, numPanel );
            spot++;
        }

    }

} addPinList( pinList, 1 );

function addRedditList( list, numPanel ){

    var spot = 0;

    for( i = 0; i < redditList.length; i++ ){

        if( i >= redditIndexStart && i <= redditIndexEnd ){
            addReddit( redditList[ i ], spot, numPanel );
            spot++;
        }

    }

} addRedditList( redditList, 1 );

function removeChildren( social, numPanel ){

    $('#mainparallax' + numPanel + '-' + social ).empty();

}

function addYoutubeVideo( link, num, numPanel ){

    $('#mainparallax' + numPanel + '-youtube').append('<li class="youtubeVideo' + num + '"><iframe class="youtubeVideoFrame' + num + '" width="300" height="200" src="' + link + '" frameborder="0" allowfullscreen></iframe></li>');

    $('.youtubeVideo' + num).css( 'top', '4%' );
    $('.youtubeVideo' + num).css( 'left', ((num*20) + 10) + '%' );

}

function adjustSize( size ){

    $('.youtubeVideo' + num).css( 'left', ((num*20) + 11) + '%' );

}

function addPin( link, num, numPanel ){

    $('#mainparallax' + numPanel + '-pin').append('<li class="pin' + num + '"><a data-pin-do="embedPin" href="' + link + '"></a></li>');

    $('.pin' + num).css( 'top', '30%' );
    $('.pin' + num).css( 'left', ((num*20) + 12) + '%' );

}

function addReddit( link, num, numPanel ){

    $('#mainparallax' + numPanel + '-reddit').append('<li class="reddit' + num + '"><script src="' + link + '" type="text/javascript" async></script></li>');

    $('.reddit' + num).css( 'top', '50%' );
    $('.reddit' + num).css( 'left', ((num*20) + 11) + '%' );

}

function shiftLeft( social, numPanel ){

    if(social == 1 && youtubeIndexStart != 0){

        youtubeIndexStart -= 3;
        youtubeIndexEnd -= 3;
        removeChildren('youtube', numPanel);
        addYoutubeList( youtubeList, numPanel );

    }

    if(social == 2 && pinIndexStart != 0){

        pinIndexStart -= 3;
        pinIndexEnd -= 3;
        removeChildren('pin', numPanel);
        addPinList( pinList, numPanel );

    }

    if(social == 3 && redditIndexStart != 0){

        redditIndexStart -= 3;
        redditIndexEnd -= 3;
        removeChildren('reddit', numPanel);
        addRedditList( redditList, numPanel );

    }

}

function shiftRight( social, numPanel ){

    if( social == 1 && !(youtubeIndexEnd >= youtubeList.length) ){

        youtubeIndexStart += 3;
        youtubeIndexEnd += 3;
        removeChildren('youtube', numPanel);
        addYoutubeList( youtubeList, numPanel );

    }

    if( social == 2 && !(pinIndexEnd >= pinList.length) ){

        pinIndexStart += 3;
        pinIndexEnd += 3;
        removeChildren('pin', numPanel);
        addPinList( pinList, numPanel );

    }

    if( social == 3 && !(redditIndexEnd >= redditList.length) ){

        redditIndexStart += 3;
        redditIndexEnd += 3;
        removeChildren('reddit', numPanel);
        addRedditList( redditList, numPanel );

    }

}

function adjustSize( size ){

    for( i = 0; i < youtubeList.length; i++ ){

        //$('.youtubeVideoFrame' + num).css( 'width', ((size*2) + 200) +'px' );
        //$('.youtubeVideoFrame' + num).css( 'height', ((size*2) + 100) +'px' );

    }

}
