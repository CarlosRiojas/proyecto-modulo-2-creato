const bcrypt = require("bcrypt")
const User = require("../models/User")
const passport = require('passport')

//-------Signup
exports.signupView = (req, res) => res.render("auth/signup")

exports.signupProcess = async (req, res) => {
    const { name, email, password } = req.body
    if (!email || !password || !name) {
      return res.render("auth/signup", {
        errorMessage: "Please provide name, email and password"
      })
    }
    const user = await User.findOne({ email })
  if (user) {
    return res.render("auth/signup", {
      errorMessage: "Error"
    })
  }

  const salt = bcrypt.genSaltSync(12)
  const hashPass = bcrypt.hashSync(password, salt)
  await User.create({
    name,
    email,
    password: hashPass
  })
  res.redirect("/login")
}

//-------Login

exports.loginView = (req, res) => {
    res.render("auth/login")
  }

  exports.loginProcess = passport.authenticate("local", {
    successRedirect: "/auth/profile",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })

  //-------Logout

  exports.logout = (req, res) => {
    req.logout()
    res.redirect("/login")
  }
  //-------Redirect after login

  exports.profile = async (req, res) => {
    const id = req.session.passport.user
    const user = await User.findById(id)
    if(user.role === "COLLABORATOR"){
      res.render("collabDashboard", {user})
    } else {
      res.render("userDashboard", {user})
    }
  }


  // exports.profileView = async (req, res) => {
  //   const id = req.session.passport.user
  //   const user = await User.findById(id)
  //   res.render("profile", user)
  // }

  // exports de google
  exports.googleInit = passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })

  exports.googleCb = passport.authenticate("google", {
    successRedirect: "/userpage",
    failureRedirect: "/login"
  })