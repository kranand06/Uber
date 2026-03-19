import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './db/db.js'


dotenv.config()

const app = express()

app.use(cors()) // Enable CORS for all routes

connectDB() // Connect to MongoDB

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app
