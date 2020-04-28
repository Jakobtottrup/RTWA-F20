const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/main', { title: 'Home', layout: 'layouts/main' });
});

module.exports = router;
