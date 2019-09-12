const express = require('express')
const authRouter = express.Router()
const { passport, jwtSign } = require('../auth/auth')

authRouter.post('/login', (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if(err) {
        const error = new Error(`An Error Occured: ${JSON.stringify(info)}`)
        return next(error)
      }

      if(!user) {
        let error = new Error(info.message || 'An error occured during login')
        error.status = 400
        return next(error)
      }

      req.login(user, {session: false}, async (error) => {
        if (error) {
          return next(error)
        }

        const { email, id } = user
        const payload = { email, id }
        const token = jwtSign(payload)

        return res.json({ user, token })
      } )
    }
    catch(error) {
      return next(error)
    }
  })(req, res, next)
})

authRouter.post('/signup', (req, res, next) => {
  passport.authenticate('signup', (err, user, info) => {
    try {
      if (err) {
        const error = new Error(err)
        return next(error)
      }

      if(!user) {
        let error = new Error(info.message || 'An error occured during singup')
        error.status = 400
        return next(error)
      }

      const { email, id } = user
      const payload = { email, id }
      const token = jwtSign(payload)

      return res.json({ user, token, message: info.message })
    }
    catch(e) {
      return next(e)
    }
  })(req, res, next)
})

module.exports = authRouter