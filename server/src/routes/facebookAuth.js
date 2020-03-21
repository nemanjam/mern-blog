import { Router } from 'express';
import passport from 'passport';
import tokenFromUser from '../utils/utils';

const router = Router();

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
  }),
);

router.get(
  process.env.FACEBOOK_CALLBACK_URL,
  passport.authenticate('facebook', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    const token = tokenFromUser(req.user);
    res.cookie('x-auth-cookie', token);
    res.redirect(process.env.SUCCESS_REDIRECT_URL_DEV);
  },
);

export default router;
