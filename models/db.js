var settings = require('../settings');
var sqlite3 = require('sqlite3');
var debug = require('debug')('bookshelf:server');
var util = require('util');
var _ = require('underscore')._;

var bookFields = ['id', 'name', 'series', 'author', 'barcode', 'owner', 
        'status', 'createdate', 'lastmodified'].join(",");

var userFields = ['uid', 'lastname', 'firstname'].join(",");

function genWhereClause(conditions) {
    var clauses = _.pairs(conditions)
            .filter(function(entry) {
                 return entry[1].length != 0;
             })
            .map(function(entry) {
                 if (entry[0] == 'id')
                     return util.format("id = %d", entry[1]);
                 else
                     return util.format("%s like '%%%s%%'", 
                                        entry[0], entry[1]);                      
             }); 
     if (clauses.length > 0)
         return " where " + clauses.join(" and ");
     else
         return "";
}

function genSetClause(setfields) {
    var clauses = _.map(setfields, function(val, key) {
                     return util.format("%s = '%s'", key, val.replace(/\'/g, "''"));
             }); 
     if (clauses.length > 0)
         return " set " + clauses.join(", ");
     else
         return "";
}

/* exports */
// books
module.exports.addBook = function(name, series, author, barcode, owner, 
                                  status, createdt, lastdt, callback ) {
    var db = new sqlite3.Database(settings.dbpath, function(err) {
        if (err)  return callback(err);
        
        var stmt = db.prepare("insert into books(" + bookFields + ")" +
                              " values (?,?,?,?,?,?,?,?,?)");

        stmt.run(null, name, series, author, barcode, owner, 
                       status, createdt, lastdt);
        stmt.finalize();
        db.close();
               
        callback(); 

    });
};

module.exports.delBooks = function(conditions, callback) {
    var wheres = genWhereClause(conditions);
       
    var sqlstr = "delete from books" + wheres;

    debug(sqlstr);
    
    var db = new sqlite3.Database(settings.dbpath, function (err) {
        if (err)
            return callback(err);
            
        db.serialize(function() {
            db.run(sqlstr);
            db.close();
        
            callback();
        });
    }); 
};

module.exports.updateBooks = function(id, setfields, callback) {
    var sets = genSetClause(setfields);
    var sqlstr = "update books" + sets + " where id = " + id;

    debug(sqlstr);
    var db = new sqlite3.Database(settings.dbpath, function(err) {
        if (err)  return callback(err);
        db.serialize(function() {
            db.run(sqlstr);
            db.close();
        
            callback();
        });
    });
};

module.exports.getBooks = function(conditions, callback) {
    var wheres = genWhereClause(conditions);
    
    var querystr = "select " + bookFields + " from books" +
                   wheres + " order by series, barcode, owner";
    
    var db = new sqlite3.Database(settings.dbpath, function (err) {
        if (err)
            return callback(err);
            
        db.all(querystr, function(err, rows) {
            db.close()

            callback(err, rows);
        });
    }); 
};

module.exports.switchBook = function(id, debator, lastdt, callback) {
    var sqlstr = util.format(
                "update books set status='%s', lastmodified='%s'" +
                " where id = %d",
                debator, lastdt, id);    

    var db = new sqlite3.Database(settings.dbpath, function(err) {
        if (err)  return callback(err);
        db.serialize(function() {
            db.run(sqlstr);
            db.close();
        
            callback();
        });
    });
};

// users
module.exports.getUsers = function(conditions, callback) {
    var wheres = genWhereClause(conditions);
    
    var querystr = "select " + userFields + " from users" + wheres + " order by uid";
    
    debug(querystr);
    var db = new sqlite3.Database(settings.dbpath, function (err) {
        if (err)
            return callback(err);
            
        db.all(querystr, function(err, rows) {
            db.close()

            callback(err, rows);
        });
    }); 
};
