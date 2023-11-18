import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {errMsg: '', user: '', pass: ''}

  onUserInput = event => {
    this.setState({user: event.target.value})
  }

  onUserPass = event => {
    this.setState({pass: event.target.value})
  }

  onLoginSuccess = jwt => {
    Cookies.set('jwt_token', jwt, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onLoginFailure = err => {
    this.setState({errMsg: err})
  }

  onSubmitForm = event => {
    event.preventDefault()

    this.getLoginApi()
  }

  getLoginApi = async () => {
    const {user, pass} = this.state

    const userDetails = {
      username: user,
      password: pass,
    }

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  render() {
    const {errMsg} = this.state

    return (
      <>
        <div className="bg-container-login-mobile">
          <div className="login-img-cont">
            <img
              className="login-image"
              src="https://i.postimg.cc/sX81VDwp/Rectangle-1457.png"
              alt="website logo"
            />
          </div>
          <h1 className="login-text">Login</h1>
          <form onSubmit={this.onSubmitForm} className="user-pass-cont">
            <label className="user-label" htmlFor="user">
              USERNAME
            </label>
            <input
              onChange={this.onUserInput}
              className="user-input"
              id="user"
              type="text"
            />

            <label className="user-label" htmlFor="pass">
              PASSWORD
            </label>
            <input
              onChange={this.onUserPass}
              className="pass-input"
              id="pass"
              type="password"
            />
            <p className="err-color">{errMsg}</p>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
        <div className="bg-container-login-desktop">
          <div className="left-part-login">
            <div className="login-div">
              <div className="login-logo-div">
                <img
                  src="https://i.postimg.cc/02DT0T6Q/Frame-274.png"
                  alt="website logo"
                />
                <h1 className="tasty-heading">Tasty Kitchens</h1>
                <h1 className="head-login">Login</h1>
              </div>
              <form onSubmit={this.onSubmitForm} className="user-pass-cont">
                <label className="user-label" htmlFor="username">
                  USERNAME
                </label>
                <input
                  onChange={this.onUserInput}
                  className="user-input"
                  id="username"
                  type="text"
                />

                <label className="user-label" htmlFor="password">
                  PASSWORD
                </label>
                <input
                  onChange={this.onUserPass}
                  className="pass-input"
                  id="password"
                  type="password"
                />
                <p className="err-color">{errMsg}</p>

                <button type="submit" className="login-button">
                  Login
                </button>
              </form>
            </div>
          </div>
          <div className="right-part-image ">
            <img
              className="login-image"
              src="https://i.postimg.cc/K8D9sFr9/Rectangle-1456.png"
              alt="website login"
            />
          </div>
        </div>
      </>
    )
  }
}

export default Login
