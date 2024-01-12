var express = require('express');
var router = express.Router();
const Authentication = require('../utilities/Authentication');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', async function(req, res, next) {
  try {
    await Authentication.login('admin@test.com', 'test123');
    res.redirect('/register');
  }catch(error) {
    console.log(error);
    res.redirect('/login');
  }
});
module.exports = router;
