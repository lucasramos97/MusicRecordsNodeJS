module.exports = {
  validLogin(user) {
    validEmail(user.email)

    validEmailFormat(user.email)

    validPassword(user.password)

    return true
  },

  validCreate(user) {
    validName(user.name)

    this.validLogin(user)

    return true
  }
}

function validName(name) {
  if (!name) {
    throw new Error('Name is required!')
  }

  return true
}

function validEmail(email) {
  if (!email) {
    throw new Error('E-Mail is required!')
  }

  return true
}

function validEmailFormat(email) {
  let emailRegex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')

  if (!emailRegex.test(email)) {
    throw new Error('Valid E-Mail format is required!')
  }

  return true
}

function validPassword(password) {
  if (!password) {
    throw new Error('Password is required!')
  }

  return true
}
