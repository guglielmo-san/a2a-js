import { NextFunction, Request, RequestHandler, Response } from 'express';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      secretOrKey: 'a2a-secret-for-authentication-sample',
=======
      secretOrKey: 'A2A-SecurityKey',
>>>>>>> 5954614 (implementation of authentication sample wip)
=======
      secretOrKey: 'a2a-secret-for-authentication-sample',
>>>>>>> 460009d (wip authentication sample)
=======
      secretOrKey: 'A2A-SecurityKey',
>>>>>>> 1f0ef00 (implementation of authentication sample wip)
    },
    (jwt_payload, done) => {
      return done(null, jwt_payload);
    }
  )
);

export const authenticationHandler: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 460009d (wip authentication sample)
  passport.authenticate('jwt', { session: false }, (err: any, user: any, _info: any) => {
    if (err) {
      return next(err);
    }
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
<<<<<<< HEAD
=======
=======
>>>>>>> 1f0ef00 (implementation of authentication sample wip)
      passport.authenticate('jwt', { session: false }, (err: any, user: any, _info: any) => {
        if (err) {
          return next(err);
        }
        if (user) {
          req.user = user;
        }
        next();
      })(req, res, next);
<<<<<<< HEAD
>>>>>>> 5954614 (implementation of authentication sample wip)
=======
>>>>>>> 460009d (wip authentication sample)
=======
>>>>>>> 1f0ef00 (implementation of authentication sample wip)
};
