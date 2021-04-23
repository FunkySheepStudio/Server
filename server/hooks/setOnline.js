module.exports = (options = {}) => {
  return (context) => {
    const { data } = context
    if (data.online === undefined) {
      data.online = true
    }
    return context
  }
}
