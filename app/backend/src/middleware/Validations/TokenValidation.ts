import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

export default class TokenValidation {
  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const verifiedUser = await verify(authorization, JWT_SECRET);
      res.locals.user = verifiedUser; // https://www.tutorialspoint.com/res-locals-property-in-express-js#:~:text=The%20res.,that%20request%20or%20response%20cycle.
    } catch {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}
