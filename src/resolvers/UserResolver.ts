import {Resolver, Query, Arg, Mutation} from 'type-graphql'
import {LoginResponse} from '../models/Response/LoginResponse'
import {User} from '../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {SignUpResponse} from '../models/Response/SingUpResponse'
import {createTokenForUser} from '../utils/tokenUtils'

@Resolver()
export class UserResolver {
  @Query(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<LoginResponse> {
    const user = await User.findOne({where: {email}})
    if (!user) {
      throw new Error('User not found with provided email.')
    }
    const passwordMatches = await bcrypt.compare(password, user.password)
    if (!passwordMatches) {
      throw new Error('Passwords do not match!')
    }
    const token = jwt.sign({email: user.email, id: user.id}, 'secret')
    return {token}
  }

  @Mutation(() => SignUpResponse)
  async signUp(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<SignUpResponse> {
    const passwordHash = await bcrypt.hash(password, 12)
    const user = await User.create({email, password: passwordHash}).save()
    const token = createTokenForUser(user)
    return {token, user}
  }
}
