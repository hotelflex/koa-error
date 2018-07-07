const extractMsg = err => {
  const { name, message } = err
  if (name && message) {
    return `${name}: ${message}`
  } else if (name && !message) {
    return name
  } else {
    return message
  }
}

module.exports = environment => async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.output ? err.output.statusCode || 500 : 500
    ctx.body =
      environment === 'production'
        ? { error: extractMsg(err) }
        : {
            error: extractMsg(err),
            stack: err.stack,
          }
  }
}
