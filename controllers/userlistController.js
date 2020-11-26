//const { body,validationResult } = require("express-validator");
var mongoose = require('mongoose');
var UserInfo = require('../models/userinfo');
var Post = require('../models/post');

// Display login page form on GET.
exports.userlist = async function(req, res) {
    //res.send("User list page")
//    UserInfo.find({})
//    .populate('following').exec((err, userinfos) => {
//      console.log("Following users: " + userinfos.following);
//    })
      //console.log(req.session.user.following);
//    UserInfo.findOne({ username: 'someusername'},(err,res) => {
//        console.log("Check if populated" + res.populated('following'));
//    });
    
    console.log(req.body);
 
    UserInfo.find({},'')
    .populate('friends')
    .exec(function (err, list_users) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('userlist', { title: 'Trove User Profile Page', user_list: list_users});
    });
};

// Display login page create form on GET.
exports.userlist_create_get = function(req, res) {
    //res.render('index', { title: 'Trove Login Page'});
    res.send("User List Page");
};

// Handle userlist on POST
exports.userlist_create_post = function(req, res) {
    //res.send("User List Page POST function");
    
       //Create a new user object with escaped and trimmed data.
//    var obj= new UserInfo(
//      { username: 'uname',
//        password: 'pword'}
//    );
//      obj.save(function (err) {
//               if (err) { return next(err); }
//               // state that the user has been sucessfully created
//               
//                console.log("Successfully saved object")
//             });  
//    
    //Add user corresponding to button pressed to logged in user friends list
    UserInfo.updateOne(
    { username: req.body.action}, 
    { $push: { friends: req.session.user } },
    function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send("Success");
          }
        }
    );
    
    var query = UserInfo.findOne({username: req.body.action});
    //Add logged in user to other user's friends list
     UserInfo.updateOne(
    { username: req.session.user}, 
    { $push: { friends: query }},
    function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send("Success");
          }
        }
    );
    
     
    
    //TEST CODE
//    res.send(`You want to follow someone with the username ${req.body.action}`);
//    console.log(req.body.action);
    
 
    
};