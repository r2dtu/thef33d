function authorizeYouTube() {
  location.href = "./youtube_api/authenticate.php";
}

var youtubeIndexStart = 0;
var youtubeIndexEnd = 3;
var pinIndexStart = 0;
var pinIndexEnd = 3;
var redditIndexStart = 0;
var redditIndexEnd = 3;

var yListRef = [[]];
var pListRef = [[]];
var rListRef = [[]];

function addYListFirst( list, numPanel ) {
  yListRef[numPanel - 1] = list;
  addYoutubeList( yListRef[numPanel - 1], numPanel)
}

function addYoutubeList( list, numPanel ) {
    var spot = 0;
    for( i = 0; i < list.length; i++ ) {
        if( i >= youtubeIndexStart && i <= youtubeIndexEnd ) {
            addYoutubeVideo( list[ i ], spot, numPanel );
            spot++;
        }
    }
}

function addPListFirst( list, numPanel ) {
  pListRef[numPanel - 1] = list;
  addPinList( pListRef[numPanel - 1], numPanel)
}

function addPinList( list, numPanel ) {
    var spot = 0;
    for( i = 0; i < list.length; i++ ) {
        if( i >= pinIndexStart && i <= pinIndexEnd ) {
            addPin( list[ i ], spot, numPanel );
            spot++;
        }
    }
    window.build();
}

function addRListFirst( list, numPanel ) {
  rListRef[numPanel - 1] = list;
  addRedditList( rListRef[numPanel - 1], numPanel)
}

function addRedditList( list, numPanel ) {
    var spot = 0;
    for( i = 0; i < list.length; i++ ) {
        if( i >= redditIndexStart && i <= redditIndexEnd ) {
            addReddit( list[ i ], spot, numPanel );
            spot++;
        }
    }
}

function removeChildren( social, numPanel ) {
    $('#mainparallax' + numPanel + '-' + social ).empty();
}

function addYoutubeVideo( link, num, numPanel ) {

    $('#mainparallax' + numPanel + '-youtube').append('<li class="youtubeVideo' + num + '"><iframe class="youtubeVideoFrame' + num + '" width="300" height="200" src="' + link + '" frameborder="0" allowfullscreen></iframe></li>');

    $('.youtubeVideo' + num).css( 'top', '4%' );
    $('.youtubeVideo' + num).css( 'left', ((num*20) + 10) + '%' );
}

function adjustSize( size ) {

    $('.youtubeVideo' + num).css( 'left', ((num*20) + 11) + '%' );
}

function addPin( link, num, numPanel ) {

    $('#mainparallax' + numPanel + '-pin').append('<li class="pin'+num+'"><a data-pin-do="embedBoard" data-pin-board-width="250" data-pin-scale-height="200" data-pin-scale-width="80" href="'+link+'"></a></li>');

    //$('.pin' + num).css( 'position', 'absolute');
    $('.pin' + num).css( 'top', '33%' );
    $('.pin' + num).css( 'left', ((num*20) + 12) + '%' );
}

function addReddit( link, num, numPanel ) {
    //var myList = document.createElement('li');
    //var myAwesomeScript = document.createElement('script');
    //var theSrc = "https://www.reddit.com/r/'+link+'.embed?limit=2&sort=new";
    //myAwesomeScript.setAttribute('src', theSrc);
    //myAwesomeScript.setAttribute('type', 'text/javascript');
    //myList.setAttribute('class', 'reddit-card');
    //myList.appendChild(myAwesomeScript);
    //document.getElementById("mainparallax"+numPanel+"-reddit").appendChild(myList);

    //document.write( '<li class="reddit-card"><script src="https://www.reddit.com/r/'+link+'.embed?limit=2&sort=new" type="text/javascript"></script></li>' );

    $('#mainparallax' + numPanel + '-reddit').append('<li class="reddit'+num+'"><div class="reddit-frame"><h1 class="sub-reddit"><a href="https://www.reddit.com/r/'+link+'/">'+link+'</a></h1><img class="reddit-alien" src="/CSS/img/reddit-alien.jpg"/></div></li>');

    $('.reddit'+num).css( 'top', '78%' );
    $('.reddit'+num).css( 'left', ((num*20) + 12.5) + '%' );
}

function shiftLeft( social, numPanel ) {

    var $parallax = $(".mainparallax" + numPanel);
    var c_id = $parallax.attr("c_id");

    if(social == 1 && youtubeIndexStart != 0) {
        youtubeIndexStart -= 4;
        youtubeIndexEnd -= 4;
        removeChildren('youtube', numPanel);
        addYoutubeList( yListRef[numPanel - 1], numPanel );
    }

    if(social == 2 && pinIndexStart != 0) {
        pinIndexStart -= 4;
        pinIndexEnd -= 4;
        removeChildren('pin', numPanel);
        addPinList( pListRef[numPanel - 1], numPanel );
    }

    if(social == 3 && redditIndexStart != 0) {
        redditIndexStart -= 4;
        redditIndexEnd -= 4;
        removeChildren('reddit', numPanel);
        addRedditList( rListRef[numPanel - 1], numPanel );
    }
}

function shiftRight( social, numPanel ) {

    var $parallax = $(".mainparallax" + numPanel);
    var c_id = $parallax.attr("c_id");

    if( social == 1 && !(youtubeIndexEnd >= yListRef[numPanel - 1].length) ){
        youtubeIndexStart += 4;
        youtubeIndexEnd += 4;
        removeChildren('youtube', numPanel);
        addYoutubeList( yListRef[numPanel - 1], numPanel );
    }

    if( social == 2 && !(pinIndexEnd >= pListRef[numPanel - 1].length) ){
        pinIndexStart += 4;
        pinIndexEnd += 4;
        removeChildren('pin', numPanel);
        addPinList( pListRef[numPanel - 1], numPanel );
    }

    if( social == 3 && !(redditIndexEnd >= rListRef[numPanel - 1].length) ){
        redditIndexStart += 4;
        redditIndexEnd += 4;
        removeChildren('reddit', numPanel);
        addRedditList( rListRef[numPanel - 1], numPanel );
    }
}

function adjustSize( size ) {
    for( i = 0; i < youtubeList.length; i++ ) {
        //$('.youtubeVideoFrame' + num).css( 'width', ((size*2) + 200) +'px' );
        //$('.youtubeVideoFrame' + num).css( 'height', ((size*2) + 100) +'px' );
    }
}
