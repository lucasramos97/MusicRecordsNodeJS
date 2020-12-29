const UserRepository = require("../repositories/UserRepository")

module.exports = {

    async getUserIfExistsByEmail(email) {

        let user = await UserRepository.getUserByEmail(email)

        if (user.length !== 1) {
            throw new Error(`User not found by E-Mail: ${email}`)
        }

        return user
    },

    async save(user) {
        await UserRepository.save(user)
    }

}