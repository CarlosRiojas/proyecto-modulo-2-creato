const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const { viewCreatePost, createPost, collabPosts, postDetail,editItem,postEditItem } = require('../controllers/posts');
const { loginView, loginProcess, googleInit,  googleCb, profile } = require('../controllers/auth')
const uploadPicture = require("../config/cloudinary")


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//-------Login

router.get("/login", loginView);
router.post("/login", loginProcess);

//-------Signup

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const name = req.body.name
  const email = req.body.email;
  const password = req.body.password;
  if (email === "" || password === "" || name === "") {
    res.render("auth/signup", { message: "Please indicate name, email and password" });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The email already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashPass
    });

    newUser.save()
    .then(() => {
      res.redirect("/auth/login");
    })
    .catch(err => {
      console.log(err)
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});


router.get("/profile", profile)
// router.post("/profile", profile)

//-------CreatePost

router.get('/createPost', viewCreatePost)
router.post('/createPost',uploadPicture.array("media", 2), createPost)

//-------Logout

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//-------Auth Google

router.get("/google", googleInit)
router.get("/google/callback", googleCb)

//-------Collab Dashboard

// router.get("/collabDashboard", collabPosts)

// //-------Detalle de los posts

router.get("/:postId", postDetail)

//-------User Dashboard

//----- editar items 
router.get("/:postId/edit",editItem)
router.post("/:postId/edit",postEditItem)

//------- Profile

module.exports = router;


