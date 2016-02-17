var users = require('../models/users');
var books = require('../models/books');
var basicAuth = require('basic-auth');

module.exports.getAllUsers = function(req, res, next) {
    users.getAll(function(err, users) {
        res.send(err || users);
    })
};

module.exports.getUserById = function(req, res, next) {
    users.findById(req.params.uid, function(err, user) {
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
    
    books.deleteById(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.status(200).send({status: 'OK'});
    });
};