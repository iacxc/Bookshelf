
var users = require('../models/users');
var resources = require('../resources');

module.exports.showLoginForm = function(req, res, next) {
    res.render('login', {
        title: resources.login,
        resources: resources
    });
}

module.exports.login = function(req, res, next) {
    var uid = req.body.txtUid;
    users.findById(uid, function(err, user) {
        if (err)
            return res.send(err);
            
        req.session.user = user;
        res.redirect('/list');    
    });
}

module.exports.logout = function(req, res, next) {
    req.session.user = undefined;
    res.redirect('/list');    
    
}


module.exports.showRegisterForm = function(req, res, next) {
    res.send('Register');
}

module.exports.addUser = function(req, res, next) {
    res.send('Register');
}
