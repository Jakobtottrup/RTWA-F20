const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
let User = require('../DB/models/user');
let defaultState = require('../gamestate');
router.get('/register', (req, res) => {
    res.render('pages/register', {layout: 'layouts/user'});
});
router.post('/register', ((req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const password2 = req.body.password.trim();

    req.check('username', 'Please choose a username.').notEmpty();
    req.check('password', 'Please choose a password.').notEmpty();
    req.check('password2', 'Please enter the same password').equals(req.body.password);

    let errors = req.validationErrors();

    if (errors) {
        res.render('pages/register', {errors: errors});
    } else {
        let newUser = new User({
            username: username,
            password: password,
            gamestate: defaultState
        });

        User.findOne({username}, (err, user) => {
            if (err) {
                req.flash('warning', 'An error occurred.');
                res.redirect('/users/register');
                console.log(err);
            }
            if (user) {
                req.flash('warning', 'Username taken.');
                res.redirect('/users/register');
                return;
            }

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        console.log(err);
                    }
                    newUser.password = hash;
                    newUser.save((err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            req.flash('success', 'User Registered');
                            res.redirect('/users/login');
                        }
                    });
                });
            });
        });
    }

}));

router.get('/login', (req, res) => {
    res.render('pages/login', {layout: 'layouts/user'});
});

router.post('/login', ((req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
}));

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'You have been logged out.');
    res.redirect('/users/login');
});
module.exports = router;
