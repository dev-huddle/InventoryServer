import jwt from 'jsonwebtoken';

// Generate JWT token
export const generateToken = (payload: object, secret: string, expiresIn: string = '1h') => {
  return jwt.sign(payload, secret, { expiresIn });
};

// Verify JWT token
export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};
