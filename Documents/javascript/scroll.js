function growLeft( social_media, id ){
    
    if( social_media == 1 ){
        
        $("#leftScrollYoutube" + id ).css('transition', '0.55s');
        $("#leftScrollYoutube" + id ).css('opacity', '1.0');
        $("#leftScrollYoutube" + id ).css('font-size', '3.5em');
        
    }else if( social_media == 2 ){
        
        $("#leftScrollPin" + id ).css('transition', '0.55s');
        $("#leftScrollPin" + id ).css('opacity', '1.0');
        $("#leftScrollPin" + id ).css('font-size', '3.5em');
        
    }else{
        
        $("#leftScrollReddit" + id ).css('transition', '0.55s');
        $("#leftScrollReddit" + id ).css('opacity', '1.0');
        $("#leftScrollReddit" + id ).css('font-size', '3.5em');
        
    }
    
    //$('.' + ref ).toggleClass('hovered');
    
}

function growRight( social_media, id ){
    
    if( social_media == 1 ){
        
        $("#rightScrollYoutube" + id ).css('transition', '0.55s');
        $("#rightScrollYoutube" + id ).css('opacity', '1.0');
        $("#rightScrollYoutube" + id ).css('font-size', '3.5em');
        
    }else if( social_media == 2 ){
        
        $("#rightScrollPin" + id ).css('transition', '0.55s');
        $("#rightScrollPin" + id ).css('opacity', '1.0');
        $("#rightScrollPin" + id ).css('font-size', '3.5em');
        
    }else{
        
        $("#rightScrollReddit" + id ).css('transition', '0.55s');
        $("#rightScrollReddit" + id ).css('opacity', '1.0');
        $("#rightScrollReddit" + id ).css('font-size', '3.5em');
        
    }
    
    //$('.' + ref ).toggleClass('hovered');
    
}

function shrinkLeft( social_media, id ){
    
    if( social_media == 1 ){
        
        $("#leftScrollYoutube" + id ).css('transition', '0.55s');
        $("#leftScrollYoutube" + id ).css('opacity', '0.5');
        $("#leftScrollYoutube" + id ).css('font-size', '3.0em');
        
    }else if( social_media == 2 ){
        
        $("#leftScrollPin" + id ).css('transition', '0.55s');
        $("#leftScrollPin" + id ).css('opacity', '0.5');
        $("#leftScrollPin" + id ).css('font-size', '3.0em');
        
    }else{
        
        $("#leftScrollReddit" + id ).css('transition', '0.55s');
        $("#leftScrollReddit" + id ).css('opacity', '0.5');
        $("#leftScrollReddit" + id ).css('font-size', '3.0em');
        
    }
    
    //$('.' + ref ).toggleClass('hovered');
    
}

function shrinkRight( social_media, id ){
    
    if( social_media == 1 ){
        
        $("#rightScrollYoutube" + id ).css('transition', '0.55s');
        $("#rightScrollYoutube" + id ).css('opacity', '0.5');
        $("#rightScrollYoutube" + id ).css('font-size', '3.0em');
        
    }else if( social_media == 2 ){
        
        $("#rightScrollPin" + id ).css('transition', '0.55s');
        $("#rightScrollPin" + id ).css('opacity', '0.5');
        $("#rightScrollPin" + id ).css('font-size', '3.0em');
        
    }else{
        
        $("#rightScrollReddit" + id ).css('transition', '0.55s');
        $("#rightScrollReddit" + id ).css('opacity', '0.5');
        $("#rightScrollReddit" + id ).css('font-size', '3.0em');
        
    }
    
    //$('.' + ref ).toggleClass('hovered');
    
}
