'use strict';

var _ = require('underscore')._;
var util = require('util');

class User {
    constructor(id, firstname, lastname) {
        this.id = id;
	    this.firstname = firstname;
        this.lastname = lastname;
        this.fullname = util.format("%s, %s", lastname, firstname);
    };
};

var users = [new User("ccai", "Qishu", "Cai"),
	         new User("cxcai", "Chengxin", "Cai"),
             new User("jn", "Nan", "Ni"),
            ];
             
module.exports.getAll = function(callback) {
	callback(users);
};

module.exports.find = function(uid, callback) {
    var found = users.some(function(user) {
        if (user.id == uid) {
            callback(null, user);
            return true;
        }
    });
    
    if (! found)
        callback({error: "not found"});
}