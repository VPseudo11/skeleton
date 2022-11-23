const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { jwtSecret } = require('../config');
const { getUsersById } = require('../users/users.controllers');

module.exports = (passport) => {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: jwtSecret
    }
    passport.use(
        new JwtStrategy(options, async (decoded, done) => {
            try {
                const response = await getUsersById(decoded.id)
                if (!response) {
                    return done(null, false)
                }
                return done(null, decoded)
            } catch (err) {
                return done(err, false)
            }
        })
    )
}