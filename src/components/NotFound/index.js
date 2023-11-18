import {Link} from 'react-router-dom'
import './index.css'
import NotFoundIcon from '../../assets/NotFoundIcon.svg'

const NotFound = () => (
  <div className="disp-not-found-page">
    <img src={NotFoundIcon} alt="not found" />
    <h1 className="page-not-found">Page Not Found</h1>
    <p className="not-found-text">
      We are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>
    <Link to="/" className="text-decorate">
      <button className="home-page">Home Page</button>
    </Link>
  </div>
)

export default NotFound
