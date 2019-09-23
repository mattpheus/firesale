import React from 'react'
import { getProducts, updateProduct } from '../../services/apiService'
import { Link } from 'react-router-dom'
import Container from '../common/Container'
import Card from '../common/Card'
import Image from '../common/Image'
import UpdateProduct from '../common/ProductsForm'
import './productshome.css'


class ProductsHome extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            products: [],
            userInput: '',
            description: '',
            user_id: '',
            productId: props.productId
        }
    }

    componentDidMount = async () => {
        this.handleCards()
        await this.fetchProducts()

        const updateResp = await updateProduct()
        this.setState({
            description: updateResp
        })
    }

    fetchProducts = async () => {
        try {
            const getProds = await getProducts()
            this.setState({
                products: getProds
            })
        } catch (error) {
            throw error
        }
    }

    handleChange = (event) => {
        const updateProducts = event.target.value
        this.setState({
            description: updateProducts
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        let { userInput } = this.state
        let data = { product: userInput }
        const id = this.state.productId
        await data
        await id
        this.props.updateProduct()
    }

    handleUser = async () => {
        const user_id = await localStorage.getItem('userId')
        this.setState({
            user_id
        })
    }

    handleCards = () => {
        return this.state.products.map(product => {
            return (
                <Card key={product.id}>
                    <br></br>
                    <Link to={`product/${product.id}`}>
                        <Image className="logo" src={product.image} alt={product.name} />
                    </Link>
                    <Container className='card-details' key={product.id}>
                        Category: {product.category}
                        <br></br>
                        Name: {product.name}
                        <br></br>
                        Description: {product.description}
                    </Container>
                    <UpdateProduct placeholder="Edit Description Here" productId={product.id} fetchProducts={this.fetchProducts} />
                    <hr></hr>
                    {/* {product.description} */}
                </Card>
                
            )
        })
    }

    render() {
        return (
            <div className='user-container'>
                <h1 className='welcome'>Welcome back! {this.state.user_id.name}</h1>
                <div className='list-of-prods'>
                    <h2>{this.handleCards()}</h2>
                </div>
            </div>
        )
    }
}

export default ProductsHome