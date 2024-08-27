import { lucia} from 'lucia'
import { mongoose} from '@lucia-auth/adapter-mongoose'
import User from '../models/UserModel'
import Session from '../models/SessionModel'

export const auth = lucia({
    adapter: mongoose({
        User: User,
        Session: Session
    }),
})
