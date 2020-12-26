
const express = require('express')
const UserController = require('./controllers/AuthController')
const MusicController = require('./controllers/MusicController')

const routes = express.Router()

routes.post('/auth/login', UserController.login)
routes.post('/auth/create', UserController.create)
routes.get('/musics', MusicController.getAllMusics)
routes.post('/musics', MusicController.save)
routes.put('/musics', MusicController.edit)
routes.delete('/musics/:musicId', MusicController.delete)
routes.get('/musics/deleted', MusicController.getAllDeletedMusics)
routes.get('/musics/deleted/count', MusicController.getCountDeletedMusics)
routes.post('/musics/recover', MusicController.recoverDeletedMusics)

module.exports = routes