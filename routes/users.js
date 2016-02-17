var express = require('express');
var router = express.Router();
var users = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', users.showLoginForm);
router.post('/login', users.login);
router.get('/logout', users.logout);

router.get('/register', users.showRegisterForm);

module.exports = router;
