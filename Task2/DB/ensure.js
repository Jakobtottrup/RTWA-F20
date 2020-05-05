const ensure = {
    user: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            req.flash('warning', 'You are not logged in.');
            res.redirect('/users/login');
        }
    },
    admin: (req, res, next) => {
        if (req.isAuthenticated()) {
            if (req.user.permissions.includes('admin')) {
                return next();
            } else {
                req.flash('warning', 'You are not admin user');
                res.redirect('/');
            }
        } else {
            req.flash('warning', 'You are not logged in.');
            res.redirect('/users/login');
        }
    }
};

module.exports = ensure;