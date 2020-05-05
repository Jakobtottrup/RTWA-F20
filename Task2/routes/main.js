const express = require('express');
const router = express.Router();
const title = 'Task 2 - Jatoe13';
const state = require('../gamestate');
const ensure = require('../DB/ensure');

let User = require('../DB/models/user');

/* GET home page. */
router.get('/', ensure.user, ((req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            console.error(err);
        } else {
            users = JSON.parse(JSON.stringify(users));
            res.render('pages/rooms/main', {title: title, layout: 'layouts/main', room: 'Main', state: state, username: req.params.username}, req.params.username);

        }
    });

}));
router.get('/data', ((req, res) => {
    res.json(state);
}));
router.get('/main', function (req, res, next) {
    res.render('pages/rooms/main', {title: title, layout: 'layouts/main', room: 'Main'});
});
router.get('/A', function (req, res, next) {
    res.render('pages/rooms/a', {title: title, layout: 'layouts/game', room: 'A'});
});
router.get('/B', function (req, res, next) {
    res.render('pages/rooms/b', {title: title, layout: 'layouts/game', room: 'B'});
});
router.get('/C', function (req, res, next) {
    res.render('pages/rooms/c', {title: title, layout: 'layouts/game', room: 'C'});
});
/*

router.post('/login', (req, res, next) => {
  passport.authenticate('local',
      (err, user, info) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          return res.redirect('/login?info=' + info);
        }

        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.redirect('/');
        });
      })(req, res, next);
});

router.get('/login', (req, res) => {
  res.render('pages/login');
});

router.get('/private', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render('pages/private');
});

router.get('/user', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.send({user: req.user})
});
*/

module.exports = router;
