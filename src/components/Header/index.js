import {useState} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'

const Header = ({history, handleSearchResults, getPosts}) => {
  const [activeOption, setActiveOption] = useState('Home')
  const [showMenu, setMenu] = useState(false)

  const onInputChange = event => {
    handleSearchResults(event.target.value)
  }

  const onSearchClicked = () => {
    getPosts()
  }

  const onLogOutClicked = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <div className="header-bg-container">
        <div className="header-logo-container">
          <Link to="/">
            <img
              src="https://i.postimg.cc/k5fYmvq2/Group.png"
              alt="website logo"
            />
          </Link>

          <p>Insta Share</p>
        </div>
        <div className="header-options-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search Caption"
              onChange={onInputChange}
            />
            <button
              type="button"
              aria-label="Search"
              data-testid="searchIcon"
              onClick={onSearchClicked}
            >
              <FaSearch />
            </button>
          </div>
          <ul className="options-menu">
            <Link to="/">
              <li
                className={activeOption === 'Home' ? 'active' : 'option'}
                onClick={() => setActiveOption('Home')}
              >
                Home
              </li>
            </Link>
            <Link to="/my-profile">
              <li
                className={activeOption === 'Profile' ? 'active' : 'option'}
                onClick={() => setActiveOption('Profile')}
              >
                Profile
              </li>
            </Link>

            <button
              type="button"
              className="log-out-btn"
              onClick={onLogOutClicked}
            >
              Logout
            </button>
          </ul>
        </div>
        <div className="header-options-small">
          {showMenu ? null : (
            <button type="button" onClick={() => setMenu(true)}>
              Menu
            </button>
          )}
        </div>
      </div>
      <div>
        {showMenu ? (
          <ul className="options-menu-small">
            <Link to="/">
              <li
                className={activeOption === 'Home' ? 'active' : 'option'}
                onClick={() => setActiveOption('Home')}
              >
                Home
              </li>
            </Link>
            <Link to="/my-profile">
              <li
                className={activeOption === 'Profile' ? 'active' : 'option'}
                onClick={() => setActiveOption('Profile')}
              >
                Profile
              </li>
            </Link>

            <li
              className={activeOption === 'Search' ? 'active' : 'option'}
              onClick={() =>
                setActiveOption(prev => (prev === 'Search' ? '' : 'Search'))
              }
            >
              Search
            </li>

            <button
              type="button"
              className="log-out-btn"
              onClick={onLogOutClicked}
            >
              Logout
            </button>
            <button type="button" onClick={() => setMenu(false)}>
              Close
            </button>
          </ul>
        ) : (
          ''
        )}
        {activeOption === 'Search' ? (
          <div className="search-container-small">
            <input
              type="text"
              placeholder="Search Caption"
              onChange={onInputChange}
              className="search-el-small"
            />
            <button
              type="button"
              aria-label="Search"
              data-testid="searchIcon"
              onClick={onSearchClicked}
              className="btn-small"
            >
              <FaSearch />
            </button>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default withRouter(Header)
