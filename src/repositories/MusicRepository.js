
const knex = require("../database")

module.exports = {

    async getById(id) {
        return await knex('music').select().where({ id })
    },

    async selectAllByUserIdAndDeletedIsFalse(userId, page) {
        return await getPaginatedMusics(userId, page, false)
    },

    async getCountMusicsDeletedIsFalse(userId) {
        return await getCountMusics(userId, false)
    },

    async insert(music) {

        let musicPersist = getMusicPersist(music)

        await knex('music').insert(musicPersist)
    },

    async update(music) {

        let musicPersist = getMusicPersist(music)

        await knex('music')
            .update(musicPersist)
            .where({ id: music.id })
    },

    async changeDeletedToTrue(id) {
        await knex('music').update({ deleted: true }).where({ id })
    },

    async selectAllByUserIdAndDeletedIsTrue(userId, page) {
        return await getPaginatedMusics(userId, page, true)
    },

    async getCountMusicsDeletedIsTrue(userId) {
        return await getCountMusics(userId, true)
    },

    async changeMusicsToDeletedFalse(musics) {

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

    }

}

async function getPaginatedMusics(userId, page, deleted) {

    let musics = await knex('music')
        .select('id', 'title', 'artist', 'launch_date as launchDate', 'duration', 'views_number as viewsNumber', 'feat')
        .where({ user_id: userId })
        .where({ deleted })
        .limit(5)
        .offset(page * 5)

    return musics
}

async function getCountMusics(userId, deleted) {

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

function getMusicPersist(music) {
    return {
        title: music.title,
        artist: music.artist,
        launch_date: music.launchDate,
        duration: music.duration,
        views_number: music.viewsNumber,
        feat: getFeatTiny(music.feat),
        user_id: music.userId
    }
}