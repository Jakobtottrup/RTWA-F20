const express = require('express');
const router = express.Router();
const title = 'Task 1 - Jatoe13';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/rooms/main', { title: title, layout: 'layouts/main', room: 'Main' });
});
router.get('/main', function(req, res, next) {
  res.render('pages/rooms/main', { title: title, layout: 'layouts/main', room: 'Main' });
});
router.get('/A', function(req, res, next) {
  res.render('pages/rooms/a', { title: title, layout: 'layouts/main', room: 'A' });
});
router.get('/B', function(req, res, next) {
  res.render('pages/rooms/b', { title: title, layout: 'layouts/main', room: 'B' });
});
router.get('/C', function(req, res, next) {
  res.render('pages/rooms/c', { title: title, layout: 'layouts/main', room: 'C' });
});

module.exports = router;
