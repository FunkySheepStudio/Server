module.exports = (context) => {
  if (context.data._id === null) {
    delete context.data._id
  }
  return context
}

