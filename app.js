//jshint esversion:6

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const saltrounds = 10;
const bcrypt = require("bcrypt");
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const postSchema = {
  title: String,
  content: String
};
const Post = mongoose.model("Post", postSchema);

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  googleId: String,
  posts: []
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log("profile: ", profile);
    User.findOrCreate({
      googleId: profile.id,
      email: profile.email,
      username: profile.displayName
     }, function (err, user) {
      return cb(err, user);
    });
  }
));

const user1 = new User({
  username: "Pochin",
  email: "sunpochin@gmail.com",
  posts: []
});
const user2 = new User({
  username: "Aaron",
  email: "aaron@b.com",
  posts: []
});
const user3 = new User({
  username: "jack",
  email: "jack@b.com",
  posts: []
});


const app = express();
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const uri = "mongodb+srv://" + process.env.MONGODB_ADMIN + ":" + process.env.MONGODB_PASSWORD + "@cluster0.o1ffm.mongodb.net/blogDB?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// user1.save();
// user2.save();
// user3.save();


app.get("/", function(req, res) {
  User.find({}, function(err, foundUsers) {
    if (!err) {
      res.render("home", {
        foundUsers: foundUsers
      });
    } else {
      console.log(err);
    }
  });

});


app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const newPost = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  newPost.save(function(err) {
    if (!err) {
      res.redirect("/");
    } else {
      console.log("err: ", err);
    }
  });

});

app.get("/posts/:postId", function(req, res) {
  const requestedId = req.params.postId;
  console.log("requestedId: ", requestedId);
  Post.findOne({
    _id: requestedId
  }, function(err, foundPost) {
    if (!err) {
      console.log("found Post: ", foundPost.title);
      res.render("post", {
        title: foundPost.title,
        content: foundPost.content
      });
    } else {
      console.log("err: ", err);
    }
  });
});

app.get("/user/:username", function(req, res) {
  const username = req.params.username;
  console.log(username);
  User.findOne({
    username: username
  }, function(err, foundUser) {
    if (!err) {
      res.render("user", {
        username: foundUser.username,
        posts: foundUser.array
      });
    } else {
      console.log(err);
    }
  });
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.post("/register", function(req, res) {
  User.register({
    username: req.body.username
  }, req.body.password, function(err, User) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/");
      });
    }
  });
});

app.get("/auth/google",
  passport.authenticate('google', { scope: ['profile'] }));

app.get("/auth/google/secrets",
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
