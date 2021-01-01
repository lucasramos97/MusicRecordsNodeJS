
const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/routes.js']

const doc = {
    info: {
        version: '1.0.0',
        title: 'Music Records API',
        description: "API documentation Music Records.\n\nLucas Ramos - lucasramosdev@gmail.com - <a href='https://github.com/lucasramos97' target='_blank'>GitHub</a> - <a href='https://www.linkedin.com/in/lucasramos97' target='_blank'>Linkedin</a>"
    },
    host: 'localhost:8080',
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {
        Login: {
            $email: 'email@email.com',
            $password: 'password'
        },
        MessageResponse: {
            message: 'message',
            username: 'username'
        },
        Music: {
            $artist: 'artist',
            $duration: '01:00',
            feat: false,
            id: 1,
            $launchDate: '01/01/2021',
            $title: 'title',
            viewsNumber: 0
        },
        PaginatedMusics: {
            content: [{
                $artist: 'artist',
                $duration: '01:00',
                feat: false,
                id: 1,
                $launchDate: '01/01/2021',
                $title: 'title',
                viewsNumber: 0
            }],
            totalElements: 0
        },
        User: {
            $name: 'name',
            $email: 'email@email.com',
            $password: 'password'
        }
    },
    securityDefinitions: {
        AuthorizationToken: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
        }
    },
    security: [
        {
            AuthorizationToken: []
        }
    ]
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./src/server')
})