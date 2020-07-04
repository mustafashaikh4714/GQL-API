import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
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
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email }).lean()
    if (!user) throw new Error('User does not exists!')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Password is incorrect!')

    const token = jwt.sign({ userId: user._id, email }, 'someSuperSecretKey', { expiresIn: '1h' })
    return { userId: user._id, token, tokenExpiration: 1 }
  }
}
