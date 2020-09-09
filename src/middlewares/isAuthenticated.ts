import {MiddlewareFn} from 'type-graphql'
import {IUserContext} from '../interfaces/UserContext'
import {User} from '../models/User'
import {verifyToken} from '../utils/tokenUtils'

export const isAuthenticated: MiddlewareFn<IUserContext> = async ({context}, next) => {
  const authentication = context.req.headers['authorization']

  if (!authentication) {
    throw new Error('Not authenticated!')
  }

  try {
    const token = authentication.split(' ')[1]
    const payload = verifyToken(token)
    context.user = await User.findOne({where: {email: payload.email}})
  } catch (error) {
    throw new Error('Your session is expired, please login again.')
  }
  return next()
}
