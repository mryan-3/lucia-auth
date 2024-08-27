import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import compression from 'compression'
import { Borgen, Logger } from 'borgen'
import { StatusCodes } from 'http-status-codes'
import connectDb from './db.connect.js'
import { config } from './config/config.js'
import router from './router/router.js'


const app = express()
const PORT = config.server.port

const corsOptions = {
    origin: process.env.ORIGIN, // replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // enable set cookie
}

// Middleware
app.use(cors(corsOptions))
app.use(helmet())
app.use(Borgen({}))
app.use(compression())
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/ping', (_, res) => {
  res.status(StatusCodes.OK).json({ message: 'pong', alive: true })
})

app.use('/', router)


const StartServer = () => {
  app.listen(PORT, () => {
    Logger.info({ message: `The server is listening on port ${PORT}` })
  })
}
connectDb(StartServer)

