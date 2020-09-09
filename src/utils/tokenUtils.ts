/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {User} from 'models/User'
import jwt from 'jsonwebtoken'
import {ITokenPayload} from 'interfaces/TokenPayload'

export const createTokenForUser = (user: User): string => {
  return jwt.sign({email: user.email, id: user.id}, process.env.JWT_SECRET!, {expiresIn: '1d'})
}

export const verifyToken = (token: string): ITokenPayload => {
  return jwt.verify(token, process.env.JWT_SECRET!) as ITokenPayload
}
