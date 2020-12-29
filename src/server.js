
const express = require('express')
const routes = require('./routes/routes')

const app = express()
app.use(express.json())
app.use(routes)

app.use((req, res, next) => {
    const error = new Error('URL not found!')
    error.status = 404
    res.json({ message: error.message })
})

app.listen(8080, () => console.log('server running on port 8080'))