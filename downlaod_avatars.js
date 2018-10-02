var request = require('request');
var secret = require('./secrets.js');

console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, handleAvatarURL){
    var options = {
        url:  "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
        'User-Agent':'request',
        'Authorization': 'token ' + secret.GITHUB_TOKEN
       }
    };

    request(options, function(err, res, body) {
    // handleAvatarURL(err, body);
    var parsedData = JSON.parse(body)
    for (var i = 0; i< parsedData.length ; i++){
        var contributor = parsedData[i];
        handleAvatarURL(contributor.avatar_url);
    }
  });
}

var fetchAvatarURL = function(aURL){
    console.log(aURL);
}




getRepoContributors("jquery", "jquery", fetchAvatarURL);
