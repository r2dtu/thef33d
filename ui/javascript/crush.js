$(document).ready(function() {

    var $toggleButton = $('.toggle-button'),
        $parallax1 = $('.parallax_main_1'),
        $parallax2 = $('.parallax_main_2'),
        $parallax3 = $('.parallax_main_3');

    var height = 0;

    // Hamburger button
    $(document).scroll(function() {
        //alert($(document).scrollTop() + " px");

        height = $(document).scrollTop();

        if( height > 70 && height < 436 ){

            $parallax2.css('transform', 'translateY(' + -height + 'px)');

        }else if( height > 436 ){

            var set = height;
            $parallax3.css('transform', 'translateY(' + -set + 'px)');

        }

    });
});
