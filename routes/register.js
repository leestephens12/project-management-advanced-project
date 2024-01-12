var express = require('express');
var router = express.Router();
const Authentication = require('../utilities/Authentication');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/', async function(req, res, next) {
  try {
    await Authentication.register('test@test.com', 'test123');
    res.redirect('login');
  }catch(error) {
    res.redirect('/register');
  }
});
module.exports = router;