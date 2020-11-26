//const { body,validationResult } = require("express-validator");
const multer = require('multer');
const helpers = require('../helpers');
var UserInfo = require('../models/userinfo');
const path = require('path');
const fs = require('fs');


//define storage location for images
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        //cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        cb(null, file.fieldname + '-' + Date.now());
    }
});

// Display login page form on GET.
exports.registerimage = function(req, res) {
    res.render('registerimage', { title: 'Trove Profile Picture Upload Page'});
    console.log(req.session.newuser);
};

// Display login page create form on GET.
exports.registerimage_create_get = function(req, res) {
    //res.render('index', { title: 'Trove Login Page'});
    res.send("Register Image GET");
};

// Handle login on POST
exports.registerimage_create_post = function(req, res) {
    //res.send("Register Image POST");
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        var filePath = req.file.path;
        console.log(filePath);
        var newUser = req.session.newuser;
        console.log(newUser);
//        newUser.img.data = fs.readFileSync(filePath);
//        newUser.img.contentType = "image/png";
    });
};