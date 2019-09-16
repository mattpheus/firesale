import React from 'react'
import { getProducts, updateProduct } from '../../services/apiService'
import Layout from '../Layout'


class ProductsHome extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            products: [],
            category: '',
            name: '',
            stock: '',
            price:'',
            image: '',
            description: '',
            prodcutId: props.prodcutId

        }
    }

    componentDidMount = async () => {
        const resp = await getProducts()
        this.setState({
            products: resp
        })
        const updateResp = await updateProduct()
        this.setState({
            category: updateResp,
            name: updateResp,
            stock: updateResp,
            price:updateResp,
            image: updateResp,
            description: updateResp
        })
        // await this.updateProduct() 
        // await this.getProducts()
        // await this.fetchUser()
    }

    // componentDidMount = async (res, req) => {
    //     const resp = await courseListDashboard()
    //     this.setState({
    //       courses: resp
    //     })
    //   }

    handleChange = (event) => {
        const updateProducts = event.target.value
        this.setState({
            category: updateProducts,
            name: updateProducts,
            stock: updateProducts,
            price: updateProducts,
            image: updateProducts,
            description: updateProducts

        })

        console.log(event.target.value)
    }


    // Models layout
    // const Product = db.define("products",{
    //     category: Sequelize.STRING,
    //     name: Sequelize.STRING,
    //     stock: Sequelize.INTEGER,
    //     price: Sequelize.INTEGER,
    //     image: Sequelize.TEXT,
    //     description: Sequelize.TEXT
    //   })


//API SERVICE GET PRODUCTs
// export const getProducts = async () => {
//   try {
//     const response = await api.get('/products')
//     console.log('getproduct',response.data)
//     return response.data
//   } catch (error) {
//     throw error
//   }
// }

//Going to need this string for parsing stock and price
//req.query.someProperty = parseInt(req.query.someProperty);
    render() {
        const id = this.props.match.params.id
        console.log(id)
        return (
            <div className='user-container'>
                <h1 className='welcome'>{`Welcome back ${id}`}</h1>
            </div>

        )
    }
}

export default ProductsHome