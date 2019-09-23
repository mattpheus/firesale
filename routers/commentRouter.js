const express = require('express')
const CommentRouter = express.Router()
const { Product, Comment } = require('../database/models')

CommentRouter.get('/', async (req, res) => {
	try {
	  const comments = await Comment.findAll()
		res.json(comments)
	} catch (error) {
	  console.error(error)
	  throw error
	}
  })

CommentRouter.get('/:id', async (req, res) => {
	try {
	  const comments = await Comment.findAll({where: {productId: req.params.id}})

		res.json(comments)
	} catch (error) {
	  console.error(error)
	  throw error
	}
  })


CommentRouter.post('/:id', async (req, res) => {
	try {

			const product = await Product.findByPk(req.params.id)
			const comments = await Comment.create(req.body)
			await comments.setProduct(product)
			res.send(comments)
		
	} catch (error) {
		throw error	
	}	
})

CommentRouter.delete('/:id', async (req, res) => {
	try {
			const comment = await Comment.findByPk(req.params.id)
			if (comment) {
				await comment.destroy()
				res.json({ msg: `Comment ${req.params.id} was deleted!` })
			} else {
				res.status(400).json({ error: 'Comment not found!' })
			}
	} catch (error) {
		throw error
	}
})

module.exports = CommentRouter