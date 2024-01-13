const express = require('express');
const router = express.Router();
const Authentication = require('../utilities/Authentication');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', async function(req, res, next) {
  try {
    //try to authenticate user via login in fucntion set in auth class and redirect to index
    await Authentication.login('test2@test.com', 'test123');
    res.redirect('/taskBoard');
  }catch(error) {
    //catch any errors an return to previous page
    console.log(error);
    res.redirect('/login');
  }
});
module.exports = router;
