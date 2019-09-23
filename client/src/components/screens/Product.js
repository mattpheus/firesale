import React from 'react'
import { getProductById, getComments, createComments, deleteComment } from '../../services/apiService'
import Container from '../common/Container'
import Card from '../common/Card'
import Image from '../common/Image'
import {ProtectedRoute} from '../common/ProtectedRoute'
import { Link } from 'react-router-dom'


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
                    Category- {product.category}
                    <br></br>
                    Name- {product.name}
                    <br></br>
                    Price- ${product.price}
                    <br></br>
                    Stock- {product.stock}
                    <br></br>
                    Product Description- {product.description}
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

                    <p>Comment: {comment.description} <span></span></p>
                    ↑
                    <button onClick={(event) => this.handleDelete(event, comment.id)}>Delete Comment</button>
                    ↑

                    {/* <button onClick={(event) => this.handleDelete(event, comment.id)}>Delete</button> */}
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
        await deleteComment(id)
        await this.fetchComment()
    }

    render() {
        console.log(this.state.comments)
        
        return (
            <div>
                <br></br>
                {this.handleCard()}
                <hr></hr>
                {this.renderComments()}
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={this.description} name='description' type='text' placeholder='Create New Comment'></input>
                    <span><button onSubmit={this.handleSubmit}>Create</button></span>
                </form>
                <Link to={'/products'}/>
                <br></br>
                <br></br>
                
            </div>
        )
    }
}
export default Product