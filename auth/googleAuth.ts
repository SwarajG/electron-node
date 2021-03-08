import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../model/User';
import { IUser } from '../interface/userInterface';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../config';

passport.serializeUser((user: any, done) => {
  done(null, user.googleId);
});

passport.deserializeUser((id: any, done) => {
  User.find({ googleId: id }, (err: any, user: any) => {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/auth/google/callback'
    },
    (accessToken: any, refreshToken: any, profile: any, cb: any) => {
      const {
        name: { familyName, givenName },
        emails,
        photos
      } = profile;
      const email = emails[0]?.value;
      const photo = photos[0]?.value;
      const user = {
        firstName: givenName,
        lastName: familyName,
        email,
        googleId: profile.id,
        photo: photo
      };
      User.find({ email }, (err: any, dbUser: Array<IUser>) => {
        if (err) return console.error(err);
        if (!dbUser.length) {
          User.create(user, (err: any, createdUser: IUser) => {
            return cb(err, createdUser);
          });
        }
        return cb(err, dbUser[0]);
      });
    }
  )
);
