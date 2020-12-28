
const knex = require('../database')
const UserValidator = require('../validators/UserValidator')

module.exports = {

    async login(req, res, next) {

        try {

            let { email, password } = req.body

            let validUser = UserValidator.validLogin({ email, password })

            if (validUser) {
                return res.json({ message: validUser })
            }

            let user = await knex('user').select('email', 'name').where({ email })

            if (user.length !== 1) {
                return res.json({ message: `User not found by E-Mail: ${email}` })
            }

            return res.json({ message: 'token', name: user[0].name })

        } catch (error) {
            next(error)
        }
    },

    async create(req, res, next) {

        try {

            let { name, email, password } = req.body

            let validCreate = UserValidator.validCreate({ name, email, password })

            if (validCreate) {
                return res.json({ message: validCreate })
            }

            await knex('user').insert({ name, email, password })

            return res.status(201).send()

        } catch (error) {
            next(error)
        }
    }

}