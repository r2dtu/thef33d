$(document).ready(function() {

    var $help = $('.HelpPage');
    
    $help.on( 'click', function(){
       
        $('.helpPageHidden').toggleClass('helpPageShow');
        $('.HelpPage').toggleClass('HelpPageShift');
        $('.FeedLogo').toggleClass('FeedLogoShift');
        $('.userInformation').toggleClass('userInformationShift');
        $('.addScreen').toggleClass('addScreenShift');
        
    });
    
});