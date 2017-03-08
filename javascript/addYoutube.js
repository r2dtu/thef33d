youtubeList = [
  
    'https://www.youtube.com/embed/FhC9R9oCAVk',
    'https://www.youtube.com/embed/_Z-f3RSNUsQ',
    'https://www.youtube.com/embed/3rSer5Lqg5w',
    'https://www.youtube.com/embed/UXnJ95N0F8I',
    'https://www.youtube.com/embed/_Z-f3RSNUsQ',
    'https://www.youtube.com/embed/3rSer5Lqg5w',
    'https://www.youtube.com/embed/UXnJ95N0F8I'
    
];

function addList( list ){
    
    for( i = 0; i < youtubeList.length; i++ ){
        
        addYoutubeVideo( youtubeList[ i ], i );
        
    }
    
} addList( youtubeList );

function addYoutubeVideo( link, num ){
    
    $('#mainparallax1-youtube').append('<li class="youtubeVideo' + num + '"><iframe class="youtubeVideoFrame' + num + '" width="300" height="200" src="' + link + '" frameborder="0" allowfullscreen></iframe></li>');
    
    $('.youtubeVideo' + num).css( 'top', '10%' );
    $('.youtubeVideo' + num).css( 'left', ((num*20) + 10) + '%' );
    
}

function adjustSize( size ){
    
    alert( "yeah" );
    
    for( i = 0; i < youtubeList.length; i++ ){
        
        //$('.youtubeVideoFrame' + num).css( 'width', ((size*2) + 200) +'px' );
        //$('.youtubeVideoFrame' + num).css( 'height', ((size*2) + 100) +'px' );
        
    }
    
}