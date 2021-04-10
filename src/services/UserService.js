const UserRepository = require('../repositories/UserRepository')

module.exports = {
  async getUserIfExistsByEmail(email) {
    let users = await UserRepository.getUserIfExistsByEmail(email)

    if (users.length === 0) {
      throw new Error('Invalid E-Mail or Password!')
    }

    return users[0]
  },

  async save(user) {
    await UserRepository.save(user)
  }
}
