const UserService = require('./UserService')
const UserValidator = require('../validators/UserValidator')

module.exports = {

    async login(user) {

        UserValidator.validLogin(user)

        let users = await UserService.getUserIfExistsByEmail(user.email)

        return { message: 'token', name: users[0].name }
    },

    async create(user) {

        UserValidator.validCreate(user)

        await UserService.save(user)

    }

}