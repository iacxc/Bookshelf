
'use strict';

var _ = require('underscore')._;
var util = require('util');
var db = require('./db');

class User {
    constructor() {
        if (arguments.length === 1) {
            var row = arguments[0];
            
            this.id = row.uid;
	        this.firstname = row.firstname;
            this.lastname = row.lastname;

        }
        else {
            this.id           = arguments[0];
            this.firstname    = arguments[1];
            this.lastname     = arguments[2]
        }
        this.fullname = util.format("%s, %s", this.lastname, this.firstname);
    }
   
};

             
module.exports.getAll = function(callback) {
    db.getUsers(null, function(err, rows) {
        var users = _.map(rows, function(row) {
            return new User(row);
        });
        callback(err, users);
    });

};

module.exports.findById = function(uid, callback) {
    db.getUsers({uid: uid}, function(err, rows) {
        if (err)
            return callback(err);
            
        if (rows.length == 0)
            callback({error: "No such user"});
        else 
            callback(null, new User(rows[0]));
    });
}