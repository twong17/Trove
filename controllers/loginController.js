const { body,validationResult } = require("express-validator");
var UserInfo = require('../models/userinfo');

exports.index = function(req, res) {
     res.render('index', { title: 'Trove Login Page'});
};

// Display login page form on GET.
exports.login = function(req, res) {
    res.render('index', { title: 'Trove Login Page'});
};

// Display login page create form on GET.
exports.login_create_get = function(req, res) {
    res.render('index', { title: 'Trove Login Page'});
};

// Handle login on POST
exports.login_create_post = function(req, res) {
    //Store req user name and password
    var username = req.body.username;
    var password = req.body.password;
    //Search for a user with this user name and password
    UserInfo.findOne({username: username, password: password}, function(err,user) {
        if(err){
            console.log(err);
            return res.send("There was an error");
        }       
        //if a user is not found send message
        if(!user){
            return res.send("User not found");
        }
        
        user.populate('following').execPopulate();
        //console.log(user.following);
        
        //else we have successfully found a user
        //return res.send("Success");
        //console.log(user.password);
        req.session.user = user;
        req.session.user.id = user._id;
           
         //console.log(req.session.user.following);
          res.redirect('/catalog/home');
          
    })   
};