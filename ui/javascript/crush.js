$(document).ready( function() {

    var $toggleButton = $('.toggle-button'),
        $parallax1 = $('.parallax_main_1'),
        $parallax2 = $('.parallax_main_2'),
        $parallax3 = $('.parallax_main_3');

    var height = 0;
    var seethru = 0;

    // Hamburger button
    $(document).scroll(function() {
        //alert($(document).scrollTop() + " px");

        height = $(document).scrollTop();
        
        if( height < 60 ){
            
            $parallax1.css('opacity', '1.0');
            
        }

        if( height > 200 && height < 600 ){
            
            seethru = 1 - ((height-200)/600);
            $parallax1.css('opacity', seethru);
            $parallax2.css('transform', 'translateY(' + -height + 'px)');
            $parallax3.css('transform', 'translateY(' + -height + 'px)');

        }else if( height > 600 ){

            seethru = 1 - ( (height - 600) / 500);
            $parallax2.css('opacity', seethru);
            $parallax3.css('transform', 'translateY(' + -height + 'px)');

        }

    });
});
