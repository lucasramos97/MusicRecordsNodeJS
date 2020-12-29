
const MusicService = require("../services/MusicService")

module.exports = {

    async getAllMusics(req, res) {

        let userId = req.userId

        let page = req.query.page

        let paginatedMusics = await MusicService.findAllMusics(userId, page)

        return res.json(paginatedMusics)
    },

    async save(req, res) {

        try {

            let userId = req.userId

            let { title, artist, launchDate, duration, viewsNumber, feat } = req.body

            await MusicService.save({ title, artist, launchDate, duration, viewsNumber, feat, userId })

            return res.status(201).send()

        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },

    async edit(req, res) {

        try {

            let id = req.params.id

            let { title, artist, launchDate, duration, viewsNumber, feat } = req.body

            await MusicService.edit({ id, title, artist, launchDate, duration, viewsNumber, feat })

            return res.send()

        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },

    async delete(req, res) {

        try {

            let id = req.params.id

            await MusicService.delete(id)

            return res.send()

        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },

    async getAllDeletedMusics(req, res) {

        let userId = req.userId

        let page = req.query.page

        let paginatedMusics = await MusicService.getAllDeletedMusics(userId, page)

        return res.json(paginatedMusics)
    },

    async getCountDeletedMusics(req, res) {

        let userId = req.userId

        let countDeletedMusics = await MusicService.getCountDeletedMusics(userId)

        return res.json({ message: countDeletedMusics })
    },

    async recoverDeletedMusics(req, res) {

        try {

            let musics = req.body

            await MusicService.recoverDeletedMusics(musics)

            return res.send()

        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },

}