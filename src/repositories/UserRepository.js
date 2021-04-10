const knex = require('../database')

module.exports = {
  async getUserIfExistsByEmail(email) {
    return await knex('user')
      .select('id', 'name', 'email', 'password')
      .where({ email })
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
