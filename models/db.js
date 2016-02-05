var settings = require('../settings');
var sqlite3 = require('sqlite3');
var util = require('util');

module.exports.getBooks = function(fields, option, callback) {
    var querystr = "select " + fields + " from books";
    
    var wheres = [];
    if (option) {
        if (option.id)
            wheres.push(util.format("id = %d", option.id))
        if (option.name && option.name.length > 0)
            wheres.push(util.format("name like '%%%s%%'", option.name));
        if (option.series && option.series.length > 0)
            wheres.push(util.format("series like '%%%s%%'", option.series));
        if (option.author && option.author.length > 0)
            wheres.push(util.format("author like '%%%s%%'", option.author));
            
        if (wheres.length > 0)
            querystr += " where " + wheres.join(" and ");            
    }
    querystr +=  " order by series, isbn, owner";
    
    var db = new sqlite3.Database(settings.dbpath, function (err) {
        if (err)
            return callback(err);
            
        db.all(querystr, function(err, rows) {
            db.close()

            callback(err, rows);
        });
    }); 
};

module.exports.switchBook = function(id, debator, callback) {
    var db = new sqlite3.Database(settings.dbpath);
    db.serialize(function() {
        var sqlstr = util.format("update books set status='%s' where id = %d",
                             debator, id);
        db.run(sqlstr);
        db.close();
        
        callback();
    });
};