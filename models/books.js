
'use strict';
var _ = require('underscore')._;
var util = require('util');
var db = require('./db');

/* table definination
create table books (
    id integer not null primary key,
    name string not null,
    series string,
    author string  not null,
    isbn string  not null,
    owner string  not null,
    status string default 'available',
    createdate string,
    lastmodified string
);
*/             

var formatDate = function(dt) {
    var yr = dt.getFullYear();

    var mnth = dt.getMonth() + 1;
    if (mnth < 10) mnth = "0" + mnth;

    var day = dt.getDate();
    if (day < 10) day = "0" + day;

    return yr + "-" + mnth + "-" + day;
};

function Book() {
    if (arguments.length === 1) {
        var row = arguments[0];
        
        this.id           = row.id;
        this.name         = row.name;
        this.series       = row.series;
        this.author       = row.author;
        this.isbn         = row.isbn;
        this.owner        = row.owner;
        this.status       = row.status;
        this.createdate   = row.createdate;
        this.lastmodified = row.lastmodified;
    }
    else {
        this.id           = arguments[0];
        this.name         = arguments[0];
        this.series       = arguments[0]
        this.author       = arguments[0];		
        this.isbn         = arguments[0];
        this.owner        = arguments[0];
        this.status       = arguments[0];
        this.createdate   = arguments[0];
        this.lastmodified = arguments[0];
    }
};    

Book.prototype.Sql = function() {
    return util.format("insert into books(" + Book.fields() + ")" +
        " values(null, '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
        this.name, this.series, this.author, this.isbn, 
        this.owner, this.createdate, this.lastmodified);
};

Book.prototype.Delete = function(callback) {
    db.delBooks({id: this.id}, function(err) {
        callback(err);
    });
};
             
module.exports.getAll = function(callback) {
    db.getBooks(null, function(err, rows) {
        var books = _.map(rows, function(row) {
            return new Book(row);
        });
        callback(err, books);
    });
};

module.exports.search = function(option, callback) {
    db.getBooks(option, function(err, rows) {
        return callback(err, rows);
    });
};

module.exports.findById = function(bookid, callback) {
    db.getBooks({id: bookid}, function(err, rows) {
        if (err)
            return callback(err);
            
        if (rows.length == 0)
            callback({error: "No such book"});
        else 
            callback(null, new Book(rows[0]));
    });
};

module.exports.switchto = function(bookid, debtor, callback) {
    var today = formatDate(new Date());
    db.switchBook(bookid, debtor, today, function(err) {
        callback(err);
    });
};

module.exports.add = function(name, series, author, isbn, owner, callback) {
    var today = formatDate(new Date());
    db.addBook(name, series, author, isbn, owner, 
               'available', today, today, function(err) {
        callback(err);
    });
  
};
