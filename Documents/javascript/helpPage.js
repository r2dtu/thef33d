$(document).ready(function() {
    
    var user_shifted = false;
    var help_shifted = false;

    var $help = $('.HelpPage');
    
    $help.on( 'click', function(){
       
        $('.helpPageHidden').toggleClass('helpPageShow');
        
        if( !user_shifted ){
            
            $('.HelpPage').toggleClass('HelpPageShift');
            $('.FeedLogo').toggleClass('FeedLogoShift');
            $('.userInformation').toggleClass('userInformationShift');
            $('.addScreen').toggleClass('addScreenShift');
            
            help_shifted = !help_shifted;
            
        }else{
            
            $('.userPageHidden').toggleClass('userPageShow');
            
            user_shifted = false;
            
        }
        
    });
    
    var $user = $('.userInformation');
    
    $user.on( 'click', function(){
        
        $('.userPageHidden').toggleClass('userPageShow');
       
        if( !help_shifted ){
        
            $('.HelpPage').toggleClass('HelpPageShift');
            $('.FeedLogo').toggleClass('FeedLogoShift');
            $('.userInformation').toggleClass('userInformationShift');
            $('.addScreen').toggleClass('addScreenShift');
            
            user_shifted = !user_shifted;
            
        }else{
            
            $('.helpPageHidden').toggleClass('helpPageShow');
            
            help_shifted = false;
            
        }
        
    });
    
});