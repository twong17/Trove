const { body,validationResult } = require("express-validator");
var UserInfo = require('../models/userinfo');

//exports.index = function(req, res) {
//     res.render('index', { title: 'Trove Login Page'});
//};

// Display UserInfo form on GET.
exports.userinfo = function(req, res) {
    res.send('NOT IMPLEMENTED: UserInfo');
};

// Display UserInfo create form on GET.
exports.userinfo_create_get = function(req, res) {
    res.render('register', { title: 'Trove Register Page'});
};

// Handle userinfo create on POST.
exports.userinfo_create_post =  [
   
//  // Validate and santise the name field.
  body('username', 'Username required').trim().isLength({ min: 1 }).escape(),
  body('password', 'Password required').trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {

//    // Extract the validation errors from a request.
      console.log(validationResult(req));
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('register', { title: 'Trove Registration Page', userinfo: userinfo, errors: errors.array()});
      return;
    }
    else {
       //Create a new user object with escaped and trimmed data.
    var userinfo = new UserInfo(
      { username: req.body.username,
        password: req.body.password}
    );
      userinfo.save(function (err) {
               if (err) { return next(err); }
               // state that the user has been sucessfully created
               //res.redirect(genre.url);
                 res.send("Successfully added");
             });  
        }
  }
];
