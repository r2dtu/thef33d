var PIN_APP = '4884930397969852994'
PDK.init({appId: PIN_APP, cookies: true});


var pinterest = {
/** To login and authenticate Pinterest */
    login: function() {
            if(!!PDK.getSession()) { //no cookie with access token
                PDK.login({scope: "read_public, read_relationships" },  function() {
                    alert("Login Successful!");
                    //add whatever callback function here
                }); //login
            }
            else {
                PDK.setSession(PDK.getSession); //get the cookies and set session to it
            }

    },

/** gets boards the user follows
    returns an array of board names
*/
    getboardNames: function() {
        var params = {
            fields: 'name'
        }
        var data = [];
        var names = [];
        PDK.request('/me/following/boards/', 'GET', params, function(response) {
            if(!response | response.error) { //error
                alert('Error');
            }
            else {
                data = data.concat(response.data);
                if(response.hasNext) {
                    response.next();
                } //returns boards
                console.log(JSON.stringify(data));

                for(var key in data) {
                    //key.name for the name field
                    /*add here whatever needs to be done to communicate with database*/
                    names.push(key.name);
                }

                return names;
            }
        });
    },
    /** Gets the urls of the boards the user follows
      *
      * returns an array of urls
      */
    getBoardURLs: function() {
        var params = {
            fields: 'url'
        }
        var data = [];
        var urls = [];
        PDK.request('/me/following/boards/', 'GET', params, function(response) {
            if(!response | response.error) { //error
                alert('Error');
            }
            else {
                data = data.concat(response.data);
                if(response.hasNext) {
                    response.next();
                } //returns boards

                for(var key in data) {
                    //key.name for the name field
                    /*add here whatever needs to be done to communicate with database*/
                    urls.push(key.url);
                }

                return urls;
            }
        });
    },
    /** Checks if the user is logged in already */
    isLoggedin: function() {
        return !!PDK.getSession();
    },

    /** Logs the user out */
    logout: function() {
        PDK.logout();
    }
};
