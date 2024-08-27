import User from '../models/UserModel'
import { auth } from '../services/authService'

// Register a new user
// @route POST /auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const user_exists = await User.findOne({ email: email })

    if (user_exists) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: 'Email already exists' })
    }

    const hashPass = bcrypt.hashSync(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashPass,
    })
    console.log(`created user`)

    const session = await auth.createSession(user._id)
    const sessionCookie = auth.createSessionCookie(session)

    res.cookie(sessionCookie.name, sessionCookie.value, {
      maxAge: sessionCookie.maxAge,
      httpOnly: true,
      sameSite: 'strict',
    })

    res
      .status(StatusCodes.CREATED)
      .json({ success: true, data: [{ message: 'Registration successful' }] })
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error registering user', error })
  }
}

// Login a user
// @route POST /auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found' })
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' })
    }

    const session = await auth.createSession(user._id)
    const sessionCookie = auth.createSessionCookie(session)

    res.cookie(sessionCookie.name, sessionCookie.value, {
      maxAge: sessionCookie.maxAge,
      httpOnly: true,
      sameSite: 'strict',
    })

    res
      .status(StatusCodes.OK)
      .json({ success: true, data: [{ message: 'Login successful' }] })
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error logging in user', error })
  }
}

// Logout a user
// @route POST /auth/logout
export const logout = async (req, res) => {
  try {
    res
      .clearCookie(req.signedCookies[auth.sessionCookieName])
      .status(StatusCodes.OK)
      .json({ success: true, data: [{ message: 'Logout successful' }] })
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error logging out user', error })
  }
}

