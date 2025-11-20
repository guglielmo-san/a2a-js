import { NextFunction, Request, Response } from "express";
import { IncomingHttpHeaders } from "http";

export const authHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

    let validAuthentications : string[];
    const headers : IncomingHttpHeaders = req.headers;

    const authHeader = headers['authorization'];
    if (authHeader) {
        const [scheme, token] = authHeader.split(' ');

  if (!scheme || !token) {
    return res.status(401).json({ message: 'Invalid authorization format' });
  }

  // 3. Switch based on the scheme
  switch (scheme) {
    case 'Basic':
      return validateBasicToken(token);
    case 'Bearer':
      return validateBearerToken(token)
  }
    }
  
};

// Helper: Handle Basic Auth (Base64 encoded username:password)
const validateBasicToken = (
  token: string
): boolean => {
  return true;
};

// Helper: Handle Bearer Token (JWT)
const validateBearerToken = (
  token: string
): boolean => {
  return true;
};