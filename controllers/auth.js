const bcrypt = require("bcrypt")
const User = require("../models/User")
const passport = require('passport')


//-------Signup
exports.signupView = (req, res) => res.render("auth/signup")

exports.signupProcess = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
      return res.render("auth/signup", {
        errorMessage: "Please provide email and password"
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
  //-------

  exports.privatePage = (req, res) => {
    res.render("auth/userpage", req.user)
  }

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