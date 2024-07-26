function initializeSession(req, res, next) {
  if (!req.session.token) {
    req.session.token = null;
  }
  next();
}

module.exports = initializeSession;