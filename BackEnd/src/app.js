const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')

const app = express()


const corsOptions = {
    origin: process.env.FRONTEND_URL || 'https://code-reviewer-frontend-beige.vercel.app/', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}

app.use(cors(corsOptions))


app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/ai', aiRoutes)

module.exports = app