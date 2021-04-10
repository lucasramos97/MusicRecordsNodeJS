const express = require('express')
const AuthRoutes = require('./AuthRoutes')
const MusicRoutes = require('./MusicRoutes')
const routes = express.Router()

routes.use(AuthRoutes)
routes.use(MusicRoutes)

module.exports = routes
