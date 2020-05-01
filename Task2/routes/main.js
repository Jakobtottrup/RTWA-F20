const express = require('express');
const router = express.Router();
const title = 'Task 1 - Jatoe13';
const state = require('../gamestate');
//let gamestate = JSON.parse(JSON.stringify(state));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/rooms/main', { title: title, layout: 'layouts/main', room: 'Main', state: state});
});
router.get('/data', ((req, res) => {
  res.json(state);
}));
router.get('/main', function(req, res, next) {
  res.render('pages/rooms/main', { title: title, layout: 'layouts/main', room: 'Main' });
});
router.get('/A', function(req, res, next) {
  res.render('pages/rooms/a', { title: title, layout: 'layouts/game', room: 'A' });
});
router.get('/B', function(req, res, next) {
  res.render('pages/rooms/b', { title: title, layout: 'layouts/game', room: 'B' });
});
router.get('/C', function(req, res, next) {
  res.render('pages/rooms/c', { title: title, layout: 'layouts/game', room: 'C' });
});

module.exports = router;
