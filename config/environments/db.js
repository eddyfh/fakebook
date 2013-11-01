var mongoose = require('mongoose');

mongoose.connect('localhost', 'test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('Connected to DB');
});

// User Schema
var userSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  friends: { type: Array }
});

var User = module.exports.User = mongoose.model('User', userSchema);

var postSchema = mongoose.Schema({
	post: {type: String, required: true},
	username: { type: String, required: true},
	userId: { type: String, required: true}
});

var Post = module.exports.Post = mongoose.model('Post', postSchema);