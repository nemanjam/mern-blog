import jwt from 'jsonwebtoken';

export const tokenFromUser = user => {
  const token = jwt.sign({}, process.env.JWT_SECRET_DEV, {
    expiresIn: '12h',
    subject: user.id,
  });
  return token;
};
