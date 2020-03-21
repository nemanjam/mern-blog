import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

import User from '../models/User';
import requireLocalAuth from '../middleware/requireLocalAuth';

const router = Router();

const tokenFromUser = user => {
  const token = jwt.sign({}, process.env.JWT_SECRET_DEV, {
    expiresIn: '12h',
    subject: user.id,
  });
  return token;
};

router.post('/auth/login', requireLocalAuth, (req, res) => {
  const token = tokenFromUser(req.user);
  res.cookie('x-auth-cookie', token);
  res.json({ token });
});

router.post('/auth/register', async (req, res, next) => {
  const schema = Joi.object().keys({
    fullName: Joi.string()
      .trim()
      .min(2)
      .max(24)
      .required(),
    email: Joi.string()
      .trim()
      .email()
      .required(),
    password: Joi.string()
      .trim()
      .min(6)
      .max(12)
      .required(),
    policy: Joi.boolean().required(),
  });

  let form;
  try {
    form = await Joi.validate(req.body, schema);
  } catch (err) {
    return res.status(422).send(err.details[0].message);
  }
  const { email, password, fullName } = form;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    try {
      const newUser = await new User({
        provider: 'email',
        email,
        password,
        localDisplayName: fullName,
      });

      newUser.registerUser(newUser, (err, user) => {
        if (err) throw err;
        const token = tokenFromUser(user);
        res.cookie('x-auth-cookie', token);
        res.json({
          token,
          user: {
            id: user.id,
            displayName: user.localDisplayName,
            email: user.email,
            provider: user.provider,
          },
        });
      });
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

// logout
router.get('/auth/logout', (req, res) => {
  req.logout();
  res.send(false);
});

export default router;
