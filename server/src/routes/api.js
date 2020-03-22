import { Router } from 'express';
import requireJwtAuth from '../middleware/requireJwtAuth';

const router = Router();

// for local, fb, google
router.get('/api/me', requireJwtAuth, (req, res) => {
  const user = req.user.toAuthJSON();
  res.send({ user });
});

router.post('/api/feature', requireJwtAuth, (req, res) => {
  res.send({
    feature: 'This is a feature. Only authenticated users can see this.',
  });
});

router.post('/api/profile', requireJwtAuth, (req, res) => {
  res.send({
    profile: {
      provider: req.user.provider,
      displayName: req.user.firstName || req.user.googleDisplayName || req.user.facebookDisplayName,
      email: req.user.email || req.user.googleEmail || req.user.facebookEmail,
    },
  });
});

export default router;
