module.exports = {
  leaveOnlyNumbers(value) {
    return value.replace(/([^0-9])+/gim, '')
  }
}
