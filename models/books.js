
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

class Book {
    constructor(id, name, series, author, isbn, owner, status) {
        this.id =  id;
        this.name = name;
        this.series = series;
		this.author = author;		
        this.isbn = isbn;
		this.owner = owner;
        this.status = status;
        this.createdate = formatDate(new Date());
        this.lastmodified = formatDate(new Date());
    }
    
    static fields() {
        return ['id', 'name', 'series', 'author', 'isbn', 'owner', 
                'status', 'createdate', 'lastmodified'].join(",");
    }
        
    Sql() {
        return util.format("insert into books(" + Book.fields() + ")" +
              " values(null, '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
              this.name, this.series, this.author, this.isbn, 
              this.owner, this.createdate, this.lastmodified);
    }
};


             
module.exports.getAll = function(callback) {
    db.getBooks(Book.fields(), null, function(err, rows) {
        var books = _.map(rows, function(row) {
            return new Book(row.id, row.name, row.series, row.author,
                            row.isbn, row.owner, row.status);
        });
        callback(err, books);
    });
};

module.exports.search = function(option, callback) {
    db.getBooks(Book.fields(), option, function(err, rows) {
        return callback(err, rows);
    });
};

module.exports.findById = function(bookid, callback) {
    db.getBooks(Book.fields(), {id: bookid}, function(err, rows) {
        if (rows.length == 0)
            callback(err, null);
        else
            callback(err, rows[0]); 
    });
};

module.exports.switchto = function(bookid, debtor, callback) {
    db.switchBook(bookid, debtor, function(err) {
        callback(err);
    });
};
