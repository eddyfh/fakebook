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
		  if(err) {
		    throw(err);
		  } else {
		    console.log('user: ' + user.username + " saved.");
		    res.redirect('/#/profile');
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
  app.get('/api/fetchUsers', function(req,res){
  	User.find({}, function(err, docs){
  		if (err) {
  			throw(err);
  		}
  		res.send(docs);
  	});
  });
};


    // app.get('/', function (req, res, next) {
    //     res.render('index', {
    //         title: 'Express'
    //     });
    // });
    // app.get('/profile', function(req,res,next){
    // 	res.redirect('/#/profile', { user: req.user });
    // });
    // app.get('/newAccount', function(req,res,next){
    // 	res.redirect('/#/newAccount');
    // });:

  //   app.post('/login', function(req, res, next) {
		//   passport.authenticate('local', function(err, user, info) {
		//   	console.log(req.user);
		//     if (err) { return next(err) }
		//     if (!user) {
		//       req.session.messages =  [info.message];
		//       return res.redirect('/#/newAccount')
		//     }
		//     req.logIn(user, function(err) {
		//       if (err) { return next(err); }
		//       res.redirect('/#/profile');
		//     });
		//   })(req, res, next);
		// });
