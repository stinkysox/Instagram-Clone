import {useEffect, useState} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiCamera} from 'react-icons/bi'
import {BsGrid3X3} from 'react-icons/bs'

import Header from '../Header'

const UserDetails = props => {
  const {match} = props
  const {params} = match
  const {id} = params
  const [userDetailsArray, setUserDetailsArray] = useState({})
  const [apiStatus, setApiStatus] = useState('Loading')

  const fetchUserData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error('Failed to fetch user data')
      }
      const data = await response.json()

      const {user_details: userDetails} = data
      const {posts, stories} = userDetails
      const updatedData = {
        followersCount: userDetails.followers_count,
        following_count: userDetails.following_count,
        userBio: userDetails.user_bio,
        userId: userDetails.user_id,
        userName: userDetails.user_name,
        postsCount: userDetails.posts_count,
        profilePic: userDetails.profile_pic,
        userPosts: posts,
        userStories: stories,
      }

      setUserDetailsArray(updatedData)
      setApiStatus('Success')
    } catch (error) {
      console.error('Error fetching user data:', error)
      setApiStatus('Failed')
    }
  }

  useEffect(() => {
    fetchUserData()
  })

  const onRetry = () => {
    setApiStatus('Loading')
    fetchUserData()
  }

  const renderLoadingScreen = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  const renderUserDetails = () => {
    const {
      userPosts,
      userStories,
      followersCount,
      postsCount,
      userBio,
      userName,
      profilePic,
    } = userDetailsArray

    return (
      <>
        <div className="user-details-container-bg">
          <div className="user-profilepic-contianer">
            <img
              className="user-profile-pic"
              src={profilePic}
              alt="user profile"
            />
          </div>
          <div className="user-details-container">
            <p className="user-username">{userName}</p>
            <div className="following-details-container">
              <p>
                <span className="count">{postsCount} </span>
                posts
              </p>
              <p>
                <span className="count">{followersCount} </span>
                followers
              </p>
              <p>
                <span className="count">{followersCount} </span>
                following
              </p>
            </div>
            <p className="username-two">{userName}</p>
            <p className="user-bio">{userBio}</p>
          </div>
        </div>
        <ul className="stories-container">
          {userStories.map(eachItem => (
            <li className="stories-item" key={eachItem.id}>
              <img
                className="stories-image"
                src={eachItem.image}
                alt="user story"
              />
            </li>
          ))}
        </ul>
        <hr className="hr-line" />
        <div className="posts-container">
          <div className="posts-top-container">
            <BsGrid3X3 fontSize="28px" />
            <p className="post-heading">Posts</p>
          </div>
          {userPosts.length !== 0 ? (
            <ul className="ul-posts">
              {userPosts.map(eachItem => (
                <li className="user-post-item" key={eachItem.id}>
                  <img
                    className="user-post-image"
                    src={eachItem.image}
                    alt="user post"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <BiCamera fontSize="28px" />
              <p className="no-posts-text">No Posts Yet</p>
            </div>
          )}
        </div>
      </>
    )
  }

  const renderFailedView = () => (
    <div className="failure-container">
      <img src="https://i.postimg.cc/QC5mjkFp/Group-7522.jpg" alt="" />
      <p>Something went wrong. Please try again</p>
      <button type="button" className="retry-btn" onClick={onRetry}>
        Retry
      </button>
    </div>
  )

  const renderUserDetailsBasedOnApiStatus = () => {
    switch (apiStatus) {
      case 'Loading':
        return renderLoadingScreen()
      case 'Success':
        return renderUserDetails()
      case 'Failed':
        return renderFailedView()
      default:
        return null
    }
  }

  return (
    <div className="user-details-bg-container">
      <Header />
      {renderUserDetailsBasedOnApiStatus()}
    </div>
  )
}

export default UserDetails
