
const AuthService = require('../services/AuthService')

module.exports = {

    async login(req, res) {

        try {

            let { email, password } = req.body

            let messageResponse = await AuthService.login({ email, password })

            return res.json(messageResponse)

        } catch (error) {
            return res.status(401).json({ message: error.message})
        }
    },

    async create(req, res) {

        try {

            let { name, email, password } = req.body

            await AuthService.create({ name, email, password })

            return res.status(201).send()

        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }

}