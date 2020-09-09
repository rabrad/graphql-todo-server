import {User} from '../models/User'
import bcrypt from 'bcryptjs'

export const createMockUsers = async (): Promise<void> => {
  await User.delete({})
  const users = User.create([
    {
      email: 'user1@xpay.de',
      password: await bcrypt.hash('user1', 12),
    },
    {
      email: 'user2@xpay.de',
      password: await bcrypt.hash('user2', 12),
    },
  ]).map(user => user.save())
  await Promise.all(users)
}
