
const express = require('express')
const routes = require('./routes')

const app = express()
app.use(express.json())
app.use(routes)

app.use((req, res, next) => {
    const error = new Error('URL not found!')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({ message: error.message })
})

app.listen(8080, () => console.log('server running on port 8080'))