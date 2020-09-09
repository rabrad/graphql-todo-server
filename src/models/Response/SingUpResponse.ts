import {ObjectType, Field} from 'type-graphql'
import {User} from 'models/User'
import {LoginResponse} from './LoginResponse'

@ObjectType()
export class SignUpResponse extends LoginResponse {
  @Field(() => User)
  user: User
}
