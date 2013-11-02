var passport = require('passport');
var User = require('../config/environments/db').User;
var Post = require('../config/environments/db').Post;

module.exports = function (app) {

  app.post('/login', passport.authenticate('local', { 
  	successRedirect: '/#/profile',
    failureRedirect: '/#/newAccount',
    failureFlash: true 
    }
  ));

	app.post('/newAccount', function(req,res,next){
		var user = new User({ name: req.body.name, username: req.body.username, password: req.body.password});
		user.save(function(err) {
		  if(err) throw(err);
		  else {
		    console.log('user: ' + user.username + " saved.");
		    res.redirect('/');
		  }
		});
	});
	app.get('/loggedIn', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });
  app.post('/api/postMessage', function(req, res){
  	var post = new Post({post: req.body.post, username: req.body.username, userId: req.body.userId});
  	post.save(function(err){
  		if (err){
  			throw(err);
  		} else {
  			console.log('message: ' + post.post + " saved.");
		    res.send('Success');
  		}
  	});
  });
  app.get('/api/fetchMyMessages', function(req,res){
  	Post.find({'userId': req.query.userId}, function(err, docs){
  		if (err) {
  			throw(err);
  		}
  		res.send(docs);
  	});
  });
  app.get('/api/fetchFriendMessages', function(req,res){
    var friendsObj = {$in: JSON.parse(req.query.friends)};
    Post.find({'userId': friendsObj }, function(err, docs){
      if (err) throw(err);
      res.send(docs);
    });
  });
  app.get('/api/fetchUsers', function(req,res){
  	User.find({}, function(err, docs){
  		if (err) {
  			throw(err);
  		}
  		res.send(docs);
  	});
  });
  app.post('/api/addFriend', function(req,res){
    User.findById(req.body.userId, function(err, docs){
      if (err) throw(err);
      docs.friends.push(req.body.friendId);
      docs.save();
    });
    User.findById(req.body.friendId, function(err, docs){
      if (err) throw(err);
      docs.friends.push(req.body.userId);
      docs.save();
    });
  });
  app.get('/logout', function(req, res){
    req.logout();
    res.send();
  });
};

