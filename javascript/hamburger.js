$(document).ready(function() {

    var $toggleButton = $('.toggle-button'),
        $navMenu = $('.nav-menu');
    
    $('a[href^="#"]').on('click',function (e) {
        
        window.scrollTo(0,0);
        
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});
    
    var index = -10000;

    // Hamburger button
    $toggleButton.on('click', function() {
        $(this).toggleClass('button-open');
        
        
        if( index > 0 ){
            
            index = -10000
            
            $navMenu.css('z-index',index);
            $navMenu.css('opacity', '0.0');
            $navMenu.css('background-color', 'rgba(0,0,0,0.0)');
            
        }else{
            
            index = 10000
            
            $navMenu.css('z-index',index);
            $navMenu.css('opacity', '1');
            $navMenu.css('background-color', 'rgba(0,0,0,0.7)');
            
        }
        
    });
    
});

function hideMenu() {
    
    $('.toggle-button').click();
    
}
