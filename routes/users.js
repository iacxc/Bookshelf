var express = require('express');
var router = express.Router();
var users = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', function(req, res, next) {
    users.getAll(function(users) {
        res.send(users);
    });
});

router.get('/:uid', function(req, res, next) {
    users.find(req.params.uid, function(user) {
        res.send(user);
    });
});
module.exports = router;
