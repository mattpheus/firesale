import React from 'react'
import { getProductById, getComments, createComments, deleteComment } from '../../services/apiService'
import Container from '../common/Container'
import Card from '../common/Card'
import Image from '../common/Image'


class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            comments: [],
            name: '',
            category: '',
            description: '',
            stock: '',
            price: '',
            image: ''

        }
    }

    async componentDidMount() {
        await this.fetchProduct()
        await this.fetchComment()
    }

    fetchComment = async () => {
        const { product: {id} } = this.state
            let findComments = await getComments(id)
            // console.log(findComments)
            this.setState({
                comments: findComments
            })
        
    }

    fetchProduct = async () => {
        try {
            const getProd = await getProductById(this.props.match.params.id)
            this.setState({
                product: getProd.products
            })
        } catch (error) {
            throw error
        }
    }

    handleCard = () => {
        const { product } = this.state
        return (
            <Card key={product.id} to={`/product/${product.id}`}>
                <Image src={product.image} alt={product.name} />
                <Container className='card-details'>
                    {product.name}
                    {product.category}
                    {product.description}
                    {product.stock}
                    {product.price}
                </Container>
            </Card>
        )
    }

    handleChange = (event) => {
        console.log (this.handleChange)
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    renderComments = () => {
        // console.log(this.state.comments)
        return this.state.comments.map(comment => {
            // console.log(comment)
            return (
                <Container className='comment-details' key={comment.id}>
                    <p>{comment.description}</p>
                    <p onClick={(event) => this.handleDelete(event, comment.id)}>Delete</p>
                </Container>
                
            )
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        let { description } = this.state
        let newCommentDesc = { description }
        let newComment = await createComments(this.state.product.id, newCommentDesc)
        await this.fetchComment()
    }

    handleDelete = async (event, id) => {
        event.preventDefault()
        // const id = this.state.commentId
        await deleteComment(id)
        await this.fetchComment()
    }

    render() {
        console.log(this.state.comments)
        return ( 
            <div>
                {this.handleCard()}
                {this.renderComments()}
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={this.description} name='description' type='text' placeholder='Create New Comment'></input>
                    <br></br>
                    <button onSubmit={this.handleSubmit}>Create</button>
                </form>
                
            </div>
        )
    }
}
export default Product