var express = require('express');
var router = express.Router();

// Require controller modules.
var userInfo_controller = require('../controllers/userInfoController');


// GET catalog home page.
router.get('/', userInfo_controller.index);

// GET userinfo page.
router.get('/userinfo', userInfo_controller.userinfo);

// GET request for creating UserInfo. NOTE This must come before route for id (i.e. display author).
router.get('/userinfo/create', userInfo_controller.userinfo_create_get);

// POST request for creating userinfo.
router.post('/userinfo/create', userInfo_controller.userinfo_create_post);


module.exports = router;