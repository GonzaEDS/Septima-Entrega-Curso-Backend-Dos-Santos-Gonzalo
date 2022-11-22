const roleMiddleware = (req, res, next) => {
  try {
    req.admin = true
    if (req.admin) {
      next()
    } else {
      res.status(403).send('Access Denied')
    }
  } catch (error) {
    next(error)
  }
}

module.exports = roleMiddleware
