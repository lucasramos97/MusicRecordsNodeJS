
const express = require('express')
const MusicController = require('../controllers/MusicController')

const routes = express.Router()

routes.get('/musics', MusicController.getAllMusics)
routes.post('/musics', MusicController.save)
routes.put('/musics/:id', MusicController.edit)
routes.delete('/musics/:id', MusicController.delete)
routes.get('/musics/deleted', MusicController.getAllDeletedMusics)
routes.get('/musics/deleted/count', MusicController.getCountDeletedMusics)
routes.post('/musics/recover', MusicController.recoverDeletedMusics)

module.exports = routes