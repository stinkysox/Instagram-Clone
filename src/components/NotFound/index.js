import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-container">
    <div>
      <img
        src="https://i.postimg.cc/y8xc7yg2/erroring-1.jpg"
        alt="page not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>

      <p className="not-found-para">
        we are sorry, the page you requested could not be found.Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button type="button" className="home-btn">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
