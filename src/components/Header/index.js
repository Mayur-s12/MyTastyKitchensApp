import {Link, Redirect, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import Solid from '../../assets/Solid.svg'

import './index.css'

const Header = props => {
  const modalStyle = {
    position: 'absolute',
    top: '95px',
    width: '100vw',
  }

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="flex-header">
      <Link to="/" className="text-decorate">
        <div className="home-logo-cont">
          <img
            src="https://i.postimg.cc/02DT0T6Q/Frame-274.png"
            alt="website logo"
            className="home-logo"
          />
          <h1 className="logo-head-style">Tasty Kitchens</h1>
        </div>
      </Link>
      <div>
        <Popup
          modal
          contentStyle={modalStyle}
          trigger={<GiHamburgerMenu className="ham-style" />}
        >
          {close => (
            <div className="disp-menu">
              <div>
                <Link to="/" className="text-decorate">
                  <p className="home-ham">Home</p>
                </Link>
              </div>
              <div>
                <Link to="/cart" className="text-decorate">
                  <p className="home-ham">Cart</p>
                </Link>
              </div>
              <div>
                <button onClick={onClickLogout} className="btn-lgout">
                  Logout
                </button>
              </div>
              <div>
                <button className="btn-close" onClick={() => close()}>
                  <img src={Solid} alt="" />{' '}
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
      <div className="menu-desktop">
        <Link to="/" className="text-decorate">
          <h1 className="menu-item">Home</h1>
        </Link>

        <Link to="/cart" className="text-decorate">
          <h1 className="menu-item">Cart</h1>
        </Link>

        <button onClick={onClickLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
