const MusicRepository = require("../repositories/MusicRepository");
const StringUtils = require("../utils/StringUtils");
const MusicValidator = require("../validators/MusicValidator");

module.exports = {
  async findAllMusics(userId, page) {
    let musics = await MusicRepository.selectAllByUserIdAndDeletedIsFalse(
      userId,
      page
    );

    let countMusics = await MusicRepository.getCountMusicsDeletedIsFalse(
      userId
    );

    return { content: musics, totalElements: countMusics };
  },

  async save(music) {
    beforePersist(music);

    await MusicRepository.insert(music);
  },

  async edit(music) {
    beforePersist(music);

    await MusicRepository.update(music);
  },

  async delete(id) {
    let selectMusic = await MusicRepository.getById(id);

    if (selectMusic.length !== 1) {
      throw new Error(`Music not found by id ${id}!`);
    }

    let music = selectMusic[0];

    if (music.deleted) {
      throw new Error(`Music not found by id ${id}!`);
    }

    await MusicRepository.changeDeletedToTrue(music.id);
  },

  async getAllDeletedMusics(userId, page) {
    let musics = await MusicRepository.selectAllByUserIdAndDeletedIsTrue(
      userId,
      page
    );

    let countMusics = await MusicRepository.getCountMusicsDeletedIsTrue(userId);

    return { content: musics, totalElements: countMusics };
  },

  async getCountDeletedMusics(userId) {
    return await MusicRepository.getCountMusicsDeletedIsTrue(userId);
  },

  async recoverDeletedMusics(musics) {
    await MusicRepository.changeMusicsToDeletedFalse(musics);
  },
};

function beforePersist(music) {
  music.launchDate = StringUtils.leaveOnlyNumbers(music.launchDate);

  MusicValidator.validPersist(music);
}
