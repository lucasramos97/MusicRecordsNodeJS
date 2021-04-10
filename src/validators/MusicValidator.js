module.exports = {
  validPersist(music) {
    let resultValidTitle = validTitle(music.title)

    if (resultValidTitle) {
      return resultValidTitle
    }

    let resultValidArtist = validArtist(music.artist)

    if (resultValidArtist) {
      return resultValidArtist
    }

    let resultValidLaunchDate = validLaunchDate(music.launchDate)

    if (resultValidLaunchDate) {
      return resultValidLaunchDate
    }

    let resultExistingLaunchDate = existingLaunchDate(music.launchDate)

    if (resultExistingLaunchDate) {
      return resultExistingLaunchDate
    }

    let resultValidDuration = validDuration(music.duration)

    if (resultValidDuration) {
      return resultValidDuration
    }

    return ''
  }
}

function validTitle(title) {
  if (!title) {
    return 'Title is required!'
  }

  return ''
}

function validArtist(artist) {
  if (!artist) {
    return 'Artist is required!'
  }

  return ''
}

function validLaunchDate(launchDate) {
  if (!launchDate) {
    return 'Launch Date is required!'
  }

  return ''
}

function existingLaunchDate(launchDate) {
  let launchDateString = new String(launchDate)
  if (launchDateString && launchDateString.length !== 8) {
    return `Invalid date value '${launchDate}' follow 'ddMMyyyy' pattern!`
  }

  let day = Number.parseInt(launchDateString.substring(0, 2))
  let month = Number.parseInt(launchDateString.substring(2, 4))
  let year = Number.parseInt(launchDateString.substring(4))

  let date = new Date()
  date.setDate(day)
  date.setMonth(month)
  date.setFullYear(year)

  let dayNotExisting = day !== date.getDate()
  let monthNotExisting = month !== date.getMonth()
  let yearNotExisting = date.getFullYear() === 0

  if (dayNotExisting) {
    return `Date '${launchDateString}' is invalid, day of month does not exist, valid values are (1 - 28/31) informed: ${day}!`
  }

  if (monthNotExisting) {
    return `Date '${launchDateString}' is invalid, month of year does not exist, valid values are (1 - 12) informed: ${month}!`
  }

  if (yearNotExisting) {
    return `Date '${launchDateString}' is invalid, year of era does not exist, valid values are (1 - 999999999/1000000000) informed: ${year}!`
  }

  return ''
}

function validDuration(duration) {
  if (!duration) {
    return 'Duration is required!'
  }

  return ''
}
