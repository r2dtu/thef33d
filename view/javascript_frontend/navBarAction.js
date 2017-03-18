$(function() {
    var mouseY = 0;

    document.addEventListener('mousemove', function(e) {
      mouseY = e.clientY || e.pageY;
      if(mouseY < 70) {
         $('nav').toggleClass('hideNav');//css({ border-bottom-width: 10px; });
      }
    }, false);

});
