import React from 'react'
import { createComment, deleteComment } from '../../services/apiService'

class Comments extends React.Component {
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

    // handleSubmit = async (event) => {
    //     event.preventDefault()
    //     let { description } = this.state 
        
    //     await  (this.props.productId,{description})
    //     this.props.
    // }

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

export default Comments