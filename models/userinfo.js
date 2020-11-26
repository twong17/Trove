var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserInfoSchema = new Schema(
  {
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstname: {type: String, required: false},
    lastname: {type: String, required: false},
    friends: [{type: Schema.Types.ObjectId, ref: 'UserInfo'}],
  }
);

UserInfoSchema.set('toJSON', { virtuals: true })
//// Virtual for user login
//UserInfoSchema
//.virtual('url')
//.get(function () {
//  return '/catalog/login/' + this._id;
//});

// Virtual for user's full name
UserInfoSchema
.virtual('name')
.get(function () {
  return this.firstname + ' ' + this.lastname;
});



//const UserInfo = mongoose.model('UserInfo', UserInfoSchema, 'userinfos');
//Export model
module.exports = mongoose.model('UserInfo', UserInfoSchema);
