const express = require('express')
const appRouter = express.Router()
const { passport } = require('../auth/auth')

appRouter.get('/', passport.authenticate('jwt', { session: true } ), async (req, res) => {
    res.json({ user: req.user, message: 'authenticated' })
  }
)

module.exports = appRouter