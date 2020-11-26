var express = require('express');
var router = express.Router();

// Require controller modules.
var register_controller = require('../controllers/registerController');
var registerimage_controller = require('../controllers/registerimageController');
var login_controller = require('../controllers/loginController');
var profile_controller = require('../controllers/profileController');
var home_controller = require('../controllers/homeController');
var userlist_controller = require('../controllers/userlistController');

// GET catalog home page.
router.get('/', login_controller.index);

// GET register page.
router.get('/register', register_controller.register);

// GET request for register page.
router.get('/register', register_controller.register_create_get);

// POST request for register page.
router.post('/register', register_controller.register_create_post);


// GET home page.
router.get('/home', home_controller.home);

// GET request for home page.
router.get('/home', home_controller.home_create_get);

// POST request for home page.
router.post('/home', home_controller.home_create_post);


// GET profile picture page.
router.get('/register/image', registerimage_controller.registerimage);

// GET request for profile picture page
router.get('/register/image', registerimage_controller.registerimage_create_get);

// POST request for profile picture page
router.post('/register/image', registerimage_controller.registerimage_create_post);

// GET userlist page.
router.get('/userlist', userlist_controller.userlist);

// GET request for userlist page
router.get('/userlist', userlist_controller.userlist_create_get);

// POST request for userlist page
router.post('/userlist', userlist_controller.userlist_create_post);


// GET login page.
router.get('/login', login_controller.login);

// GET request for login page
router.get('/', login_controller.login_create_get);

// POST request for login page
router.post('/', login_controller.login_create_post);

// GET User profile page.
router.get('/profile', profile_controller.profile);

// GET request for User Profile page
router.get('/profile/create', profile_controller.profile_create_get);

// POST request for User Profile page
router.post('/profile/create', profile_controller.profile_create_post);



module.exports = router;
