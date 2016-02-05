'use strict';

var _ = require('underscore')._;
var util = require('util');

class User {
    constructor(id, firstname, lastname) {
        this.id = id;
	    this.firstname = firstname;
        this.lastname = lastname;
         		
    };
    Fullname() {
        return util.format("%s, %s", this.lastname, this.firstname);
    }
};

var users = [new User("ccai", "Qishu", "Cai"),
	         new User("cxcai", "Chengxin", "Cai"),
             new User("jn", "Nan", "Ni"),
             new User("user1", "User", "Unknown")
            ];
             
module.exports.getAll = function(callback) {
	callback(users);
};

module.exports.find = function(uid, callback) {
    users.forEach(function(user) {
        if (user.uid == uid) {
            callback(user);
            return;
        }
    });
}