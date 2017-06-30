$(function(){
    $('#ghsubmitbtn').on('click', function(e){
        e.preventDefault();
        $('#ghapidata').html('<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');

        var username = $('#ghusername').val();
        var requri   = 'https://api.github.com/users/'+username;
        var repouri  = 'https://api.github.com/users/'+username+'/repos';

        // Display message when the account doesn't exist
        requestJSON(requri, function(json) {
            if(json.message == "Not Found" || username == '') {
                $('#ghapidata').html("<h2>No User Info Found</h2>");
            }

            else {
                // Display the github information
                var fullname   = json.name;
                var username   = json.login;
                var aviurl     = json.avatar_url;
                var profileurl = json.html_url;
                var location   = json.location;
                var followersnum = json.followers;
                var followingnum = json.following;
                var reposnum     = json.public_repos;

                if(fullname == undefined) { fullname = username; }
                // Output the searched results
                var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
                outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username+'"></a></div>';
                outhtml = outhtml + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p></div>';
                outhtml = outhtml + '<div class="repolist clearfix">';

                // Get various repositories
                var repositories;
                $.getJSON(repouri, function(json){
                    repositories = json;
                    outputPageContent();
                });

                // Output all the repos
                function outputPageContent() {
                    if(repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
                    else {
                        outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
                        $.each(repositories, function(index) {
                            outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
                        });
                        outhtml = outhtml + '</ul></div>';
                    }
                    $('#ghapidata').html(outhtml);
                }
            }
        });
    });

    function requestJSON(url, callback) {
        $.ajax({
            url: url,
            complete: function(xhr) {
                callback.call(null, xhr.responseJSON);
            }
        });
    }
});
