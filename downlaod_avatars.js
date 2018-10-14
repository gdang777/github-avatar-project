var request = require('request');
var secret = require('./secrets.js');
var fs = require('fs');
var owner = process.argv[2];
var name = process.argv[3];


console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, handleAvatarURL) {
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
            handleAvatarURL(contributor.avatar_url, contributor.login);
        }
    });
}

var fetchAvatarURL = function(avatar_url, filepath){

 request.get(avatar_url)
        .pipe(fs.createWriteStream(filepath));

}

function downloadImageByURL(avatarURL, userName) {

   request(avatarURL).pipe(fs.createWriteStream('./avatars/' + userName +'.jpg'));         // Note 1

}

// fetchAvatarURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")


getRepoContributors(owner, repo, downloadImageByURL);
