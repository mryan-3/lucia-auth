import mongoose from 'mongoose'

// User Schema
const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
)

const User = mongoose.model('User', UserSchema)
export default User
