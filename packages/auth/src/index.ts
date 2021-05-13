import { serialize, CookieSerializeOptions } from 'cookie';
import { ServerResponse } from 'http';
import jwt from 'jsonwebtoken';

export const setCookie = (
  res: ServerResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value);

  const newOptions = options;

  if (newOptions.maxAge) {
    newOptions.expires = new Date(Date.now() + newOptions.maxAge);
    newOptions.maxAge /= 1000;
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), newOptions));
};

export function generateJWT(
  payload: any,
  secret = process.env.JWT_SECRET || '',
  expiresIn = '12h'
): string {
  const date = new Date();

  date.setHours(date.getHours() + 12);

  return jwt.sign(payload, secret, {
    expiresIn,
  });
}

export async function parseJWT<T>(
  jwtToken: string,
  secret = process.env.JWT_SECRET || ''
): Promise<T | null> {
  try {
    return (jwt.verify(jwtToken, secret) as unknown) as T;
  } catch (e) {
    console.error(e.message);
  }

  return null;
}
