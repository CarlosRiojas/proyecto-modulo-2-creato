const express = require('express');
const router  = express.Router();
const User = require('../models/User')
const passport = require('passport');

/* GET home page */
router.get('/', async(req, res, next) => {
  const id = req.session.passport.user
  if (id) {
    const user = await User.findById(id)
    res.render('index', {user})
  } else {
    res.render('index')
  }
});

module.exports = router;

