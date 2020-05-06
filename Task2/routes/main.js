const express = require('express');
const router = express.Router({mergeParams: true});
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
            res.render('pages/rooms/main', {
                title: title,
                layout: 'layouts/main',
                room: 'Main',
                state: req.user.gamestate,
                username: req.user.username
            });
            //users.forEach(el => console.log(el.gamestate));
            //console.log(req.user.gamestate);
        }
    });


}));
router.get('/data', ((req, res) => {
    res.json(req.user);
}));
router.get('/main', ensure.user, ((req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            console.error(err);
        } else {
            users = JSON.parse(JSON.stringify(users));
            res.render('pages/rooms/main', {
                title: title,
                layout: 'layouts/main',
                room: 'Main',
                state: req.user.gamestate,
                username: req.user.username
            });
        }
    });

}));
router.get('/a', ensure.user, ((req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            console.error(err);
        } else {
            users = JSON.parse(JSON.stringify(users));
            res.render('pages/rooms/a', {
                title: title,
                layout: 'layouts/game',
                room: 'A',
                state: req.user.gamestate,
                username: req.user.username
            });
            console.log(req.user);
        }
    });


}));
router.get('/B', ensure.user, function (req, res, next) {
    res.render('pages/rooms/b', {title: title, layout: 'layouts/game', room: 'B'});
});
router.get('/C', ensure.user, function (req, res, next) {
    res.render('pages/rooms/c', {title: title, layout: 'layouts/game', room: 'C'});
});


module.exports = router;
