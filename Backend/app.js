import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './db/db.js'
import userRouter from './routes/userRoutes.js'


dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // To parse URL-encoded data


app.use(cors()) // Enable CORS for all routes

connectDB() // Connect to MongoDB

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/users', userRouter)

export default app
