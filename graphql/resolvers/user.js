import bcrypt from 'bcryptjs'
import User from '../../models/user'

export default {
  createUser: async ({ userInput }) => {
    const hashedPassword = await bcrypt.hash(userInput.password, 12)
    const userAlreadyExist = await User.findOne({
      email: userInput.email
    }).lean()
    if (userAlreadyExist) throw new Error('User already exists!')

    const user = new User({
      email: userInput.email,
      password: hashedPassword
    })
    return user.save()
  }
}
