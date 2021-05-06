module.exports = (options = {}) => {
  return (context) => {
    const { data } = context
    data.updated = new Date()
    return context
  }
}
