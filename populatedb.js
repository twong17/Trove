#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var UserInfo = require('./models/userinfo')



var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var userinfos = []




function userinfoCreate(username, password, cb) {
    var userinfo = new UserInfo({ username: username, password: password });
       
  userinfo.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New User Info: ' + userinfo);
    userinfos.push(userinfo)
    cb(null, userinfo);
  }   );
}





function createUserInfos(cb) {
    async.series([
        function(callback) {
          userinfoCreate('twong', 'password',callback);
        },
        function(callback) {
          userinfoCreate("twong2", "password2", callback);
        },
        ],
        // optional callback
        cb);
}



async.series([
    createUserInfos
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: '+userinfos);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});

