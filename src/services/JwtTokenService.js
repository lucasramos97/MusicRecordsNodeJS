const jsonwebtoken = require('jsonwebtoken')

module.exports = {
  getToken(id) {
    return jsonwebtoken.sign({ id }, process.env.SECRET, { expiresIn: '24h' })
  },

  verifyToken(token) {
    return jsonwebtoken.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        if (error instanceof jsonwebtoken.TokenExpiredError) {
          throw new Error('Session Expired!')
        }
        if (error instanceof jsonwebtoken.JsonWebTokenError) {
          throw new Error('Invalid Token!')
        }
        throw error
      }
      return decoded.id
    })
  }
}
