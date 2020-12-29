
require('dotenv-safe').config()
const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes')

const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)

app.use((req, res, next) => {
    let error = new Error('URL not found!')
    error.status = 404
    res.json({ message: error.message })
})

app.listen(8080, () => console.log('server running on port 8080'))
