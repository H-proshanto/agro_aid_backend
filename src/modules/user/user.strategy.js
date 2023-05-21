const passport = require('passport');
const { Strategy } = require('passport-jwt')
const { findUser } = require('./user.controller');

module.exports = () => {
    const cookieExtractor = (req) => {
        let token = null;

        if (req && req.signedCookies) {
            token = req.signedCookies['access_token'];
        }

        return token;
    }

    passport.use(
        "user-jwt",
        new Strategy(
            {
                secretOrKey: process.env.JWT_SECRET,
                jwtFromRequest: cookieExtractor
            },
            async (payload, done) => {
                const user = await findUser(payload.email);

                if (!user) done(null, false);

                done(null, user);
            }
        )
    );

}
