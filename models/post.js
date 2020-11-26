var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'UserInfo'},
  }
);


//// Virtual for post's URL
//PostSchema
//.virtual('url')
//.get(function () {
//  return '/catalog/book/' + this._id;
//});

//Export model
module.exports = mongoose.model('Post', PostSchema);
