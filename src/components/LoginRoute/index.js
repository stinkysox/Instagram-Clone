import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginRoute extends Component {
  state = {username: '', password: '', showError: false, errorText: ''}

  onSuccessRequest = token => {
    const {history} = this.props
    console.log(token)
    Cookies.set('jwt_token', token, {expires: 30})
    history.replace('/')
  }

  onFailureRequest = error => {
    this.setState({showError: true, errorText: error})
  }

  onFromSubmit = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userdetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    try {
      if (response.ok) {
        this.onSuccessRequest(data.jwt_token)
      }
      this.onFailureRequest(data.error_msg)
    } catch (error) {
      console.log(error)
      this.onFailureRequest(data.error_msg)
    }
  }

  onUserNameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {showError, errorText} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="container">
          <div className="login-image-container">
            <img
              src="https://i.postimg.cc/15qhP28b/Illustration-2.jpg"
              alt="website login"
              className="logo-image"
            />
          </div>
          <div className="form-container">
            <form onSubmit={this.onFromSubmit}>
              <div className="logo-container">
                <img
                  src="https://i.postimg.cc/k5fYmvq2/Group.png"
                  alt="website logo"
                />
                <p>Insta Share</p>
              </div>
              <div>
                <label htmlFor="username" className="label">
                  USERNAME
                </label>
                <br />
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="input-el"
                  onChange={this.onUserNameChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="label">
                  PASSWORD
                </label>
                <br />
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="input-el"
                  onChange={this.onPasswordChange}
                />
                {showError && <p className="error-text">{errorText}</p>}
              </div>
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginRoute
