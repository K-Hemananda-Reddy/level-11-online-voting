//requiring all the necessary packages for the project
const express = require("express");
const app = express();
//importing all the required modules
const csrf = require("tiny-csrf");
const cookieParser = require("cookie-parser");


//Models


//require body-parser for post routes
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcrypt");

//requiring passport js for authentication
//authentication middleware
const passport = require("passport");
const connectEnsureLogin = require("connect-ensure-login");

//requiring session and flash for showing errors
const session = require("express-session");
const flash = require("connect-flash");
const LocalStratergy = require("passport-local");

const saltRounds = 10;

const { ModelAdmin, model_election, model_questions, model_option, model_voter } = require("./models");
//using all the modules required
app.set("views", path.join(__dirname, "views"));
app.use(flash());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("This is some secret string"));
app.use(csrf("this_should_be_32_character_long", ["POST", "PUT", "DELETE"]));
//creating a session
app.use(
    session({
      secret: "my-super-secret-key-2837428907583420",
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

//view engine is ejs
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


  app.use((request, response, next) => {
    response.locals.messages = request.flash();
    next();
  });
  //initializing passport and session
  app.use(passport.initialize());
  app.use(passport.session());

//voter authenticaton
  passport.use(
    "voter_local",
    new LocalStratergy(
      {
        usernameField: "voter_id",
        passwordField: "password",
      },
      function (username, password, done) {
        model_voter.findOne({ where: { voter_id: username } })
          .then(async (user) => {
            const results = await bcrypt.compare(password, user.password);
            if (results) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Please Enter Correct Password" });
            }
          })
          .catch((error) => {
            return done(null, false, { message: "Please Enter Correct User Id" });
          });
      }
    )
  );
//admin authentication
  passport.use(
    "admin_local",
    new LocalStratergy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      function (username, password, done) {
        ModelAdmin.findOne({ where: { email: username } })
          .then(async (user) => {
            const results = await bcrypt.compare(password, user.password);
            if (results) {
              return done(null, user);
            } else {
              done(null, false, { message: "Please Enter Correct Password" });
            }
          })
          .catch((error) => {
            console.log(error);
            return done(null, false, { message: "Please Enter Correct Email" });
          });
      }
    )
  );


passport.serializeUser((user, done) => {
    done(null, { id: user.id, role: user.role });
  });
 
  passport.deserializeUser((id, done) => {
    if (id.role === "admin") {
      ModelAdmin.findByPk(id.id)
        .then((user1) => {
          done(null, user1);
        })
        .catch((error1) => {
          done(error1, null);
        });
    } else if (id.role === "voter") {
      model_voter.findByPk(id.id)
        .then((user1) => {
          done(null, user1);
        })
        .catch((error1) => {
          done(error1, null);
        });
    }
  });








