var request = require('request');
var debug = require('debug')('bookshelf:server');

var books = require('../models/books');
var users = require('../models/users');

var resources = require('../resources');

module.exports.listAll = function(req, res, next) {
    books.getAll(function(err, books) {
        if (err)
            res.send(err);
        else
		    res.render('booklist', {
			    title: 'BookShelf',
			    books: books,
                resources: resources,
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
                resources: resources
            });        
    });
};

module.exports.showAddForm = function(req, res, next) {
    users.getAll(function(users) {
        res.render('addbook', {
            users: users,
            resources: resources
        });        
    })

};

module.exports.addNew = function(req, res, next) {
    debug("books.addNew");
    books.add(req.body.name.trim(),   req.body.series.trim(),
              req.body.author.trim(), req.body.barcode.trim(),
              req.body.owner, function(err) {
        if (err)
            res.send(err);
        else
            if (req.body.continue == 'yes')
                res.redirect('/add');
            else         
                res.redirect('/list');              
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

module.exports.delete = function(req, res, next) {
    books.deleteById(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.redirect('/list');    
    });
};

module.exports.showModifyForm = function(req, res, next) {
    users.getAll(function(users) {
        books.findById(req.params.id, function(err, book) {
            if (err)
                res.send(err);
            else {
                if (book)
                    res.render('modify', {
                        book: book,
                        users: users,
                        resources: resources});
                else
                    res.status(404).send({message: 'Invalid book'});
            }
        });
    });
};

module.exports.modify = function(req, res, next) {
    books.modify(req.params.id, 
                 req.body.name.trim(), req.body.series.trim(),
                 req.body.author.trim(), req.body.barcode.trim(), req.body.owner, 
                 function(err) {
        if (err)
            res.send(err);
        else
            res.redirect('/list');              
    });
}
