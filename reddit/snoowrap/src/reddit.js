$(document).ready(function(){
    alert(refresh);
    const reddit = new window.snoowrap({
        userAgent: 'Testing accessing and sorting subscribed subreddits in javascript. By /u/teamfeed',
        //clientId: 'iP9RONfYAGMBuQ',
        clientId: 'IXBFNdCtseybUQ',
        //clientSecret: 'y50exuyycn8UJVp2YcRKADR3RqE',
        clientSecret: 'uT40Xr_nNlo-Yc03JYrE6CPDzTU',
        username: 'zhrong0725',
        password: 'echooffice0725',
        refresh_token: refresh
    });
        
    var subredditName = prompt("Please enter a subreddit", "corgi");

    reddit.getHot(subredditName).then(console.log);
       
    });