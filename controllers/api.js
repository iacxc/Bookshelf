var users = require('../models/users');
var books = require('../models/books');
var basicAuth = require('basic-auth');

module.exports.getAllUsers = function(req, res, next) {
    users.getAll(function(users) {
        res.send(users);
    })
};

module.exports.getUserById = function(req, res, next) {
    users.find(req.params.uid, function(err, user) {
        res.send(err || user);
    });
};


module.exports.getAllBooks = function(req, res, next) {
    books.getAll(function(err, books) {
        res.send(err || books);
    })
};

module.exports.getBookById = function(req, res, next) {
    books.findById(req.params.id, function(err, book) {
        res.send(err || book);
    });
};

module.exports.delBookById = function(req, res, next) {
    var user = basicAuth(req);
    if (user == undefined) {
        return res.status('401').send({error: 'Unauthorized'});
    }
    
    books.findById(req.params.id, function(err, book) {
        if (err)
            return res.send(err);

        if (book.owner != user.name)
            res.status('403').send({error: 'Not the owner'});
        else 
            book.Delete(function(err) {
                if (err)
                    res.send(err);
                else
                    res.status(200).send({status: 'OK'});
            })            
    });

};