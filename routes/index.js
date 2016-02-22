var express = require('express');
var router = express.Router();
var books = require('../controllers/books');
var resources = require('../resources');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.protocol + '://' + req.headers.host + req.baseUrl);
    res.render('index', { title: 'BoolShelf',
                          resources: resources });
});


router.get('/list', books.listAll);
router.post('/search', books.search);

router.get('/add', books.showAddForm);
router.post('/add', books.addNew);

router.get('/:id/modify', books.showModifyForm);
router.post('/:id/modify', books.modify);

router.get('/:id/switchto', books.showSwitchForm);
router.post('/:id/switchto', books.switchTo);
router.get('/:id/delete', books.delete);


module.exports = router;
