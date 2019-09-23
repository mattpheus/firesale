// Packages and Libraries
import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom'

// Components
import Login from './components/screens/Login'
import ProtectedRoute from './components/common/ProtectedRoute'

// Helper functions
import { login } from '../src/services/apiService'
import authService from '../src/services/authService';
import ProductsHome from '../src/components/screens/ProductsHome';
import Product from '../src/components/screens/Product'

// Css
import './App.css';
import Images from './components/images/firesale.png'
import Footer from './components/screens/Footer'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSignedIn: false,
      user: ''
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
    catch (error) {
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
    catch (error) {
      throw error
    }
  }

  // handleLogout = async (event) => {
  //   await signOut();
  
  //   this.userHasAuthenticated(false);
  
  //   this.props.history.push("/products");
  // }

  signOutUser = () => {
    authService.signOut()

    this.setState(state => {
      return {
        isSignedIn: false,
        user: {}
      }
    })
  }

  render() {
    const { isSignedIn, user } = this.state
    return (
      <div className="App">
        <nav className="welcome-login-logout">
          <br></br>
          <Link to={'/products'}>
          <img className="logo" src={Images} width='500px' height='200px' alt='Fire Sale Logo'></img>
            </Link>
          
          <div></div>
          
          {
            isSignedIn &&
            <div><Link to="/products"></Link></div>
          }
          {
            !isSignedIn ? (
              <div><Link to="/products"></Link></div>
            ) : (
                <button onClick={this.signOutUser}>Sign Out</button>
              )
          }
        </nav>

        <main className="main-container">
          {/* <Route exact path="/" component={ProductsHome} /> */}
          <ProtectedRoute
          // exact
            path='/products'
            user={user}
            component={ProductsHome}
          />
          <Route
            // exact
            path="/"
            render={(props) =>
              <Login {...props} handleLogin={this.loginUser} isSignedIn={isSignedIn} />
            }
          />
          <Route exact path={`/product/:id`} render={(props) => <Product {...props}/>} />
        </main>
        <br></br>
        <br></br>
        <br></br>
        <Footer />
      </div>

    )
  }
}

export default App;
