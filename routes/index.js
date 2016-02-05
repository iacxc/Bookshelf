var express = require('express');
var router = express.Router();
var books = require('../controllers/books');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BoolShelf' });
});


router.get('/list', books.listAll);
router.post('/search', books.search);

router.get('/:id/switchto', books.showSwitchForm);
router.post('/:id/switchto', books.switchTo);


module.exports = router;
