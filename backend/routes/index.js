var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/login', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('pages/login', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('pages/signup', { title: 'Express' });
});

module.exports = router;
