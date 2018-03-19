// loading dependencies
var Nightmare = require('nightmare'),
  nightmare = Nightmare();

// loading json
var ads = require('./ads.js')

// go to craigslist url
var url = 'http://' + process.argv[2] + '.craigslist.org'

// go to craigslist url (give program the city as an argument)
// ad will be in json
var postAd = function(ad) {
  nightmare.goto(url)
    .wait(2000)
    // navigate to form and click post classifieds link (#postlks #post)
    .click('#postlks #post') // # is id
    // click "for sale by owner" radio button (input[value=fso])
    .click('input[value=fso]')
    // click continue
    .click('.pickbutton') // . is class
    .wait(1000)
    // click computer services (input: nth-child(3)) !!! 42 for videogames
    .click('label:nth-child(3) input')
    .wait(1000)
    .click('label:nth-child(0) input') // selecting vancouver!!!
    .wait(1000)
    // Fill form
    // click on ok to contact phone (#contact_phone_ok)
    .click('#contact_phone_ok')
    // click on ok to contact text (#contact_text_ok)
    .click('#contact_text_ok')
    // enter contact name (#contact_name)
    .insert('#contact_name', ad.name) // can use type instead to make it seem human (insert is faster)
    // enter contact phone (#contact_phone)
    .insert('#contact_phone', ad.phone)
    // enter title (#PostingTitle)
    .insert('#PostingTitle', ad.title)
    // enter city (#GeographicArea)
    .insert('#GeographicArea', ad.city)
    // enter postal code (#postal_code)
    .insert('#postal_code', ad.zip)
    // enter body (#PostingBody)
    .insert('#PostingBody', ad.body)
    // don't show map, so click on it to uncheck it
    .click('#wantamap')
    // continue (next page is for uploading images)
    .click('.bigbutton')
    .wait(1000) // !!! add uploading image functionality later
    .click('done bigbutton')
    .wait(1000)
    // click publish button
    .click('.bigbutton')
    .wait(1000)
    // confirm posting with screenshot
    .screenshot('posting.png')
    .end()
};
