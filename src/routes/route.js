const express = require('express');
const abc = require('../introduction/intro')
const welcome =require('../logger/logger.js')
const dateMon =require('..util/helper')
const stringEdit =require('../validator/formatter')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    res.send('My second ever api!')
    welcome.funWelcome()
    dateMon.funDateMonth()
    dateMon.funBatchinfo()
    stringEdit.trim()
    stringEdit.changetoLowerCase()
    stringEdit.changetoUpperCase()
});


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason