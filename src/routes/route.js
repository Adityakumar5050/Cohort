const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();
const first = require('../introduction/logger/logger')
const secound = require('../util/helper')



router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    first.welcome()   // welcome function ko call ker raha hu
    secound.printDate() 
    res.send('My second ever api!')
});




router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reasoni