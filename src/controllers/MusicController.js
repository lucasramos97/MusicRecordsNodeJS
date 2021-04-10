const MusicService = require('../services/MusicService')

module.exports = {
  async getAllMusics(req, res) {
    // #swagger.tags = ['Music']

    let userId = req.userId

    let page = req.query.page

    let paginatedMusics = await MusicService.findAllMusics(userId, page)

    /* #swagger.responses[200] = { 
      schema: { $ref: "#/definitions/PaginatedMusics" },
    } */

    return res.json(paginatedMusics)
  },

  async save(req, res) {
    // #swagger.tags = ['Music']

    try {
      let userId = req.userId

      /* #swagger.parameters['music'] = { 
        in: 'body',
        schema: { $ref: "#/definitions/Music" }
      } */

      let { title, artist, launchDate, duration, viewsNumber, feat } = req.body

      await MusicService.save({
        title,
        artist,
        launchDate,
        duration,
        viewsNumber,
        feat,
        userId
      })

      return res.status(201).send()
    } catch (error) {
      /* #swagger.responses[400] = { 
        schema: { $ref: "#/definitions/MessageResponse" },
      } */

      res.status(400).json({ message: error.message })
    }
  },

  async edit(req, res) {
    // #swagger.tags = ['Music']

    try {
      let id = req.params.id

      /* #swagger.parameters['music'] = { 
        in: 'body',
        schema: { $ref: "#/definitions/Music" }
      } */

      let { title, artist, launchDate, duration, viewsNumber, feat } = req.body

      await MusicService.edit({
        id,
        title,
        artist,
        launchDate,
        duration,
        viewsNumber,
        feat
      })

      return res.send()
    } catch (error) {
      /* #swagger.responses[400] = { 
        schema: { $ref: "#/definitions/MessageResponse" },
      } */

      res.status(400).json({ message: error.message })
    }
  },

  async delete(req, res) {
    // #swagger.tags = ['Music']

    try {
      let id = req.params.id

      await MusicService.delete(id)

      return res.send()
    } catch (error) {
      /* #swagger.responses[400] = { 
        schema: { $ref: "#/definitions/MessageResponse" },
      } */

      res.status(400).json({ message: error.message })
    }
  },

  async getAllDeletedMusics(req, res) {
    // #swagger.tags = ['Music']

    let userId = req.userId

    let page = req.query.page

    let paginatedMusics = await MusicService.getAllDeletedMusics(userId, page)

    /* #swagger.responses[200] = { 
      schema: { $ref: "#/definitions/PaginatedMusics" },
    } */

    return res.json(paginatedMusics)
  },

  async getCountDeletedMusics(req, res) {
    // #swagger.tags = ['Music']

    let userId = req.userId

    let countDeletedMusics = await MusicService.getCountDeletedMusics(userId)

    /* #swagger.responses[200] = { 
      schema: { $ref: "#/definitions/MessageResponse" },
    } */

    return res.json({ message: countDeletedMusics })
  },

  async recoverDeletedMusics(req, res) {
    // #swagger.tags = ['Music']

    try {
      let musics = req.body

      await MusicService.recoverDeletedMusics(musics)

      return res.send()
    } catch (error) {
      /* #swagger.responses[400] = { 
        schema: { $ref: "#/definitions/MessageResponse" },
      } */

      res.status(400).json({ message: error.message })
    }
  }
}
