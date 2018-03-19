// loading dependencies
var Nightmare = require('nightmare'),
  nightmare = Nightmare();
var vo = require('vo');
var ads = require('./ads.js');
var post = require('./post.js');
var performLogin = require('./performLogin');
var loginCheck = require('./loginCheck.js');

var run = function * (totalAds) {
  var loggedIn = yield vo(loginCheck) ();
  if(loggedIn) {
    console.log('Login was successful');
    nightmare.end(); // added after code working
    vo(main) (totalAds);
  } else {
    console.log('Login failed, trying to login')
    loggedIn = yield vo(performLogin) ();
    nightmare.end(); // added after code working
    loggedIn ? vo(main) (totalAds) : console.log('Unable to login. Please verify credentials in source code');

  }
};

var main = function * (totalAds) {
  var post = require('./post.js');
  var ads = require('./ads.js');

  for(var i = 0; i < totalAds; i++) {
    console.log('Attempting to post ad', i);
    yield vo(post)(ads[i], i);
    nightmare.end();
  }

  process.exit();
};

vo(run) (ads.length);
