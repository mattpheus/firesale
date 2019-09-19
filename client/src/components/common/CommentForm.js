// import React from 'react'
// import { Link } from 'react-router-dom'
// import { createComments } from '../../services/apiService'
// import { deleteComment } from '../../services/apiService'
// import { getComments } from '../../services/apiService'

// class CommentForm extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             commentId: props.commentId,
//             productId: props.productId,
//             comments: [],
//             description: ''
//         }
//     }

//     async componentDidMount() {
//         await this.fetchComment()
//     }

//     fetchComment = async () => {
//         const { productId } = this.state
//         try {
//             const findComments = await getComments(productId)
//             console.log(findComments)
//             this.setState({
//                 comments: findComments
//             })
//         } catch (error) {
//             throw error
//         }
//     }

    // handleChange = (event) => {
    //     const { name, value } = event.target
    //     this.setState({
    //         [name]: value
    //     })
    // }

    // handleSubmit = async (event) => {
    //     event.preventDefault()
    //     let { description } = this.state
    //     let newCommentDesc = { description }
    //     let newComment = await createComments(this.props.productId, newCommentDesc)
    //     console.log(newComment)

        // await this.props.getComments(this.state.commentId)
        
        // this.props.fetchComment()
//     }

    // renderComments = () => {
    //     const { comment: { description }
    //         , } = this.state
    //     return (
    //         <div>
    //             <Button
    //                 title="Delete Restaurant"
    //                 onClick={() => this.setState({ wantsToDelete: true })} />
    //             <Container classname="button-right">
    //                 <Button title="Add Comment" onClick={this.} />
    //             </Container>
    //         </div>
    //     )
    // }

//     renderComments = () => {
//         return this.state.comments.map(comment => {
//             console.log('this')
//             return (
//                 <h1>{comment.description}</h1>
//             )
//         })
//     }

//     render() {
//         return (
//             <div>
                // <form onSubmit={this.handleSubmit}>
                //     <input onChange={this.handleChange} value={this.description} name='description' type='text' placeholder='Create New Comment'></input>
                //     <br></br>
                //     <button onSubmit={this.handleSubmit}>Create</button>

                // </form>
//             </div>
//         )
//     }
// }

// export default CommentForm