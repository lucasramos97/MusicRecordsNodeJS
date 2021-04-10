const AuthService = require('../services/AuthService')

module.exports = {
  async login(req, res) {
    // #swagger.tags = ['Auth']

    try {
      /* #swagger.parameters['user'] = { 
        in: 'body',
        schema: { $ref: "#/definitions/Login" }
      } */

      let { email, password } = req.body

      let messageResponse = await AuthService.login({ email, password })

      /* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/MessageResponse" },
      } */

      return res.json(messageResponse)
    } catch (error) {
      /* #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/MessageResponse" },
      } */

      return res.status(401).json({ message: error.message })
    }
  },

  async create(req, res) {
    // #swagger.tags = ['Auth']

    try {
      /* #swagger.parameters['user'] = { 
        in: 'body',
        schema: { $ref: "#/definitions/User" }
      } */

      let { name, email, password } = req.body

      await AuthService.create({ name, email, password })

      return res.status(201).send()
    } catch (error) {
      /* #swagger.responses[400] = { 
        schema: { $ref: "#/definitions/MessageResponse" },
      } */

      return res.status(400).json({ message: error.message })
    }
  }
}
