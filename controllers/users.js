
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
        var redirect = req.session.last || '/list';
        
        req.session.last = undefined; 
        res.redirect(redirect);    
    });
}

module.exports.logout = function(req, res, next) {
    req.session.user = undefined;
    res.redirect('/');    
    
}


module.exports.showRegisterForm = function(req, res, next) {
    res.send('Register');
}

module.exports.addUser = function(req, res, next) {
    res.send('Register');
}
