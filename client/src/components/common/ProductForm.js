import React from 'react'
import { updateProduct } from '../../services/apiService'

class UpdateProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: ''
        }
    }

    handleChange = (event) => {
        const {name,value} = event.target
        this.setState({
            [name]:value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        let { description } = this.state 
        
        await updateProduct (this.props.productId,{description})
        this.props.fetchProducts()
    }

    render() {
        console.log(this.state.description)
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} value={this.state.description} name='description' type='text' placeholder={this.props.placeholder}></input>
                <br></br>
                <button type='submit'>Submit Edit</button>
            </form>
            </div>
        )
    }
}

export default UpdateProduct

