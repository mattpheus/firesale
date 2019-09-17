import React from 'react'
import { getProducts, updateProduct } from '../../services/apiService'
import { Link, Redirect } from 'react-router-dom'
import Container from '../common/Container'
import Card from '../common/Card'
import Image from '../common/Image'
import UpdateProduct from '../common/ProductForm'


class ProductsHome extends React.Component {
    constructor(props) {
        super(props)
        // this.props = props
        this.state = {
            products: [],
            userInput: '',
            description: '',
            user_id: '',
            prodcutId: props.prodcutId
        }
    }

    componentDidMount = async () => {
        this.handleCards()
        await this.fetchProducts()
        
        const updateResp = await updateProduct()
        this.setState({
            description: updateResp
        })
        // await this.updateProduct() 
        // await this.getProducts()
        // await this.fetchUser()
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
        console.log(event.target.value)
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        let { userInput } = this.state
        let data = { product: userInput }
        const id = this.state.productId
        // await reviewSubmit(id, data)
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
                <Card key={product.id} to={`/products/${product.id}`}>
                    <Image src={product.image} alt={product.name} />
                    <Container className='card-details'>
                        {product.name}
                        {product.category}
                        {product.description}
                    </Container>
                    <UpdateProduct placeholder={product.description} productId={product.id} fetchProducts={this.fetchProducts}/>
                </Card>
            )
        })
    }
    render() {
        return (
            <div className='user-container'>
                <h1 className='welcome'>Welcome back {this.state.user_id}</h1>
                <div className='list-of-prods'>
                    <h2>{this.handleCards()}</h2>


                </div>
            </div>
        )
    }
}

export default ProductsHome