const knex = require("../database")

module.exports = {

    async getUserByEmail(email) {
        return await knex('user').select('email', 'name').where({ email })
    },

    async save(user) {
        try {
            await knex('user').insert(user)
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error(`${user.email} has already been registered!`)
            }
            throw error
        }
    }

}