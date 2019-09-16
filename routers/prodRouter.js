const express = require('express')
const prodRouter = express.Router()
const CommentRouter = express.Router()
const { Product, Comment } = require('../database/models')

prodRouter.get('/', async (request, response) => {
  try {
    const products = await Product.findAll()

      response.json(products)

  } catch (error) {
    console.error(error)
    throw error
    
  }
})



prodRouter.put('/:id', async (request, response) => {
	try {
		const id = request.params.id
		const products = await Product.findByPk(id)

		if (products) await products.update(request.body)
		response.json({
			products
		})
	} catch (error) {
		response.status(304).json({
			message: error.message
		})
	}
})

prodRouter.get('/:id', async (request, response) => {
	try {
		const id = request.params.id
		const products = await Product.findByPk(id, {
			include: [Comment]
		})

		if (!products) throw Error('Product not found')

		response.json({
			products
		})
	} catch (error) {
		response.status(404).json({ msg: error.message })
	}
})


module.exports = prodRouter