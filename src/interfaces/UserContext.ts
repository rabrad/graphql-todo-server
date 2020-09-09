import {ExpressContext} from 'apollo-server-express/dist/ApolloServer'
import {User} from '../models/User'

export interface IUserContext extends ExpressContext {
  user?: User
}
