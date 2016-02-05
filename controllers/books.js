var books = require('../models/books');
var users = require('../models/users');


module.exports.listAll = function(req, res, next) {
    books.getAll(function(err, books) {
        if (err)
            res.send(err);
        else
		    res.render('booklist', {
			    title: 'BookShelf',
			    books: books,
                resources: require('../resources'),
		    });
	});	
};

module.exports.search = function(req, res, next) {
    var option = {
        name: req.body.txtName.trim(),
        series: req.body.txtSeries.trim(),
        author: req.body.txtAuthor.trim()
    };
        
    books.search(option, function(err, books) {
        if (err)
            res.send(err);
        else
            res.render('booklist', {
			    title: 'BookShelf',
			    books: books,
                resources: require('../resources'),
            });        
    });
};

module.exports.showSwitchForm = function(req, res, next) {
    users.getAll(function(users) {
        books.findById(req.params.id, function(err, book) {
            if (err)
                res.send(err);
            else {
                if (book)
                    res.render('switch', {
                         book: book,
                         users: users });    
                else
                    res.status(404).send({message: 'Invalid book'});
            }
        });
    });
};

module.exports.switchTo = function(req, res, next) {
    books.switchto(req.params.id, req.body.debtor, function() {

        res.redirect('/list');
    });
};
