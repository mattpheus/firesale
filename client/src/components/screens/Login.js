import React from 'react'
import LoginForm from '../common/LoginForm'
import Images from '../images/firesale.png'

function Login(props) {
    return (
        <div className="login-page">
        <div className="email-box">
            {/* <h1></h1> */}
            <LoginForm {...props} />
        </div>
        </div>
    )
}

export default Login