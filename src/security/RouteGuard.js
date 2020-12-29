const JwtTokenService = require("../services/JwtTokenService");

module.exports = {

    checkAuthorization(req, res, next) {

        let bearerToken = req.headers.authorization;

        if (!bearerToken || bearerToken && !bearerToken.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthenticated' });
        }

        let token = bearerToken.substring(7)

        try {
            let userId = JwtTokenService.verifyToken(token)
            req.userId = userId
            next()
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }

}