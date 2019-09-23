import React from 'react'
import { Redirect } from 'react-router-dom'
import './loginform.css'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      showError: false
    }
  }

  handleSubmitForm = async (event) => {
    event.preventDefault()

    const { email, password } = this.state
    const { handleLogin } = this.props

    try {
      await handleLogin({ email, password })
    }
    catch (e) {
      this.setState({
        showError: true
      }, () => {
        setTimeout(() => {
          this.setState({
            showError: false
          })
        }, 3000)
      })
    }
  }

  handleTextInput = (event) => {
    const { name, value } = event.target

    this.setState(state => {
      return { [name]: value }
    })
  }

  render() {
    const { isSignedIn } = this.props
    const { showError } = this.state

    let errorMessage

    if (showError) {
      errorMessage = (
        <div className="errorMessage">
          <span>An error occured, please try again</span>
        </div>
      )
    }

    if (isSignedIn) {
      return <Redirect to={`/products`} />
    }

    return (
      <div className="login-form">
        {errorMessage}
        <form className="form" onSubmit={this.handleSubmitForm}>
          <div className="email">
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={this.handleTextInput}
              value={this.state.email}
            />
          </div>
          <div className="password">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={this.handleTextInput}
              value={this.state.password}
            />
          </div>

          <button>Login</button>
        </form>
      </div>
    )
  }
}

export default LoginForm