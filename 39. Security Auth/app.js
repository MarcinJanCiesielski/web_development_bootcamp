//jshint esversion:6
import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import findOrCreate from "mongoose-findorcreate";
import ejs from "ejs";

const dbName = "userDB";
const url_mongo = "mongodb://127.0.0.1:27017/" + dbName;

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(url_mongo);

const userSchema = new mongoose.Schema({
  email: { type: String },
	password: { type: String },
	googleId: {type: String}
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);


const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
    process.nextTick(function() {
        done(null, { id: user._id, username: user.username });
    });
});
passport.deserializeUser(function(user, done) {
    process.nextTick(function() {
        return done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
		userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
		passReqToCallback: true
  },
	function (request, accessToken, refreshToken, profile, cb) {
		console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/auth/google", 
	passport.authenticate('google', { scope: [ 'email', 'profile' ] }));

app.get( '/auth/google/secrets',
	passport.authenticate( 'google', {
		successRedirect: '/secrets',
		failureRedirect: '/login'
	}));

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", async (req, res) => {
  res.render("register");
});

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});


app.post("/register", async (req, res) => {
	try {
		const registerUser = await User.register(
				{username: req.body.username}, req.body.password
		);
		if (registerUser) {
			passport.authenticate("local") (req, res, function() {
				res.redirect("/secrets");
			});
		} else {
			res.redirect("/register");
		}
	} catch (err) {
		res.send(err);
	}
});

app.post("/login", (req, res) => {
	const user = new User({
		username: req.body.username,
		password: req.body.password
	});

	req.login(user, (err) => {
		if (err) {
			console.log(err);
		} else {
			passport.authenticate("local")(req, res, function() {
				res.redirect("/secrets");
			});
		}
	});
});

app.get("/logout", (req, res, next) => {
	req.logout(function(err) {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
});

app.listen(port, () => {
  console.log("App is listening on port " + port);
})
