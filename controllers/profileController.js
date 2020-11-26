//const { body,validationResult } = require("express-validator");
var UserInfo = require('../models/userinfo');
var Post = require('../models/post');

// Display login page form on GET.
exports.profile = function(req, res) {
    //res.render('profile', { title: 'Trove User Profile Page'});
    if(!req.session.user){
        res.send("User not found");
    }
    //console.log(req.session.user);
    //console.log(req.session.user.name);
     Post.find({user: req.session.user}, 'content')
    .exec(function (err, list_posts) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('profile', { title: 'Trove User Profile Page', user: req.session.user, post_list: list_posts});
    });
    //res.render('profile', { title: 'Trove User Profile Page', user: req.session.user});
};

// Display login page create form on GET.
exports.profile_create_get = function(req, res) {
    //res.render('index', { title: 'Trove Login Page'});
    res.send("User Profile GET");
};

// Handle login on POST
exports.profile_create_post = function(req, res) {
    res.send("User Profile POST")
};