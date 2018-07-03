module.exports = environment => async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.output ? err.output.statusCode || 500 : 500
    ctx.body =
      environment === 'production'
        ? { message: err.message }
        : { message: err.message, stack: err.stack }
  }
}
