import passport from "passport";
import passportJWT, {VerifiedCallback} from 'passport-jwt';
import User from '../../../domain/model/user.schema';
import config from '../../config/auth';

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

export default () => {
    const strategy = new Strategy(params, async (payload, done: VerifiedCallback) => {
       const user = await User.findById(payload.id);
       if (!user) return done(new Error('User not found!'), null);

       return done(null, user);
    });

    passport.use(strategy);

    return {
        initialize: () => {
            return passport.initialize()
        },
        authenticate: () => {
            return passport.authenticate('jwt', { session: false })
        }
    }
}
