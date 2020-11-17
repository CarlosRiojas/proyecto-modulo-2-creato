const bcrypt = require("bcrypt")
const User = require("../models/User")
const passport = require("../passport")
const express = require("express");

exports.signupView = (req, res) => res.render("auth/signup")

//controller del regular login
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

exports.loginView = (req, res) => {
    res.render("auth/login", { errorMessage: req.flash("error") })
  }

  // exports.loginProcess = passport.authenticate("local", {
  //   successRedirect: "/profile",
  //   failureRedirect: "/auth/login",
  //   failureFlash: true,
  //   passReqToCallback: true
  // })


  

  exports.privatePage = (req, res) => {
    res.render("private", req.user)
  }

  exports.logout = (req, res) => {
    req.logout()
    res.redirect("/login")
  }

  // exports de google
  exports.googleInit = passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })

  exports.googleCb = passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login"
  })