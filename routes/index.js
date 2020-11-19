const express = require('express');
const router  = express.Router();
const User = require('../models/User')


/* GET home page */
router.get('/', async(req, res, next) => {
  const id = req.session.user   //const id = req.session.passport.user
  if (id) {
    const user = await User.findById(id)
    res.render('index', {user})
  } else {
    res.render('index')
  }
});

module.exports = router;

