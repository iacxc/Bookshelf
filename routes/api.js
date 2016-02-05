var express = require('express');
var router = express.Router();
var api = require('../controllers/api');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Boolself api');
});

router.get('/v1/books', api.getAllBooks);
router.get('/v1/books/:id', api.getBookById);
router.delete('/v1/books/:id', api.delBookById);

router.get('/v1/users', api.getAllUsers);
router.get('/v1/users/:uid', api.getUserById);

module.exports = router;
