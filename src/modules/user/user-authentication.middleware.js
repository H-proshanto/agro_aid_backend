const passport = require('passport');

module.exports = (req, res, next) => {
    const auth = passport.authenticate("user-jwt", (err, user) => {
        if (err) return req.status(500).send('Internal server error');

        if (!user) return res.status(401).send('Unauthenticated user');

        req.logIn(user, { session: false }, (err) => {
            if (err) return next(err);

            next();
        })

    });

    auth(req, res, next);
}
