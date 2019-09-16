// Packages and Libraries
import React from 'react';
import { Route, Link } from 'react-router-dom'

// Components
import Login from './components/screens/Login'
import ProtectedRoute from './components/ProtectedRoute'

// Helper functions
import { login, getProducts } from '../src/services/apiService'
import authService from '../src/services/authService';
import ProductsHome from './components/screens/ProductsHome';

// Css
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSignedIn: false,
      user: {}
    }
  }

  async componentDidMount() {
    try {

      this.setState(state => {
        return {
          isSignedIn: authService.isAuthenticated()
        }
      })
    }
    catch(error) {
      throw error
    }
  }

  loginUser = async (credentials) => {
    try {
      const user = await login(credentials)

      this.setState({
          isSignedIn: true,
          user: user
        })
    }
    catch(error) {
      throw error
    }
  }

  signOutUser = () => {
    authService.signOut()

    this.setState(state => {
      return {
        isSignedIn: false,
        user: {}
      }
    })
  }

  render(){
    const { isSignedIn, user } = this.state
    return (
      <div className="App">
        <nav>
          <div></div>

          {
            isSignedIn &&
            <div><Link to="/products"></Link></div>
          }

          {
            !isSignedIn ? (
              <div><Link to="/login">Login</Link></div>
            ) : (
              <button onClick={this.signOutUser}>Sign Out</button>
            )
          }
        </nav>

        <main>
          {/* <Route exact path="/" component={ProductsHome} /> */}
          <ProtectedRoute
            path='/products/:id'
            user={user}
            component={ProductsHome}
          />
          <Route
            path="/"
            render={(props) =>
              <Login {...props} handleLogin={this.loginUser} isSignedIn={isSignedIn} />
            }
          />
        </main>
      </div>

    )
  }
}

export default App;
