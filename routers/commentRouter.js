const express = require('express')
const CommentRouter = express.Router()
const { Product, Comment, User } = require('../database/models')

CommentRouter.get('/:prod_id', async (request, response) => {
	try {
	  const comments = await Comment.findAll({where: {productId: req.params.prod_id}})
		response.json(comments)
	} catch (error) {
	  console.error(error)
	  throw error
	}
  })


CommentRouter.post('/:prod_id', async (req, res) => {
	try {
		const products = await Product.findByPk(req.params.prod_id)
		const user = await User.findByPk(req.params.user_id)
		if (products) {
			const comments = await Comment.create(req.body)
			await comments.setProduct(products)
			await comments.setUser(user)
			res.send(comments)
		} else {
			res.status(400).json({ error: 'Product Not Found!' })
		}
	} catch (error) {
		throw error
	}
})


CommentRouter.delete('/:prod_id', async (req, res) => {
	try {
		const product = await Product.findByPk(req.params.product_id)
		if (product) {
			const comment = await Comment.findByPk(req.params.comment_id)
			if (comment) {
				await comment.destroy()
				res.json({ msg: `Comment ${req.params.comment_id} was deleted!` })
			} else {
				res.status(400).json({ error: 'Comment not found!' })
			}
		} else {
			res.status(400).json({ error: 'Product not found!' })
		}
	} catch (error) {
		throw error
	}
})

module.exports = CommentRouter