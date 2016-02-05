var settings = require('../settings');
var sqlite3 = require('sqlite3');
var util = require('util');
var _ = require('underscore')._;

var bookFields = ['id', 'name', 'series', 'author', 'isbn', 'owner', 
        'status', 'createdate', 'lastmodified'].join(",");

function genWhereClause(option)
{
    var clauses = _.pairs(option)
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

module.exports.getBooks = function(option, callback) {
    var querystr = "select " + bookFields + " from books";
    
    var wheres = genWhereClause(option);
        
    querystr += wheres + " order by series, isbn, owner";
    
    var db = new sqlite3.Database(settings.dbpath, function (err) {
        if (err)
            return callback(err);
            
        db.all(querystr, function(err, rows) {
            db.close()

            callback(err, rows);
        });
    }); 
};

module.exports.delBooks = function(option, callback) {
    var wheres = genWhereClause(option);
       
    var sqlstr = "delete from books" + wheres;

    console.log(sqlstr);
    
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

module.exports.addBook = function(name, series, author, isbn, owner, 
                                  status, createdt, lastdt, callback ) {
    var sqlstr = util.format(
        "insert into books(" + bookFields + ")" +
        " values (null, '%s','%s','%s','%s','%s','%s','%s','%s')",
        name, series, author, isbn, owner, 
        status, createdt, lastdt);

    var db = new sqlite3.Database(settings.dbpath, function(err) {
        if (err)  return callback(err);
               
        db.serialize(function() {

            db.run(sqlstr);
            db.close();
        
            callback(); 
        });
    });
};