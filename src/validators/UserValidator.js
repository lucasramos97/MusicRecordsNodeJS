
module.exports = {

    validLogin(user) {

        let resultValidEmail = validEmail(user.email)

        if (resultValidEmail) {
            return resultValidEmail
        }

        let resultValidEmailFormat = validEmailFormat(user.email)

        if (resultValidEmailFormat) {
            return resultValidEmailFormat
        }

        let resultValidPassword = validPassword(user.password)

        if (resultValidPassword) {
            return resultValidPassword
        }

        return ''
    },

    validCreate(user) {

        let resultValidName = validName(user.name)

        if (resultValidName) {
            return resultValidName
        }

        let validLogin = this.validLogin(user)

        if (validLogin) {
            return validLogin
        }

        return ''
    }

}

function validName(name) {

    if (!name) {
        return 'Name is required!'
    }

    return ''
}

function validEmail(email) {

    if (!email) {
        return 'E-Mail is required!'
    }
    
    return ''
}

function validEmailFormat(email) {

    let emailRegex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')

    if (!emailRegex.test(email)) {
        return 'Valid E-Mail format is required!'
    }
    
    return ''
}

function validPassword(password) {

    if (!password) {
        return 'Password is required!'
    }
    
    return ''
}
