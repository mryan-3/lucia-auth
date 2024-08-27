import mongoose from 'mongoose'

// Session Schema
const SessionSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true
    },
      expires_at: {
        type: Date
      }
  } as const,
  {
      _id: false,
  },
)

const Session = mongoose.model('Session', SessionSchema)
export default Session
