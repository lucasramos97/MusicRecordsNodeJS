const UserService = require('./UserService')
const UserValidator = require('../validators/UserValidator')
const JwtTokenService = require('./JwtTokenService')
const bcrypt = require('bcrypt')

module.exports = {

    async login(user) {

        UserValidator.validLogin(user)

        let userRepo = await UserService.getUserIfExistsByEmail(user.email)

        if (!bcrypt.compareSync(user.password, userRepo.password)) {
            throw new Error('Invalid E-Mail or Password!')
        }

        let token = JwtTokenService.getToken(userRepo.id)

        return { message: token, username: userRepo.name }
    },

    async create(user) {

        UserValidator.validCreate(user)

        user.password = getEncryptedPassword(user.password)

        await UserService.save(user)

    }

}

function getEncryptedPassword(password) {

    let salt = bcrypt.genSaltSync(10)
    
    return bcrypt.hashSync(password, salt)
}