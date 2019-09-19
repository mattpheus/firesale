import React from 'react'
import LoginForm from '../common/LoginForm'

function Login(props) {
    return (
        <div>
            {/* <h1></h1> */}
            <LoginForm {...props} />
        </div>
    )
}

export default Login