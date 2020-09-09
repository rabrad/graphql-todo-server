import {User} from '../models/User'

export const createMockUsers = async (): Promise<void> => {
  const users = User.create([
    {
      email: 'user1@xpay.de',
      password: 'user1',
    },
    {
      email: 'user2@xpay.de',
      password: 'user2',
    },
  ]).map(user => user.save())
  await Promise.all(users)
}
