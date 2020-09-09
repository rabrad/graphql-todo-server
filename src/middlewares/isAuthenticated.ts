import {MiddlewareFn} from 'type-graphql'
import {IUserContext} from '../interfaces/UserContext'
import {User} from '../models/User'
import {verifyToken} from '../utils/tokenUtils'
import {AppErrors, Errors} from '../custom-errors/AppErrors'

export const isAuthenticated: MiddlewareFn<IUserContext> = async ({context}, next) => {
  const authentication = context.req.headers['authorization']

  if (!authentication) {
    throw new AppErrors(Errors.Unauthorized)
  }

  try {
    const token = authentication.split(' ')[1]
    const payload = verifyToken(token)
    context.user = await User.findOne({where: {email: payload.email}})
  } catch (error) {
    throw new AppErrors(Errors.SessionExpired)
  }
  return next()
}
