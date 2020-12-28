const knex = require("../database")
const StringUtils = require("../utils/StringUtils")
const MusicValidator = require("../validators/MusicValidator")

module.exports = {

    async getAllMusics(req, res, next) {

        try {

            let paginatedMusics = await getPaginatedMusics(req, false)

            return res.json(paginatedMusics)

        } catch (error) {
            next(error)
        }
    },

    async save(req, res, next) {

        try {

            let { title, artist, launchDate, duration, viewsNumber, feat } = req.body

            let launchDateOnlyNumbers = StringUtils.leaveOnlyNumbers(launchDate)

            let validSave = MusicValidator.validSave({ title, artist, launchDate: launchDateOnlyNumbers, duration, viewsNumber })

            if (validSave) {
                return res.json({ message: validSave })
            }

            let featTiny = getFeatTiny(feat)

            await knex('music').insert({ title, artist, launch_date: launchDateOnlyNumbers, duration, views_number: viewsNumber, feat: featTiny, user_id: 1 })

            return res.status(201).send()

        } catch (error) {
            next(error)
        }
    },

    async edit(req, res, next) {

        try {

            let { id } = req.params

            let { title, artist, launchDate, duration, viewsNumber, feat } = req.body

            let launchDateOnlyNumbers = StringUtils.leaveOnlyNumbers(launchDate)

            let validSave = MusicValidator.validSave({ title, artist, launchDate: launchDateOnlyNumbers, duration, viewsNumber })

            if (validSave) {
                return res.json({ message: validSave })
            }

            let featTiny = getFeatTiny(feat)

            await knex('music')
            .update({ title, artist, launch_date: launchDateOnlyNumbers, duration, views_number: viewsNumber, feat: featTiny })
            .where({ id })

            return res.send()

        } catch (error) {
            next(error)
        }
    },

    async delete(req, res, next) {

        try {

            let { id } = req.params

            let selectMusic = await knex('music').select().where({ id })

            if (selectMusic.length !== 1) {
                return res.status(400).json({ message: `Music not found by id ${id}!` })
            }

            let music = selectMusic[0]

            if (music.deleted) {
                return res.status(400).json({ message: `Music not found by id ${id}!` })
            }

            music.deleted = true

            await knex('music').update(music).where({ id: music.id })

            return res.send()

        } catch (error) {
            next(error)
        }
    },

    async getAllDeletedMusics(req, res, next) {

        try {

            let paginatedMusics = await getPaginatedMusics(req, true)

            return res.json(paginatedMusics)

        } catch (error) {
            next(error)
        }
    },

    async getCountDeletedMusics(req, res, next) {

        try {

            let countMusics = await getCountMusics(true)

            return res.json({ message: countMusics })

        } catch (error) {
            next(error)
        }
    },

    async recoverDeletedMusics(req, res, next) {

        try {

            let musics = req.body

            await knex.transaction(trx => {
                const queries = [];
                musics.forEach(music => {
                    const query = knex('music')
                        .update({ deleted: false })
                        .where({ id: music.id })
                        .transacting(trx)
                    queries.push(query)
                })

                Promise.all(queries)
                    .then(trx.commit)
                    .catch(trx.rollback)
            })

            return res.send()

        } catch (error) {
            next(error)
        }
    },

}

async function getPaginatedMusics(req, deleted) {

    let userId = 1
    let { page = 0, size = 5 } = req.query

    let musics = await knex('music')
        .select('id', 'title', 'artist', 'launch_date as launchDate', 'duration', 'views_number as viewsNumber', 'feat')
        .where({ user_id: userId })
        .where({ deleted })
        .limit(size)
        .offset(page * size)

    let countMusics = await getCountMusics(deleted)

    return { content: musics, totalElements: countMusics }
}

async function getCountMusics(deleted) {

    let userId = 1

    let [count] = await knex('music')
        .count()
        .where({ user_id: userId })
        .where({ deleted })

    return count['count(*)']
}

function getFeatTiny(feat) {
    if (feat === true) {
        return 1
    }
    return 0
}