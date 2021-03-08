import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { getUsers } from '../controller/user';

const router = express.Router();

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  console.log('req.user: ', req.user);
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

router.get('/', (_: any, res: any) => res.send('Index page'));
router.get('/users', getUsers);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/good');
});
router.get('/good', isLoggedIn, (req: Request, res: Response) => res.send(`Welcome Mr. ${req?.user}!`));
router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

export default router;
