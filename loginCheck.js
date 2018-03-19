var Nightmare = require('nightmare'),
  nightmare = Nightmare({show:true});

  module.exports = function * () {
    yield nightmare.goto('https://accounts.craigslist.org/login/home')
    .wait(2000)
    // check if title is equal to 'craigslist account--->this means user is logged in'
    .title()
    .end()
    .then(function(result) {
      loggedIn = (result === 'craigslist account'); 
    })
    return loggedIn
  }
